import React from 'react';

const Square = ({ children }) => (
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
);

export default Square;
