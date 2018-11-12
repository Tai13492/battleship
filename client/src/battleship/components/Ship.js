import React from "react";

import { ItemTypes } from "../constants";
import { DragSource } from "react-dnd";
import { inject, observer } from "mobx-react";

const shipSource = {
  beginDrag(props) {
    props.setActiveShip();
    return {};
  },
  endDrag(props) {
    props.clearActiveShip();
  }
  // isDragging(props) {
  //   const { num, activeShip } = props;
  //   return num === activeShip.num;
  // }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

@inject("battleship")
@observer
@DragSource(ItemTypes.SHIP, shipSource, collect)
class Ship extends React.Component {
  render() {
    const { connectDragSource, isDragging, num, activeShip } = this.props;
    const isDraggingShip = num === (activeShip && activeShip.num);
    return connectDragSource(
      <div
        style={{
          opacity: isDragging || isDraggingShip ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
          backgroundColor: "blue",
          width: "100%",
          height: "100%"
        }}
      />
    );
  }
}
export default Ship;
