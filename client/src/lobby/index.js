import React from 'react';
import background from '../common/assets/first_page_bg.jpeg';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import avatar1 from '../battleship/assets/avatar1.png';
import avatar2 from '../battleship/assets/avatar2.png';
import avatar3 from '../battleship/assets/avatar3.png';

const avatars = [avatar1, avatar2, avatar3];

@inject('battleship')
@observer
class Lobby extends React.Component {
	state = {
		showTutorial: false,
		avatar: avatars[Math.floor(Math.random() * 2)]
	};
	componentDidMount() {
		const { joinRoom, getRooms } = this.props.battleship;
		joinRoom();
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
		const {
			name,
			opponentName,
			availableRooms,
			totalPlayers
		} = this.props.battleship;
		const { showTutorial } = this.state;
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
							<img src={this.state.avatar} alt="avatar" />
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
										Players Online: {totalPlayers} people
									</h1>
								</div>
							</article>
							<article className="message is-link">
								<div className="message-header">
									<h1 className="title is-2">
										Rooms Available:{' '}
										{availableRooms.length - 1} rooms
									</h1>
								</div>
							</article>
							<button
								className="button is-large"
								onClick={() =>
									this.setState({ showTutorial: true })
								}
							>
								Tutorial
							</button>
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
				<div className={`modal ${showTutorial && 'is-active'}`}>
					<div className="modal-background" />
					<div
						className="modal-content"
						style={{ backgroundColor: 'white' }}
					>
						<div className="modal-card">
							<header className="modal-card-head">
								<p className="modal-card-title has-text-centered">
									Tutorial
								</p>
							</header>
						</div>
						<section
							className="modal-card-body"
							style={{ padding: 24 }}
						>
							<div className="content">
								<h1 className="title is-3">
									Welcome to the battle of the sea!
								</h1>
								<h1 className="title is-4">
									Here is a quick guide on how to get the
									victory over the enemy.
								</h1>
								<ol>
									<li>
										{' '}
										Position your ships! All 4 of them.
									</li>
									<li>
										{' '}
										Each turn, guess where the opponent ship
										is, if your guess is right then enjoy
										another free extra turn!
									</li>
									<li>
										{' '}
										Try to sink all your enemy ships before
										they sink yours!
									</li>
									<li> Good luck and have fun</li>
								</ol>
							</div>
						</section>
						<footer className="modal-card-foot">
							<button
								className="button is-danger"
								onClick={() => {
									this.setState({ showTutorial: false });
								}}
							>
								close
							</button>
						</footer>
					</div>
				</div>
			</div>
		);
	}
}

export default Lobby;
