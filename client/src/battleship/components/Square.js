import React from 'react';

const Square = ({ children }) => (
	<div
		style={{
			backgroundColor: '#a9a9a9',
			width: '100%',
			height: '100%',
			border: '2px solid white'
		}}
	>
		{children}
	</div>
);

export default Square;
