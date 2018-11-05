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
		countDownTimer: 10
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
		console.log(prevTurn, 'prevTurn');
		console.log(turn, 'turn');
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
		const { turn } = this.props.battleship;
		const { countDownTimer } = this.state;
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
						<h1 className="title is-2 is-white has-text-centered">
							{countDownTimer}
						</h1>
					</div>
					<div className="column">
						<h1 className="title is-2 is-white has-text-right">
							Score: 0
						</h1>
					</div>
				</div>

				<div className="columns is-variable is-3">
					<div className="column">
						<div
							style={{
								width: '40vw',
								height: '80vh',
								display: 'flex',
								flexWrap: 'wrap',
								paddingTop: 40
							}}
						>
							{this.renderBoard()}
						</div>
					</div>
					<div className="column">
						<div
							style={{
								width: '40vw',
								height: '80vh',
								display: 'flex',
								flexWrap: 'wrap',
								paddingTop: 40
							}}
						>
							{this.renderOpponentBoard()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
