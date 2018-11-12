import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('battleship')
@observer
class OpponentBoardSquare extends React.Component {
	render() {
		const { onClick, isWhite } = this.props;
		return (
			<div
				style={{ position: 'relative', width: '100%', height: '100%' }}
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						border: '2px solid white',
						backgroundColor: isWhite && 'white'
					}}
					className="clickable-opponent"
					onClick={() => {
						onClick();
					}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default OpponentBoardSquare;
