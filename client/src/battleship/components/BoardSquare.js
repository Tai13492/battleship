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
				<Square> {this.props.children}</Square>
			</div>
		);
	}
}

export default BoardSquare;
