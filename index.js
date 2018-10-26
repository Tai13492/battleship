const express = require("express");
const socket = require("socket.io");
// const constants = require("./constants");

const app = express();

server = app.listen(5000, () => console.log("server is running on port 5000"));

// let clients = [];

io = socket(server);

io.on("connection", socket => {
  console.log(socket.id, "from connection");
  io.emit("SOCKET", socket.id);
  socket.on("JOIN_ROOM", id => {
    socket.join(id);
    console.log(getRoomId(socket), "from rooms");
  });

  socket.on("SECRET", () => {
    io.emit("SEND_SECRET", socket.secret);
  });
});

const getRoomId = socket => Object.keys(socket.rooms)[0];
