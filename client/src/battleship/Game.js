import React from 'react';
import background from '../common/assets/game_bg.jpeg';
import { inject, observer } from 'mobx-react';
import BoardSquare from './components/BoardSquare';
import OpponentBoardSquare from './components/OpponentBoardSquare';
import explosion from '../common/assets/explosion.png';

@inject('battleship')
@observer
class Game extends React.Component {
	state = {
		countDownTimer: 10,
		rematchCount: 0,
		hitSound: false,
		missSound: false,
		reveilMap: false,
		reveilMapCount: 0
	};
	componentDidMount() {
		const { turn, name } = this.props.battleship;
		if (turn === name) {
			this.setTimer();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { changeTurn, turn, name, prevTurn } = this.props.battleship;
		const { countDownTimer } = this.state;
		if (prevTurn !== turn && turn === name && countDownTimer === 10)
			this.setTimer();
		if (prevState.countDownTimer === 0) {
			clearInterval(this.interval);
			this.setState({ countDownTimer: 10 });
			changeTurn();
		}
	}

	setTimer = () => {
		this.interval = setInterval(() => {
			this.setState(prevState => ({
				countDownTimer: prevState.countDownTimer - 1
			}));
		}, 1000);
	};

	renderBoard = () => {
		const { squares } = this.props.battleship;
		return squares.map((square, x) =>
			square.map((s, y) => {
				const isEmpty = squares[x][y].ship === null;
				const { isHit } = squares[x][y];
				return (
					<div
						key={'' + x + y}
						style={{ width: '12.5%', height: '12.5%' }}
					>
						<BoardSquare
							onClick={() => console.log(`x:${x},y:${y}`)}
							isEmpty={isEmpty}
							isWhite={isHit && isEmpty}
						>
							{isHit && !isEmpty ? (
								<img src={explosion} alt="explosion" />
							) : (
								!isEmpty && (
									<img
										src={squares[x][y].ship.shipPart}
										alt="ship_part"
									/>
								)
							)}
						</BoardSquare>
					</div>
				);
			})
		);
	};

	renderOpponentBoard = () => {
		const {
			opponentSquares,
			turn,
			name,
			gunFired,
			sendBoardToOpponent,
			changeTurn
		} = this.props.battleship;
		if (this.state.reveilMap) {
			console.log('hello');
			return opponentSquares.map((opponentSquare, x) =>
				opponentSquare.map((s, y) => {
					const isEmpty = opponentSquares[x][y].ship === null;
					const { isHit } = opponentSquares[x][y];
					return (
						<div
							key={'' + x + y}
							style={{ width: '12.5%', height: '12.5%' }}
						>
							<BoardSquare
								onClick={() => console.log(`x:${x},y:${y}`)}
								isEmpty={isEmpty}
								isWhite={isHit && isEmpty}
							>
								{isHit && !isEmpty ? (
									<img src={explosion} alt="explosion" />
								) : (
									!isEmpty && (
										<img
											src={
												opponentSquares[x][y].ship
													.shipPart
											}
											alt="ship_part"
										/>
									)
								)}
							</BoardSquare>
						</div>
					);
				})
			);
		}
		return opponentSquares.map((opponentSquare, x) =>
			opponentSquare.map((s, y) => {
				const isEmpty = opponentSquares[x][y].ship === null;
				const { isHit } = opponentSquares[x][y];
				return (
					<div
						key={'' + x + y}
						style={{ width: '12.5%', height: '12.5%' }}
					>
						<OpponentBoardSquare
							onClick={() => {
								if (turn === name) {
									if (isHit) {
										console.log('YOU CANNOT SHOOT HERE!');
									} else {
										gunFired(x, y);
										sendBoardToOpponent();
										clearInterval(this.interval);
										this.setState({ countDownTimer: 10 });
										if (isEmpty) changeTurn();
									}
								} else {
									console.log('NOT YOUR TURN!');
								}
							}}
							isWhite={isHit && isEmpty}
						>
							{isHit && !isEmpty ? (
								<img src={explosion} alt="explosion" />
							) : null}
						</OpponentBoardSquare>
					</div>
				);
			})
		);
	};
	render() {
		const {
			turn,
			name,
			opponentName,
			isGameOver,
			opponentDestroyedShips,
			destroyedShips,
			backToLobby,
			playerReset,
			opponentReset,
			askForReset,
			resetGame,
			setOpponentReset,
			declinedReset,
			roomName,
			playerPoint,
			opponentPoint,
			incrementPlayerPoint,
			incrementOpponentPoint,
			numberOfTurns
		} = this.props.battleship;
		const { push } = this.props.history;
		const { countDownTimer, rematchCount } = this.state;
		if (playerReset && opponentReset) {
			resetGame(push);
		}
		return (
			<div
				style={{
					backgroundImage: `url(${background})`,
					width: '100vw',
					height: '100vh',
					backgroundSize: 'cover',
					backgroundPosition: 'fixed',
					padding: 60
				}}
			>
				<div className="columns">
					<div className="column">
						<h1 className="title is-2 is-white">
							{turn}
							's Turn
						</h1>
					</div>
					<div className="column">
						<h1
							className={`title is-2 is-white has-text-centered ${turn !==
								name && 'is-hidden'} `}
						>
							{countDownTimer}
						</h1>
					</div>
					<div className="column">
						<h1 className="title is-2 is-white has-text-right">
							Score: {opponentDestroyedShips.length}
						</h1>
					</div>
				</div>
				<div className="columns">
					<div className="column">
						<h1 className="title is-3 is-white">
							{name} <br />
							Point: {playerPoint}
						</h1>
					</div>
					<div className="column">
						<h1 className="title is-3 is-white has-text-centered">
							Turn: {numberOfTurns}
						</h1>
					</div>
					<div className="column">
						<h1 className="title is-3 is-white has-text-right">
							{opponentName} <br />
							Point: {opponentPoint}
						</h1>
					</div>
				</div>
				<div className="columns is-variable is-3 is-centered">
					<div
						className="column"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<div
							style={{
								width: '30vw',
								height: '60vh',
								display: 'flex',
								flexWrap: 'wrap',
								paddingTop: 20
							}}
						>
							{this.renderBoard()}
						</div>
					</div>
					<div
						className="column"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<div
							style={{
								width: '30vw',
								height: '60vh',
								display: 'flex',
								flexWrap: 'wrap',
								paddingTop: 20
							}}
						>
							{this.renderOpponentBoard()}
						</div>
					</div>
				</div>
				<p className="has-text-centered">
					<button
						className={`button is-warning ${this.state
							.reveilMapCount > 0 && 'is-hidden'}`}
						onClick={() => {
							this.setState({
								reveilMap: true,
								reveilMapCount: 1
							});
							setTimeout(
								() => this.setState({ reveilMap: false }),
								250
							);
						}}
						style={{ marginTop: 20 }}
					>
						Reveal map
					</button>
				</p>
				<p className="has-text-centered">
					<button
						className={`button is-danger ${(rematchCount > 1 ||
							name !== turn) &&
							'is-hidden'}`}
						onClick={() => {
							askForReset();
							this.setState(prevState => ({
								rematchCount: prevState.rematchCount + 1
							}));
						}}
						style={{ marginTop: 20 }}
					>
						Rematch ?
					</button>
				</p>

				<div className={`modal ${playerReset && 'is-active'}`}>
					<div className="modal-background" />
					<div className="modal-content">
						<h1 className="title is-2 is-white has-text-centered">
							Waiting for opponent...
						</h1>
					</div>
				</div>
				<div className={`modal ${opponentReset && 'is-active'}`}>
					<div className="modal-background" />
					<div
						className="modal-content"
						style={{ backgroundColor: 'white' }}
					>
						<div className="modal-card">
							<header className="modal-card-head">
								<p className="modal-card-title has-text-centered">
									Opponent ask for a rematch!
								</p>
							</header>
						</div>
						<section
							className="modal-card-body"
							style={{ padding: 24 }}
						>
							<h1 className="title is-1 has-text-centered">
								Would you like to rematch ?
							</h1>
						</section>
						<footer className="modal-card-foot">
							<button
								className="button is-success"
								onClick={() => {
									askForReset();
								}}
							>
								Rematch!
							</button>
							<button
								className="button is-danger"
								onClick={() => {
									declinedReset();
									setOpponentReset(false);
								}}
							>
								No!
							</button>
						</footer>
					</div>
				</div>
				<div className={`modal ${isGameOver && 'is-active'}`}>
					<div className="modal-background" />
					<div
						className="modal-content"
						style={{ backgroundColor: 'white' }}
					>
						<section
							className="modal-card-body"
							style={{ padding: 24 }}
						>
							{destroyedShips.length > 15 ? (
								<h1 className="title is-1 has-text-centered">
									YOU LOSE !
								</h1>
							) : (
								<h1 className="title is-1 has-text-centered">
									You WIN!
								</h1>
							)}
							<h1 className="title is-2">
								Your score : {opponentDestroyedShips.length}
							</h1>
							<h1 className="title is-2">
								Opponent score : {destroyedShips.length}
							</h1>
						</section>
						<footer className="modal-card-foot">
							<button
								className="button is-success"
								onClick={() => {
									if (opponentDestroyedShips.length > 15) {
										askForReset(name, roomName);
										incrementPlayerPoint();
									} else {
										askForReset();
										incrementOpponentPoint();
									}
								}}
							>
								Rematch!
							</button>
							<button
								className="button"
								onClick={() => backToLobby(push)}
							>
								Back to lobby
							</button>
							<p>
								{playerReset &&
									'waiting for your opponent decision....'}
							</p>
						</footer>
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
