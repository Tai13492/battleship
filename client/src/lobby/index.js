import React from 'react';
import background from '../common/assets/first_page_bg.jpeg';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@inject('battleship')
@observer
class Lobby extends React.Component {
	componentDidMount() {
		const { getRooms } = this.props.battleship;
		getRooms();
	}
	renderAvailableRooms = () => {
		const {
			availableRooms,
			joinRoom,
			setOpponentName,
			name
		} = this.props.battleship;
		const { push } = this.props.history;

		return availableRooms.map(availableRoom => {
			const { roomName } = availableRoom;
			return (
				<div
					className={`box-list ${name === roomName && 'is-hidden'}`}
					key={roomName}
					onClick={() => {
						push('/board');
						joinRoom(roomName);
						setOpponentName(roomName);
					}}
				>
					<p className="title is-5 is-white"> {roomName}</p>
				</div>
			);
		});
	};

	render() {
		const { name, opponentName, availableRooms } = this.props.battleship;
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
						<div className="column is-6">
							<h1
								className="title is-2"
								style={{ color: 'white' }}
							>
								{' '}
								Welcome,
								{name}
							</h1>
							<h1
								className="title is-2"
								style={{ color: 'white' }}
							>
								Your Lobby Name is {name}
							</h1>
							<h1
								className="title is-2"
								style={{ color: 'white' }}
							>
								Lobby Status: Waiting for connection...
							</h1>
							<article className="message is-info">
								<div className="message-header">
									<h1 className="title is-2">
										Players Online: {availableRooms.length}{' '}
										people
									</h1>
								</div>
							</article>
						</div>
						<div className="column is-6">
							<h1 className="title is-2 is-white">
								Available Lobby
							</h1>
							<h1 className="title is-3 is-white">
								Click to Join
							</h1>
							<div className="background-panel">
								{this.renderAvailableRooms()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Lobby;
{
	/* <p className="has-text-centered">
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
							</p> */
}
