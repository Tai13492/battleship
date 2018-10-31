import React from 'react';
import Ship from '../components/Ship';
import BoardSquare from '../components/BoardSquare';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { observer, inject } from 'mobx-react';

@inject('battleship')
@observer
@DragDropContext(HTML5Backend)
class Board extends React.Component {
	renderBoard = () => {
		const { squares } = this.props.battleship;
		return squares.map((square, x) =>
			square.map((s, y) => (
				<div
					key={'' + x + y}
					style={{ width: '12.5%', height: '12.5%' }}
				>
					<BoardSquare />
				</div>
			))
		);
	};

	render() {
		return (
			<div style={{ padding: 40 }}>
				<div
					style={{
						width: '30vw',
						height: '40vh',
						display: 'flex',
						flexWrap: 'wrap'
					}}
				>
					{this.renderBoard()}
				</div>
			</div>
		);
	}
}

export default Board;

/*
const n = 8; // Or something else

[...Array(n)].map((e, i) => <span className="busterCards" key={i}>♦</span>)

*/

/*
 renderSquare = i => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={`${i} square`} style={{ width: "12.5%", height: "12.5%" }}>
        {this.renderPiece(x, y)}
      </div>
    );
  };
  renderBoard = () => {
    const n = 64;
    return [...Array(n)].map((e, i) => {
      return this.renderSquare(i);
    });
  };
  renderPiece = (x, y) => {
    const {
      ships,
      activeShip,
      setShips,
      setActiveShip,
      clearActiveShip
    } = this.props.battleship;
    const index = ships.findIndex(
      ship => ship.xCoord === x && ship.yCoord === y
    );
    if (index === -1) return <BoardSquare setShips={() => setShips(x, y)} />;
    else {
      const { num } = ships[index];
      return (
        <BoardSquare>
          <Ship
            setActiveShip={() => setActiveShip(ships[index])}
            num={num}
            activeShip={activeShip}
            clearActiveShip={clearActiveShip}
          />
        </BoardSquare>
      );
    }
  };
  render() {
    return (
      <div
        style={{ width: 800, height: 800, display: "flex", flexWrap: "wrap" }}
      >
        {this.renderBoard()}
      </div>
    );
  }
*/
