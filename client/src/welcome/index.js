import React, { Component } from 'react';
import background from '../common/assets/first_page_bg.jpeg';
import { inject, observer } from 'mobx-react';


class Welcome extends Component {
	render() {
		const { push } = this.props.history;
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
					<div className="columns">
						<div className="column is-8 is-offset-2">
							<div className="field">
								<div className="control">
									<input
										type="text"
										className="input is-large"
										placeholder="Enter Your Name"
									/>
								</div>
							</div>
							<p className="has-text-centered">
								<button
									className="button is-large"
									style={{ width: '100%', marginTop: 24 }}
									onClick={() => push('/loading')}
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
