import React from 'react';
import Ship from './Ship';

class Dock extends React.Component {
	render() {
		return (
			<div style={{ padding: 20 }}>
				<Ship />
			</div>
		);
	}
}

export default Dock;
