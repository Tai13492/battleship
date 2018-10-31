import { observable, action } from 'mobx';
import io from 'socket.io-client';

const square = { key: 0, ship: null, isHit: false };
const ship = {
	status: 'FUNCTIONAL',
	shipOrder: ''
};

class BattleShipStore {
	@observable
	socket = io('localhost:5000') || null;
	@observable
	name = '';
	@observable
	socketId = '';
	@observable
	squares = Array(8).fill(Array(8).fill(square, 0, 8), 0, 8);
	@observable
	activeShip = {};
	@observable
	roomName = '';
	@observable
	activeButton = {
		shipOrder: '',
		orientation: 'HORIZONTAL'
	};
	constructor() {
		if (this.socket !== null) {
			this.socket.on('SOCKET', id => console.log(id));
			this.socket.on('GREETINGS_FROM_OPPONENT', msg => console.log(msg));
		}
	}

	@action.bound
	setActiveButton(shipOrder, orientation) {
		console.log('i am called');
		this.activeButton = {
			shipOrder,
			orientation
		};
	}

	@action.bound
	placeShip(x, y) {
		console.log('place ship is calleddd');
		const { shipOrder, orientation } = this.activeButton;
		if (shipOrder === '') return;
		if (orientation === 'HORIZONTAL') {
			if (this.squares[x][y + 3] === undefined) return;
			for (let i = 0; i < 4; i++) {
				this.squares[x][y + i].ship = { ...ship, shipOrder: shipOrder };
			}
		} else {
			if (this.squares[x + 3] === undefined) return;
			for (let i = 0; i < 4; i++) {
				this.squares[x + i][y].ship = { ...ship, shipOrder: shipOrder };
			}
		}
	}

	@action.bound
	setName(name) {
		this.name = name;
	}

	@action.bound
	sendNameToServer() {
		this.socket.emit('SET_NAME', this.name);
	}

	@action.bound
	joinRoom(name = this.name) {
		this.socket.emit('JOIN_ROOM', name);
		this.roomName = name;
	}

	@action.bound
	sendMyName() {
		this.socket.emit('GREETINGS', `${this.name} sends his regards!`);
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
