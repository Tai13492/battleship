import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('battleship')
@observer
class BoardSquare extends React.Component {
	render() {
		const { onClick ,isTarget } = this.props;
		return (
			<div
				style={{ position: 'relative', width: '100%', height: '100%' }}
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						border: '2px solid white'
					}}
					className="clickable"
					onClick={() => {
						isTarget
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