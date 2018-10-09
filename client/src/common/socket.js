import io from "socket.io-client";
import { observable, action, computed } from "mobx";

class SocketStore {
  @observable
  connectedToServer = false;
  @observable
  socket = io('localhost:5000');

  constructor() {
    this.socket.on("handshake", (data) => console.log(data,'hello'));
  }

//   @action.bound
//   connectToServer() {
//     console.log("connecting");
//     setTimeout(() => {
//       this.socket = io("localhost:5000");
//       this.connectedToServer = true;
//       console.log("connected");
//       console.log(this.socket);
//     }, 5000);
//   }
}

export default new SocketStore();
