import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from '../welcome/Loading';
import Board from '../battleship';
import Welcome from '../welcome';
import Lobby from '../lobby';
import Game from '../battleship/Game';
import song2 from '../battleship/assets/song.mp3';
class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<embed
						name="song"
						src={song2}
						loop={false}
						autostart
						id="song"
					/>
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
