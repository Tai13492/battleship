import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from '../welcome/Loading';
import Board from '../battleship';
import Welcome from '../welcome';
import Lobby from '../lobby';

class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Welcome} />
					<Route exact path="/loading" component={Loading} />
					<Route exact path="/lobby" component={Lobby} />
					<Route exact path="/board" component={Board} />
					{/* <Route exact path="/game" component={Battleship} /> */}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
