import React from "react";

const Square = ({ children }) => (
  <div
    style={{
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      border: "1px solid black"
    }}
  >
    {children}
  </div>
);

export default Square;
