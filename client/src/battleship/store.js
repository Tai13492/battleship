import { observable, action } from "mobx";
import io from "socket.io-client";
class BattleShipStore {
  @observable
  socket = null;
  constructor() {
    if (this.socket !== null) {
      this.socket.on("room", data => console.log(data));
    }
  }
  @action.bound
  createConnection(id) {
    console.log(id, "from action");
    this.socket = io(`localhost:5000/${id}`);
  }
}

export default new BattleShipStore();
