import React from 'react';
import background from '../common/assets/game_bg.jpeg';
import { inject, observer } from 'mobx-react';
import BoardSquare from './components/BoardSquare';
import OpponentBoardSquare from './components/OpponentBoardSquare';
import explosion from '../common/assets/explosion.png';

@inject('battleship')
@observer
class Game extends React.Component {
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
							{!isEmpty && (
								<img
									src={squares[x][y].ship.shipPart}
									alt="ship_part"
								/>
							)}
							{!isEmpty &&
								isHit && (
									<img src={explosion} alt="explosion" />
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
										if (isEmpty) changeTurn();
									}
								} else {
									console.log('NOT YOUR TURN!');
								}
							}}
							isWhite={isHit && isEmpty}
						>
							{isHit &&
								!isEmpty && (
									<img src={explosion} alt="explosion" />
								)}
						</OpponentBoardSquare>
					</div>
				);
			})
		);
	};
	render() {
		const { turn } = this.props.battleship;
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
				<h1 className="title is-2">
					{turn}
					's Turn
				</h1>
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
