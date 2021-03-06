import { observable, action, computed } from 'mobx';
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
	socket = io('http://172.20.10.9:5000') || null;
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
	@observable
	turn = '';
	@observable
	opponentSquares = [];
	@observable
	opponentDestroyedShips = [];
	@observable
	availableRooms = [];
	@observable
	prevTurn = '';
	@observable
	isGameOver = false;
	@observable
	playerReset = false;
	@observable
	opponentReset = false;
	@observable playerPoint = 0;
	@observable opponentPoint = 0;
	@observable totalPlayers = 0;
	constructor() {
		if (this.socket !== null) {
			this.socket.on('SOCKET', id => console.log(id));
			this.socket.on('OPPONENT_JOINED', name =>
				this.setOpponentName(name)
			);
			this.socket.on(
				'OPPONENT_IS_READY',
				(opponentSquares, opponentDestroyedShips, playerRoom) => {
					this.initializeOpponent(
						opponentSquares,
						opponentDestroyedShips,
						playerRoom
					);
				}
			);
			this.socket.on('OPPONENT_SHOT', (squares, destroyedShips) => {
				this.setMyBoard(squares, destroyedShips);
			});
			this.socket.on('TURN_CHANGED', name => {
				this.setTurn(name);
			});
			this.socket.on('AVAILABLE_ROOMS', rooms =>
				this.setAvailableRooms(rooms)
			);
			this.socket.on('GAME_OVER', () => {
				this.setIsGameOver(true);
			});
			this.socket.on('OPPONENT_ASK_FOR_RESET', () => {
				this.setOpponentReset(true);
			});
			this.socket.on('OPPONENT_DECLINED_RESET', () => {
				this.setPlayerReset(false);
			});
			this.socket.on('TOTAL_PLAYERS', num => this.setTotalPlayers(num));
		}
	}
	@action.bound
	setTotalPlayers(num) {
		this.totalPlayers = num;
	}
	@action.bound
	setIsGameOver(bool) {
		this.isGameOver = bool;
	}

	@action.bound
	setAvailableRooms(rooms) {
		this.availableRooms = rooms;
	}

	@action.bound
	setTurn(name) {
		this.prevTurn = this.turn;
		this.turn = name;
	}

	@action.bound
	initializeOpponent(opponentSquares, opponentDestroyedShips, playerRoom) {
		this.opponentSquares = opponentSquares;
		this.opponentDestroyedShips = opponentDestroyedShips;
		this.turn = playerRoom.firstPlayer;
	}

	@action.bound
	setMyBoard(squares, destroyedShips) {
		this.squares = squares;
		this.destroyedShips = destroyedShips;
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
			for (let check = 0; check < 4; check++) {
				if (this.squares[x][y + check].ship !== null) return;
			}
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
			for (let check = 0; check < 4; check++) {
				if (this.squares[x + check][y].ship !== null) return;
			}
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
	@action.bound
	gunFired(x, y) {
		const square = this.opponentSquares[x][y];
		this.opponentSquares[x][y].isHit = true;
		if (square.ship !== null) this.opponentDestroyedShips.push(square.ship);
	}

	@action.bound
	sendBoardToOpponent() {
		if (this.opponentDestroyedShips.length > 15) {
			this.socket.emit('END_GAME');
		}
		this.socket.emit(
			'GUN_FIRED',
			this.opponentSquares,
			this.opponentDestroyedShips
		);
	}
	@action.bound
	changeTurn() {
		this.socket.emit('CHANGE_TURN', this.opponentName);
		this.turn = this.opponentName;
	}
	@action.bound
	getRooms() {
		this.socket.emit('GET_ROOMS');
	}
	@action.bound
	backToLobby(push) {
		this.socket.emit('BACK_TO_LOBBY', this.roomName, this.name);
		this.squares = Array(8).fill(Array(8).fill(square, 0, 8), 0, 8);
		this.roomName = this.name;
		this.opponentName = '';
		this.docks = [
			{ shipOrder: 1, status: 'WAITING' },
			{ shipOrder: 2, status: 'WAITING' },
			{ shipOrder: 3, status: 'WAITING' },
			{ shipOrder: 4, status: 'WAITING' }
		];
		this.destroyedShips = [];
		this.isReady = false;
		this.turn = '';
		this.opponentSquares = [];
		this.opponentDestroyedShips = [];
		this.prevTurn = '';
		this.isGameOver = false;
		this.playerPoint = 0;
		this.opponentPoint = 0;
		this.setPlayerReset(false);
		push('/lobby');
	}
	@action.bound
	resetGame(push) {
		this.setPlayerReset(false);
		this.setOpponentReset(false);
		this.squares = Array(8).fill(Array(8).fill(square, 0, 8), 0, 8);
		this.docks = [
			{ shipOrder: 1, status: 'WAITING' },
			{ shipOrder: 2, status: 'WAITING' },
			{ shipOrder: 3, status: 'WAITING' },
			{ shipOrder: 4, status: 'WAITING' }
		];
		this.destroyedShips = [];
		this.isReady = false;
		this.opponentSquares = [];
		this.opponentDestroyedShips = [];
		this.prevTurn = '';
		this.isGameOver = false;
		push('/board');
	}
	@action.bound
	askForReset(name, roomName) {
		this.setPlayerReset(true);
		this.socket.emit('ASK_FOR_RESET', name, roomName);
	}
	@action.bound
	setPlayerReset(bool) {
		this.playerReset = bool;
	}
	@action.bound
	setOpponentReset(bool) {
		this.opponentReset = bool;
	}
	@action.bound
	declinedReset() {
		this.socket.emit('DECLINED_RESET');
	}
	@action.bound
	incrementPlayerPoint() {
		this.playerPoint = this.playerPoint + 1;
	}
	@action.bound
	incrementOpponentPoint() {
		this.opponentPoint = this.opponentPoint + 1;
	}
	@computed
	get numberOfTurns() {
		let count = 0;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.squares[i][j].isHit) count++;
			}
		}
		if (this.opponentSquares.length < 1) return count;
		for (let m = 0; m < 8; m++) {
			for (let n = 0; n < 8; n++) {
				if (this.opponentSquares[m][n].isHit) count++;
			}
		}

		return count;
	}
}

export default new BattleShipStore();
