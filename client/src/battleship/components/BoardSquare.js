import React from 'react';
import Square from './Square';
import { inject, observer } from 'mobx-react';

@inject('battleship')
@observer
class BoardSquare extends React.Component {
	render() {
		return (
			<div
				style={{ position: 'relative', width: '100%', height: '100%' }}
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						border: '2px solid white',
						backgroundColor: !this.props.isEmpty ? 'blue' : ''
					}}
					className="clickable"
					onClick={() => {
						this.props.isEmpty
							? this.props.placeShip()
							: console.log('this slot is fulled!');
					}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default BoardSquare;

/*
<div
		style={{
			width: '100%',
			height: '100%',
			border: '2px solid white'
		}}
		className="clickable"
	>
		{children}
	</div>
*/
