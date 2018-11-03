import React from 'react';
import background from '../common/assets/game_bg.jpeg';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@inject('battleship')
@observer
class Lobby extends React.Component {
	state = {
		roomName: ''
	};
	render() {
		const { push } = this.props.history;
		const {
			name,
			joinRoom,
			opponentName,
			setOpponentName
		} = this.props.battleship;
		const { roomName } = this.state;
		if (opponentName !== '') return <Redirect exact to="/board" />;
		return (
			<div
				style={{
					backgroundImage: `url(${background})`,
					width: '100vw',
					height: '100vh',
					backgroundSize: 'cover',
					backgroundPosition: 'fixed',
					padding: 60
				}}
			>
				<div className="container">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<h1
								className="title is-1"
								style={{ color: 'white' }}
							>
								Welcome, {name}
							</h1>
							<h1
								className="title is-2"
								style={{ color: 'white' }}
							>
								Your room name is {name}. <br /> Room Status:
								waiting for connection...
							</h1>
							<h1
								className="title is-2"
								style={{ color: 'white' }}
							>
								{' '}
								Join a room{' '}
							</h1>
							<div className="field">
								<div className="control">
									<input
										type="text"
										className="input"
										placeholder="Enter a room name"
										value={roomName}
										onChange={e =>
											this.setState({
												roomName: e.target.value
											})
										}
									/>
								</div>
							</div>
							<p className="has-text-centered">
								<button
									className="button"
									style={{ marginTop: 24 }}
									onClick={() => {
										push('/board');
										joinRoom(roomName);
										setOpponentName(roomName);
									}}
								>
									<strong> START </strong>
								</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Lobby;
