import { observable, action } from "mobx";
import io from "socket.io-client";

const square = { key: 0, ship: null };
const ship = {
  key: "",
  status: "FUNCTIONAL"
};

class BattleShipStore {
  @observable
  socket = null;
  @observable
  squares = Array(8).fill(Array(8).fill(square, 0, 8), 0, 8);
  @observable
  activeShip = {};
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

/*
 @action.bound
  setShips(x, y) {
    const { xCoord, yCoord, num } = this.activeShip;
    const diffX = x - xCoord;
    const diffY = y - yCoord;
    let shipsClone = [...this.ships];
    shipsClone = shipsClone.map(shipClone => {
      const { xCoord, yCoord } = shipClone;
      if (shipClone.num === num) {
        return { ...shipClone, xCoord: xCoord + diffX, yCoord: yCoord + diffY };
      }
      return { ...shipClone };
    });
    this.ships = shipsClone;
    console.log("done");
    console.log(this.ships);
  }

  @action.bound
  setActiveShip(ship) {
    this.activeShip = ship;
  }

  @action.bound
  clearActiveShip() {
    this.activeShip = {};
  }
*/
