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
// const Story = require("./models/story");
// const Comment = require("./models/comment");
const User = require("./models/user");
// const Message = require("./models/message");

const Game = require("./game-logic");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const socketManager = require("./server-socket");


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

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});


router.post("/createGame", (req, res) => {
  if (req.user) {
    if(req.body.gameID){
      Game.createGame(req.body.gameID, req.body.userID);

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
    if(req.body.gameID){
      Game.startGame(req.body.gameID);
      console.log("started game");
      console.log(Game.gameState);
    }else{
      console.log("no gameID provided");
    }
  }else{
    console.log("user not logged in");
  }
  res.send({});
});

router.post("/spawn", (req, res) => {
  if (req.user) {
    if(req.body.gameID){
      Game.spawnPlayer(req.user._id, req.body.gameID);

      console.log("spawned player");
      console.log(Game.gameState);
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
    Game.removePlayer(req.user);
  }
  res.send({});
});


router.post("/submitResponse", (req, res) => {
  // playerID, gameID, promptID, response
  if (req.user) {
    if(req.body.gameID){
      Game.submitResponse(req.user._id, req.body.gameID, req.body.promptID, req.body.response);
    }
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
