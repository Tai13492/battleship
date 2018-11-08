import React, { Component } from 'react';
import background from '../common/assets/first_page_bg.jpeg';
import { inject, observer } from 'mobx-react';
import battleship_logo from '../common/assets/battleship_logo.png';

@inject('battleship')
@observer
class Welcome extends Component {
	render() {
		const { push } = this.props.history;
		const { name, setName, sendNameToServer } = this.props.battleship;
		return (
			<div
				style={{
					backgroundImage: `url(${background})`,
					width: '100vw',
					height: '100vh',
					backgroundSize: 'cover',
					backgroundPosition: 'fixed',
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<div className="container">
					<p className="has-text-centered">
						<img
							src={battleship_logo}
							alt="logo"
							style={{ width: '50%' }}
						/>
					</p>

					<div className="columns" style={{ marginTop: 60 }}>
						<div className="column is-8 is-offset-2">
							<div className="field">
								<div className="control">
									<input
										type="text"
										className="input is-large"
										placeholder="Enter Your Name"
										value={name}
										required={true}
										onChange={e => setName(e.target.value)}
									/>
								</div>
							</div>
							<p className="has-text-centered">
								<button
									className="button is-large"
									style={{ width: '100%', marginTop: 24 }}
									onClick={() => {
										sendNameToServer();
										push('/loading');
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

export default Welcome;
