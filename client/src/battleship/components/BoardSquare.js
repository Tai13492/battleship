import React from "react";
import { ItemTypes } from "../constants";
import { DropTarget } from "react-dnd";
import Square from "./Square";
import { inject, observer } from "mobx-react";

const squareTarget = {
  drop(props) {
    if (!props.setShips) {
      return;
    }
    props.setShips();
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

@inject("battleship")
@observer
@DropTarget(ItemTypes.SHIP, squareTarget, collect)
class BoardSquare extends React.Component {
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Square> {this.props.children}</Square>
        {isOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "yellow"
            }}
          />
        )}
      </div>
    );
  }
}

export default BoardSquare;
