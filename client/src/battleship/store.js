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

/*
//import io from "socket.io-client";
//import { observable, action, computed } from "mobx";
// import BattleShip from "../battleship/store";

// class SocketStore {
//   @observable
//   socket = io("localhost:5000") || null;
//   @observable
//   name = "";
//   @observable
//   socketId = "";

//   constructor() {
//     if (this.socket !== null) {
//       this.socket.on("SOCKET", socketId => {
//         this.socketId = socketId;
//         console.log(socketId);
//       });
//       this.socket.on("SEND_SECRET", secret => console.log(secret));
//     }
//   }
//   @action.bound
//   setName(name) {
//     this.name = name;
//   }
//   @computed
//   get isNameEmpty() {
//     if (this.name.length === 0) return true;
//     return false;
//   }
//   sendMessage() {
//     console.log("hello world");
//     this.socket.emit("SEND_MESSAGE", "hello eiei");
//   }
//   joinRoom() {
//     console.log(this.socketId, "JOINING");
//     this.socket.emit("JOIN_ROOM", this.socketId);
//   }

//   askForSecret() {
//     this.socket.emit("SECRET");
//   }

//   sendMockToServer() {
//     this.socket.emit("FROM_CLIENT", {
//       name: "Tai",
//       age: 20
//     });
//   }
// }

// export default new SocketStore();
*/
