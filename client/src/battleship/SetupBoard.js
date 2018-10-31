import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('battleship')
@observer
class SetupBoard extends React.Component {
	renderForm = () => {
		const { setActiveButton } = this.props.battleship;
		return Array(4)
			.fill({})
			.map((e, i) => (
				<div className="field is-horizontal" key={i + 'form'}>
					<div className="field-label is-normal">
						<label className="label">Ship {i + 1}</label>
					</div>
					<div className="field-body">
						<div className="field">
							<p className="control">
								<button
									className="button"
									onClick={() =>
										setActiveButton(i + 1, 'HORIZONTAL')
									}
								>
									Horizontal
								</button>
								<button
									className="button"
									onClick={() =>
										setActiveButton(i + 1, 'VERTICAL')
									}
								>
									Vertical
								</button>
							</p>
						</div>
					</div>
				</div>
			));
	};

	render() {
		return (
			<div
				style={{
					backgroundColor: '#d3d3d3',
					width: '100%',
					height: '100%',
					padding: 20,
					color: 'white'
				}}
			>
				<h1 className="title is-2"> PLACE YOUR SHIP </h1>
				{this.renderForm()}
			</div>
		);
	}
}

export default SetupBoard;
