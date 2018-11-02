import React from 'react';
import BoardSquare from './components/BoardSquare';
import { observer, inject } from 'mobx-react';
import background from '../common/assets/game_bg.jpeg';
import SetupBoard from './SetupBoard';


@inject('battleship')
@observer
class Board extends React.Component {
	// componentWillMount() {
	// 	const { opponentName, joinedOtherRoom } = this.props.battleship;
	// 	if (opponentName === '') joinedOtherRoom();
	// }
	renderBoard = () => {
		const { squares, placeShip } = this.props.battleship;
		return squares.map((square, x) =>
			square.map((s, y) => (
				<div
					key={'' + x + y}
					style={{ width: '12.5%', height: '12.5%' }}
				>
					<BoardSquare
						placeShip={() => placeShip(x, y)}
						isEmpty={squares[x][y].ship === null}
					/>
				</div>
			))
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
					padding: 40,
					display: 'flex',
					justifyContent: 'center'
				}}
				className="custom"
			>
				<div className="columns is-variable is-6">
					<div className="column">
						<SetupBoard />
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
							{this.renderBoard()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Board;
