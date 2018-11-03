import { observable, action } from 'mobx';
import io from 'socket.io-client';

import body_ship_2_vertical from '../battleship/assets/body_ship_2_vertical.png';
import body_ship_2 from '../battleship/assets/body_ship_2.png';
import body_ship_vertical from '../battleship/assets/body_ship_vertical.png';
import body_ship from '../battleship/assets/body_ship.png';
import headship_vertical from '../battleship/assets/headship_vertical.png';
import headship from '../battleship/assets/tailship.png';
import tailship_vertical from '../battleship/assets/tailship_vertical.png';
import tailship from '../battleship/assets/headship.png';

const horizontalShip = [headship, body_ship, body_ship_2, tailship];
const verticalShip = [
	headship_vertical,
	body_ship_vertical,
	body_ship_2_vertical,
	tailship_vertical
];

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
	opponentName = '';
	@observable
	docks = [
		{ shipOrder: 1, status: 'WAITING' },
		{ shipOrder: 2, status: 'WAITING' },
		{ shipOrder: 3, status: 'WAITING' },
		{ shipOrder: 4, status: 'WAITING' }
	];
	@observable
	destroyedShips = [];
	@observable
	isReady = false;

	constructor() {
		if (this.socket !== null) {
			this.socket.on('SOCKET', id => console.log(id));
			this.socket.on('OPPONENT_JOINED', name =>
				this.setOpponentName(name)
			);
			this.socket.on(
				'OPPONENT_IS_READY',
				(opponentSquares, opponentDestroyedShips, playerRoom) => {
					console.log(opponentSquares, 'OPPONENT SQUARES');
					console.log(opponentDestroyedShips, 'DESTROYED');
					console.log(playerRoom, 'ROOM');
				}
			);
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
					shipPart: horizontalShip[i],
					orientation: 'HORIZONTAL'
				};
			}
		} else {
			if (this.squares[x + 3] === undefined) return;
			for (let i = 0; i < 4; i++) {
				this.squares[x + i][y].ship = {
					...ship,
					shipOrder: shipOrder,
					shipPart: verticalShip[i],
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
	setOpponentName(name) {
		this.opponentName = name;
	}
	@action.bound
	sendNameToServer() {
		this.socket.emit('SET_NAME', this.name);
	}

	@action.bound
	joinRoom(name = this.name) {
		this.socket.emit('JOIN_ROOM', name, this.name);
		this.roomName = name;
	}
	@action.bound
	setIsReady() {
		this.socket.emit(
			'READY',
			this.squares,
			this.destroyedShips,
			this.roomName
		);
		this.isReady = true;
	}
	// @action.bound
	// joinedOtherRoom() {
	// 	this.socket.emit('JOINED_OTHER_ROOM', this.name);
	// }
}

export default new BattleShipStore();
