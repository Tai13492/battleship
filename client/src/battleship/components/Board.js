import React from "react";
import Ship from "../components/Ship";
import BoardSquare from "../components/BoardSquare";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

@DragDropContext(HTML5Backend)
class Board extends React.Component {
  renderSquare = i => {
    const { coord, setCoord } = this.props;
    const [xCoord, yCoord] = coord;
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={`${i} square`} style={{ width: "12.5%", height: "12.5%" }}>
        <BoardSquare setCoord={setCoord} x={x} y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
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
    const { coord } = this.props;
    const [xCoord, yCoord] = coord;
    if (xCoord === x && yCoord === y) {
      return <Ship />;
    }
    return "";
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
