import io from "socket.io-client";
import { observable, action, computed } from "mobx";
// import BattleShip from "../battleship/store";

class SocketStore {
  @observable
  socket = io("localhost:5000") || null;
  @observable
  name = "";
  @observable
  socketId = "";

  constructor() {
    if (this.socket !== null) {
      this.socket.on("SOCKET", socketId => {
        this.socketId = socketId;
        console.log(socketId);
      });
      this.socket.on("SEND_SECRET", secret => console.log(secret));
    }
  }
  @action.bound
  setName(name) {
    this.name = name;
  }
  @computed
  get isNameEmpty() {
    if (this.name.length === 0) return true;
    return false;
  }
  sendMessage() {
    console.log("hello world");
    this.socket.emit("SEND_MESSAGE", "hello eiei");
  }
  joinRoom() {
    console.log(this.socketId, "JOINING");
    this.socket.emit("JOIN_ROOM", this.socketId);
  }

  askForSecret() {
    this.socket.emit("SECRET");
  }

  sendMockToServer() {
    this.socket.emit("FROM_CLIENT", {
      name: "Tai",
      age: 20
    });
  }
}

export default new SocketStore();
