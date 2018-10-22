import io from "socket.io-client";
import { observable, action, computed } from "mobx";

class SocketStore {
  @observable
  socket = io("localhost:5000");
  @observable
  name = "";

  constructor() {
    if (this.socket !== null) {
      // this.socket.on("handshake", data => console.log(data));
      this.socket.on("RECEIVE_MESSAGE", data => console.log(data + "bibi"));
    }
  }

  // @action.bound
  // initiateWebSocket() {
  //   this.socket = io("localhost:5000");
  // }
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
}

export default new SocketStore();
