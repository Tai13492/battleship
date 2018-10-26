import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Board from "../battleship/components/Board";

const Mock = () => <h1> hello world </h1>;

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Board} />
          {/* <Route exact path="/game" component={Battleship} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
