/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Message = require("./models/message");



const Utils = require("./utils");

const Game = require("./game-logic");


// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const socketManager = require("./server-socket");

/**
 * -------------------- User routes --------------------
 */


router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/updateUserName", (req, res) => {
  console.log("Bork mf")
  if (req.user) {
    console.log("updating user " + req.user._id+ " name to " + req.body.name)
    // Update the user in the MongoDB database
    User.findById(req.user._id).then((user) => {
      user.name = req.body.name;
      user.save()
    });
    req.user.name = req.body.name;
    socketManager.editUser(req.user);
  }
  res.send({});
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});


/**
 * -------------------- Game routes --------------------
 */



router.post("/createGame", (req, res) => {
  if (req.user) {
    if(req.body.gameID){
      Game.createGame(req.body.gameID);

      console.log("created new Game with gameID: " + req.body.gameID);
      console.log(Game.gameState);
    }else{
      console.log("no gameID provided");
    }
  }else{
    console.log("user not logged in");
  }
  res.send({});
});

router.post("/startGame", (req, res) => {
  if (req.user) {
    if(req.body.gameID && req.body.temperature && req.body.numRounds){
      Game.startGame(req.body.gameID, req.body.temperature, req.body.numRounds);
      console.log("started game");
      console.log(Game.gameState);
      socketManager.gameJustChanged(req.body.gameID);
    }else{
      console.log("huh something borked.");
    }
  }else{
    console.log("user not logged in");
  }
  res.send({});
});

router.post("/spawn", (req, res) => {
  if (req.user) {
    if(req.body.gameID){
      console.log(req.user);
      
      Game.spawnPlayer(req.user._id, req.user.name, req.body.gameID);
        console.log("Spawned player. Here are the players:");
        console.log(Game.gameState[req.body.gameID]["players"]);

    }else{
      console.log("no gameID provided");
    }
  }else{
    console.log("user not logged in");
  }
  res.send({});
});

router.post("/despawn", (req, res) => {
  if (req.user) {
    if(req.body.gameID){
      Game.deletePlayerFromGame(req.user, req.body.gameID); // Removes from specific game
      socketManager.gameJustChanged(req.body.gameID);
    } else {
      console.log('inside 1');
    }
  } else {
    console.log('inside 0');
  }
  res.send({});
});

// Corresponds to submitResponse in game-logic.js
router.post("/submitResponse", (req, res) => {
  // playerID, gameID, promptID, response
  if (req.user) {
    if(req.body.gameID){
      Game.submitResponse(req.user._id, req.body.gameID, req.body.promptID, req.body.timedOut, req.body.response);
      socketManager.gameJustChanged(req.body.gameID);
    }
  }
  res.send({});
});

// Corresponds to submitVote in game-logic.js
router.post("/submitVote", (req, res) => {
  // playerID, gameID, promptID, response
  if (req.user) {
    if(req.body.gameID){
      Game.submitVote(req.user._id, req.body.gameID, req.body.promptID, req.body.timedOut, req.body.response);
      socketManager.gameJustChanged(req.body.gameID);
    }
  }
  res.send({});
});

// Corresponds to doneVoting in game-logic.js
router.post("/doneVoting", (req, res) => {
  if (req.user) {
    if(req.body.gameID){
      // console.log("We are done voting inside api.");

      Game.doneVoting(req.body.gameID);
      socketManager.gameJustChanged(req.body.gameID);
    }
  //   else{
  //     console.log("Problem 1.");
  //   }
  // }else{
  //   console.log("Problem 2.");
  }
  res.send({});
});


router.get("/gameExists", (req, res) => {
  // console.log(req.query);
  if (req.query.gameID) {
    if(Game.gameExists(req.query.gameID)){
      res.send({gameExists: true});}
    else{
      res.send({gameExists: false});
    }
  }else{
    res.send({gameExists: false});
  }
});


router.get("/game", (req, res) => {
  // console.log(req.query);
  if (req.query.gameID) {
    // console.log("Yay!")
    res.send(Game.getGame(req.query.gameID));
  } else {
    console.log("No gameID provided");
    res.send({});
  }
});

/**
 * -------------------- Chat route --------------------
 */


router.get("/chat", (req, res) => {
  let query;
  if (req.query.recipient_id === "ALL_CHAT") {
    // get any message sent by anybody to ALL_CHAT
    query = { "recipient._id": "ALL_CHAT" };
  } else {
    // get messages that are from me->you OR you->me
    query = {
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
        { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
      ],
    };
  }

  Message.find(query).then((messages) => res.send(messages));
});

router.post("/message", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // insert this message into the database
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  });
  message.save();

  if (req.body.recipient._id == "ALL_CHAT") {
    socketManager.getIo().emit("message", message);
  } else if(req.body.recipient._id.startsWith("GAME###")) {
    socketManager.getIo().emit("message", message);
  }else {
    socketManager.getSocketFromUserID(req.user._id).emit("message", message);
    if (req.user._id !== req.body.recipient._id) {
      socketManager.getSocketFromUserID(req.body.recipient._id).emit("message", message);
    }
  }
});

/**
 * -------------------- Catch-all route --------------------
  */

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
