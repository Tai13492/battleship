import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from '../welcome/Loading';
import Board from '../battleship';
import Welcome from '../welcome';
import Lobby from '../lobby';
import Game from '../battleship/Game';
import song from '../battleship/assets/song.mp3';
class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					{/* <audio controls autoPlay loop={true}>
						<source src={song} type="audio/ogg" />
					</audio> */}
					<Switch>
						<Route exact path="/" component={Welcome} />
						<Route exact path="/loading" component={Loading} />
						<Route exact path="/lobby" component={Lobby} />
						<Route exact path="/board" component={Board} />
						<Route exact path="/game" component={Game} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default Router;

/*

*/
