import { observable, action } from 'mobx';
import io from 'socket.io-client';

const square = { key: 0, ship: null, isHit: false };
const ship = {
	status: 'FUNCTIONAL',
	shipOrder: '',
	shipPart: '',
	orientation: ''
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
		orientation: ''
	};
	@observable
	docks = [
		{ shipOrder: 1, status: 'WAITING' },
		{ shipOrder: 2, status: 'WAITING' },
		{ shipOrder: 3, status: 'WAITING' },
		{ shipOrder: 4, status: 'WAITING' }
	];
	constructor() {
		if (this.socket !== null) {
			this.socket.on('SOCKET', id => console.log(id));
			this.socket.on('GREETINGS_FROM_OPPONENT', msg => console.log(msg));
		}
	}

	@action.bound
	setActiveButton(shipOrder, orientation) {
		this.activeButton = {
			shipOrder,
			orientation
		};
	}

	@action.bound
	placeShip(x, y) {
		const { shipOrder, orientation } = this.activeButton;
		if (shipOrder === '') return;
		if (orientation === 'HORIZONTAL') {
			if (this.squares[x][y + 3] === undefined) return;
			for (let i = 0; i < 4; i++) {
				this.squares[x][y + i].ship = {
					...ship,
					shipOrder: shipOrder,
					shipPart: i + 1,
					orientation: 'HORIZONTAL'
				};
			}
		} else {
			if (this.squares[x + 3] === undefined) return;
			for (let i = 0; i < 4; i++) {
				this.squares[x + i][y].ship = {
					...ship,
					shipOrder: shipOrder,
					shipPart: i + 1,
					orientation: 'VERTICAL'
				};
			}
		}
		this.activeButton = {
			shipOrder: '',
			orientation: ''
		};
		this.docks[shipOrder - 1].status = 'DEPLOYED';
	}

	@action.bound
	resetShip(shipOrder) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (
					this.squares[i][j].ship &&
					this.squares[i][j].ship.shipOrder === shipOrder
				)
					this.squares[i][j].ship = null;
			}
		}
		this.docks[shipOrder - 1].status = 'WAITING';
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
