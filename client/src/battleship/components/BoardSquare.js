import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('battleship')
@observer
class BoardSquare extends React.Component {
	render() {
		const { onClick, isEmpty, isWhite } = this.props;
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
					className="clickable"
					onClick={() => {
						isEmpty
							? onClick()
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
