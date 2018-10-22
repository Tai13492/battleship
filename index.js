const express = require("express");
const socket = require("socket.io");
const constants = require("./constants");

const app = express();

server = app.listen(5000, () => console.log("server is running on port 5000"));

let clients = [];

io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);
  socket.on("SEND_MESSAGE", data => {
    console.log(data);
    io.emit("RECEIVE_MESSAGE", "gigi");
  });
});
