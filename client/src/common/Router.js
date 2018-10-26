import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Board from "../battleship/components/Board";

// const Mock = () => <Board coord={[7, 7]} />;

class Mock extends Component {
  state = {
    xCoord: 0,
    yCoord: 0
  };
  setCoord = (xCoord, yCoord) => {
    this.setState({ xCoord, yCoord });
  };
  render() {
    const { xCoord, yCoord } = this.state;
    return <Board coord={[xCoord, yCoord]} setCoord={this.setCoord} />;
  }
}

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Mock} />
          {/* <Route exact path="/game" component={Battleship} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
