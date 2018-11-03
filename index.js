const express = require("express");
const socket = require("socket.io");

const app = express();

server = app.listen(5000, () => console.log("server is running on port 5000"));

let clients = [];
let rooms = [];

const getRoomName = socket => Object.values(socket.rooms)[0];

const enterRoom = (roomName, name) => {
  const index = rooms.findIndex(room => room.roomName === roomName);
  if (index === -1) {
    rooms.push({ roomName, players: [name] });
  } else {
    const randomPlayer = Math.round(Math.random());
    const firstPlayer = randomPlayer === 0 ? rooms[index].players[0] : name;
    rooms[index] = {
      ...rooms[index],
      players: [rooms[index].players[0], name],
      firstPlayer
    };
  }
};

io = socket(server);

io.on("connection", socket => {
  socket.emit("SOCKET", socket.id);
  socket.on("SET_NAME", name => {
    const isNameUsed = !!clients.find(client => client.name === name);
    socket.name = name;
    if (isNameUsed) socket.emit("NAME_ERROR", "This name is already used!");
    else clients.push({ name, id: socket.id });
  });
  socket.on("JOIN_ROOM", (roomName, name) => {
    if (getRoomName(socket)) socket.leave(getRoomName(socket));
    enterRoom(roomName, socket.name);
    socket.join(roomName, () =>
      socket.to(getRoomName(socket)).emit("OPPONENT_JOINED", name)
    );
  });
  socket.on("READY", (squares, destroyedShips, roomName) => {
    const playerRoom = rooms.find(room => room.roomName === roomName);
    socket
      .to(getRoomName(socket))
      .emit("OPPONENT_IS_READY", squares, destroyedShips, playerRoom);
  });
  socket.on(
    "GUN_FIRED",
    (opponentSquares, opponentDestroyedShips, whosTurn) => {
      socket
        .to(getRoomName(socket))
        .emit(
          "OPPONENT_SHOT",
          opponentSquares,
          opponentDestroyedShips,
          whosTurn
        );
    }
  );
});
