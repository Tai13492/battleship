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
    const oldRoomIndex = rooms.findIndex(room => room.roomName === name);
    if (oldRoomIndex !== -1) {
      rooms[oldRoomIndex].players = [];
    }
    const players = [rooms[index].players[0], name];
    const randomPlayer = Math.round(Math.random());
    const firstPlayer = randomPlayer === 0 ? players[0] : players[1];
    rooms[index] = {
      ...rooms[index],
      players,
      firstPlayer
    };
  }
};

const getAvailableRooms = () => {
  const availableRooms = rooms.filter(room => room.players.length === 1);
  return availableRooms;
};

io = socket(server);

io.on("connection", socket => {
  socket.emit("SOCKET", socket.id);
  socket.on("SET_NAME", name => {
    const isNameUsed = !!clients.find(client => client.name === name);
    socket.name = name;
    if (isNameUsed) socket.emit("NAME_ERROR", "This name is already used!");
    else {
      clients.push({ name, id: socket.id });
      io.emit("TOTAL_PLAYERS", clients.length);
    }
  });
  socket.on("JOIN_ROOM", (roomName, name) => {
    if (getRoomName(socket)) socket.leave(getRoomName(socket));
    enterRoom(roomName, socket.name);
    socket.join(roomName, () => {
      socket.to(getRoomName(socket)).emit("OPPONENT_JOINED", name);
      io.emit("AVAILABLE_ROOMS", getAvailableRooms());
    });
  });
  socket.on("GET_ROOMS", () => {
    io.emit("AVAILABLE_ROOMS", getAvailableRooms());
  });
  socket.on("READY", (squares, destroyedShips, roomName) => {
    const playerRoom = rooms.find(room => room.roomName === roomName);
    socket
      .to(getRoomName(socket))
      .emit("OPPONENT_IS_READY", squares, destroyedShips, playerRoom);
  });
  socket.on("GUN_FIRED", (opponentSquares, opponentDestroyedShips) => {
    socket
      .to(getRoomName(socket))
      .emit("OPPONENT_SHOT", opponentSquares, opponentDestroyedShips);
  });
  socket.on("CHANGE_TURN", name => {
    socket.to(getRoomName(socket)).emit("TURN_CHANGED", name);
  });
  socket.on("END_GAME", () => {
    io.in(getRoomName(socket)).emit("GAME_OVER");
  });
  socket.on("BACK_TO_LOBBY", (previousRoomName, newRoomName) => {
    if (previousRoomName === newRoomName) {
      const index = rooms.findIndex(room => room.roomName === previousRoomName);
      rooms = [...rooms.slice(0, index), ...rooms.slice(index + 1)];
    } else {
      const index2 = rooms.findIndex(room => room.roomName === newRoomName);
      rooms = [...rooms.slice(0, index2), ...rooms.slice(index2 + 1)];
    }
    socket.leave(getRoomName(socket));
  });
  socket.on("ASK_FOR_RESET", (name, roomName) => {
    if (name) {
      rooms.forEach((room, idx) => {
        if (roomName === room.roomName) {
          rooms[idx].firstPlayer = name;
        }
      });
    }
    socket.to(getRoomName(socket)).emit("OPPONENT_ASK_FOR_RESET");
  });
  socket.on("DECLINED_RESET", () => {
    socket.to(getRoomName(socket)).emit("OPPONENT_DECLINED_RESET");
  });
  socket.on("disconnect", () => {
    clients.forEach((client, idx) => {
      if (client.id === socket.id) clients.splice(idx, 1);
    });
    io.emit("TOTAL_PLAYERS", clients.length);
  });
});
