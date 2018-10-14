import io from "socket.io-client";
import { observable, action, computed } from "mobx";

class SocketStore {
  @observable
  socket = null;
  @observable
  name = "";

  constructor() {
    if (this.socket !== null) {
      this.socket.on("handshake", data => console.log(data));
    }
  }

  @action.bound
  initiateWebSocket() {
    this.socket = io("localhost:5000");
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
}

export default new SocketStore();
