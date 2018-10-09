const express = require("express");
const socket = require("socket.io");
const constants = require("./constants");

const app = express();

server = app.listen(5000, () => console.log("server is running on port 5000"));

io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);
  io.emit('handshake', "Now, client and server is connected");
  socket.on(constants.SEND_MESSAGE, data => {
    io.emit(constants.RECEIVE_MESSAGE, data);
  });
});
