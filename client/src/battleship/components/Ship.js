import React from "react";

import { ItemTypes } from "../constants";
import { DragSource } from "react-dnd";

const shipSource = {
  beginDrag(props) {
    return {};
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

@DragSource(ItemTypes.SHIP, shipSource, collect)
class Ship extends React.Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
          color: "black"
        }}
      >
        ♘
      </div>
    );
  }
}
export default Ship;
