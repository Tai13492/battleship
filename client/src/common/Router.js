import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NameSelection from "../name_selection/NameSelection";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={NameSelection} />
          {/* <Route exact path="/game" component={Game} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
