import React from 'react';
import loadingBackground from '../common/assets/loading_screen.jpeg';
import { inject, observer } from 'mobx-react';

@inject('battleship')
@observer
class Loading extends React.Component {
	componentDidMount() {
		this.interval = setInterval(() => {
			const progress = Math.floor(Math.random() * 20);
			this.setState(prevState => ({
				loadingValue: prevState.loadingValue + progress
			}));
		}, 100);
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.loadingValue > 100) {
			const { push } = this.props.history;
			clearInterval(this.interval);
			push('/lobby');
		}
	}
	state = {
		loadingValue: 0
	};
	render() {
		return (
			<div
				style={{
					backgroundImage: `url(${loadingBackground})`,
					width: '100vw',
					height: '100vh',
					backgroundSize: 'cover',
					backgroundPosition: 'fixed',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<progress
					className="progress is-large"
					value={this.state.loadingValue}
					max="100"
					style={{ maxWidth: '60vw', height: '6vh' }}
				/>

				<p
					className="title is-1"
					style={{
						color: 'white',
						position: 'absolute',
						bottom: 20,
						right: 40
					}}
				>
					{' '}
					Loading ...
				</p>
			</div>
		);
	}
}
export default Loading;
