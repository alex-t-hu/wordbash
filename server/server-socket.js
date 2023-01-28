let io;
const Game = require("./game-logic");
const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];
const gameJustChanged = (gameID) => {
  console.log("gameJustChanged");
  const game = Game.getGame(gameID);
  if (game && game.players) {
    const sockets = game.players.map((player) => getSocketFromUserID(player.id));
    sockets.forEach((socket) => {
      if (socket) {
        console.log("emitting gameUpdate", game["promptsFinished"]);
        socket.emit("gameUpdate", { game: game });
      }
    });
  }
};

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];

  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};



const editUser = (user) => {
  const oldSocket = userToSocketMap[user._id];
  console.log("editUser", user);
  if (oldSocket) {
    console.log("oldSocket");
    socketToUserMap[oldSocket.id] = user;
    io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
  }
};



const removeUser = (user, socket) => {
  if (user) {
    delete userToSocketMap[user._id];
  }
  delete socketToUserMap[socket.id];
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,
  editUser: editUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  gameJustChanged: gameJustChanged, 
  getIo: () => io,
};
