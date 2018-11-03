import React from 'react';
import background from '../common/assets/game_bg.jpeg';
import { inject, observer } from 'mobx-react';
import BoardSquare from './components/BoardSquare';
import OpponentBoardSquare from './components/OpponentBoardSquare';

@inject('battleship')
@observer
class Game extends React.Component {
	renderBoard = () => {
		const { squares } = this.props.battleship;
		return squares.map((square, x) =>
			square.map((s, y) => {
				const isEmpty = squares[x][y].ship === null;
				return (
					<div
						key={'' + x + y}
						style={{ width: '12.5%', height: '12.5%' }}
					>
						<BoardSquare
							onClick={() => console.log(`x:${x},y:${y}`)}
							isEmpty={isEmpty}
						>
							{!isEmpty && (
								<img
									src={squares[x][y].ship.shipPart}
									alt="ship_part"
								/>
							)}
						</BoardSquare>
					</div>
				);
			})
		);
	};
	renderOpponentBoard = () => {
		const { opponentSquares } = this.props.battleship;
		return opponentSquares.map((opponentSquares, x) =>
			opponentSquares.map((s, y) => {
				const isEmpty = opponentSquares[x][y].ship === null;
				const { isHit } = opponentSquares[x][y];
				return (
					<div
						key={'' + x + y}
						style={{ width: '12.5%', height: '12.5%' }}
					>
						<OpponentBoardSquare
							onClick={() =>
								isHit
									? console.log('eiei')
									: console.log('bibi')
							}
						>
							{!isEmpty && (
								<img
									src={squares[x][y].ship.shipPart}
									alt="ship_part"
								/>
							)}
						</OpponentBoardSquare>
					</div>
				);
			})
		);
	};
	render() {
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
			/>
		);
	}
}

export default Game;
