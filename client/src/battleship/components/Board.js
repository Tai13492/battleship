import React from "react";
import Ship from "../components/Ship";
import BoardSquare from "../components/BoardSquare";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

@DragDropContext(HTML5Backend)
class Board extends React.Component {
  state = {
    ships: [
      { xCoord: 0, yCoord: 0, status: "FUNCTIONAL", key: 0, num: 1 },
      { xCoord: 1, yCoord: 0, status: "FUNCTIONAL", key: 1, num: 1 },
      { xCoord: 2, yCoord: 0, status: "FUNCTIONAL", key: 2, num: 1 },
      { xCoord: 3, yCoord: 0, status: "FUNCTIONAL", key: 3, num: 1 },
      { xCoord: 0, yCoord: 1, status: "FUNCTIONAL", key: 4, num: 2 },
      { xCoord: 1, yCoord: 1, status: "FUNCTIONAL", key: 5, num: 2 },
      { xCoord: 2, yCoord: 1, status: "FUNCTIONAL", key: 6, num: 2 },
      { xCoord: 3, yCoord: 1, status: "FUNCTIONAL", key: 7, num: 2 },
      { xCoord: 0, yCoord: 2, status: "FUNCTIONAL", key: 8, num: 3 },
      { xCoord: 1, yCoord: 2, status: "FUNCTIONAL", key: 9, num: 3 },
      { xCoord: 2, yCoord: 2, status: "FUNCTIONAL", key: 10, num: 3 },
      { xCoord: 3, yCoord: 2, status: "FUNCTIONAL", key: 11, num: 3 },
      { xCoord: 0, yCoord: 3, status: "FUNCTIONAL", key: 12, num: 4 },
      { xCoord: 1, yCoord: 3, status: "FUNCTIONAL", key: 13, num: 4 },
      { xCoord: 2, yCoord: 3, status: "FUNCTIONAL", key: 14, num: 4 },
      { xCoord: 3, yCoord: 3, status: "FUNCTIONAL", key: 15, num: 4 }
    ],
    activeShip: {}
  };

  setShips = (x, y) => {
    const { xCoord, yCoord, num } = this.state.activeShip;
    const diffX = x - xCoord;
    const diffY = y - yCoord;
    let shipsClone = [...this.state.ships];
    shipsClone = shipsClone.map(shipClone => {
      const { xCoord, yCoord } = shipClone;
      if (shipClone.num === num) {
        return { ...shipClone, xCoord: xCoord + diffX, yCoord: yCoord + diffY };
      }
      return { ...shipClone };
    });
    this.setState({
      ships: shipsClone
    });
    // shipsClone[ship.key] = { ...ship, xCoord: x, yCoord: y };
    // this.setState({ ships: shipsClone });
  };

  setActiveShip = ship => {
    this.setState({ activeShip: ship });
  };

  clearActiveShip = () => {
    this.setState({ activeShip: {} });
  };

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
    const { ships } = this.state;
    const index = ships.findIndex(
      ship => ship.xCoord === x && ship.yCoord === y
    );
    if (index === -1)
      return <BoardSquare setShips={() => this.setShips(x, y)} />;
    else {
      const { num } = ships[index];
      return (
        <BoardSquare>
          <Ship
            setActiveShip={() => this.setActiveShip(this.state.ships[index])}
            num={num}
            activeShip={this.state.activeShip}
            clearActiveShip={this.clearActiveShip}
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
}

export default Board;

/*
const n = 8; // Or something else

[...Array(n)].map((e, i) => <span className="busterCards" key={i}>♦</span>)

*/
