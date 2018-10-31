const express = require("express");
const socket = require("socket.io");
// const constants = require("./constants");

const app = express();

server = app.listen(5000, () => console.log("server is running on port 5000"));

let clients = [];

io = socket(server);

io.on("connection", socket => {
  console.log(socket.id, "from connection");
  socket.emit("SOCKET", socket.id);
  socket.on("SET_NAME", name => {
    const isNameUsed = !!clients.find(client => client.name === name);
    if (isNameUsed) socket.emit("NAME_ERROR", "This name is already used!");
    else clients.push({ name, id: socket.id });
  });
  socket.on("JOIN_ROOM", name => {
    if (getRoomName(socket)) socket.leave(getRoomName(socket));
    socket.join(name);
    console.log(getRoomName(socket), "from rooms");
  });
  socket.on("GREETINGS", msg => {
    socket.to(getRoomName(socket)).emit("GREETINGS_FROM_OPPONENT", msg);
  });

  // socket.on("SECRET", () => {
  //   io.emit("SEND_SECRET", socket.secret);
  // });
});

const getRoomName = socket => Object.values(socket.rooms)[0];
