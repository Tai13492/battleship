import React from 'react';
import { inject, observer } from 'mobx-react';
import full_ship from './assets/full_ship.png';
import full_ship_vertical from './assets/full_ship_vertical.png';

@inject('battleship')
@observer
class SetupBoard extends React.Component {
	renderForm = () => {
		const { setActiveButton, docks, resetShip } = this.props.battleship;
		return docks.map((ship, i) => (
			<div className="field is-horizontal" key={i + 'form'}>
				<div className="field-label is-normal">
					<label className="label">Ship {ship.shipOrder}</label>
				</div>
				<div className="field-body">
					<div className="field is-grouped">
						<p className="control">
							<button
								className="button"
								onClick={() =>
									setActiveButton(
										ship.shipOrder,
										'HORIZONTAL'
									)
								}
								disabled={ship.status === 'DEPLOYED'}
							>
								Horizontal
							</button>
						</p>
						<p className="control">
							<button
								className="button"
								onClick={() =>
									setActiveButton(ship.shipOrder, 'VERTICAL')
								}
								disabled={ship.status === 'DEPLOYED'}
							>
								Vertical
							</button>
						</p>
						<p className="control">
							<button
								className="button is-danger"
								disabled={ship.status === 'WAITING'}
								onClick={() => resetShip(ship.shipOrder)}
							>
								Reset
							</button>
						</p>
					</div>
				</div>
			</div>
		));
	};
	renderShip = () => {
		const { activeButton } = this.props.battleship;
		if (activeButton.orientation === '') return null;
		else if (activeButton.orientation === 'HORIZONTAL')
			return (
				<div
					style={{
						display: 'flex',
						height: '60%',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<img
						src={full_ship}
						alt="ship"
						style={{ maxWidth: 360, objectFit: 'cover' }}
					/>
				</div>
			);
		else
			return (
				<div
					style={{
						display: 'flex',
						height: '60%',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<img
						src={full_ship_vertical}
						alt="vertical_ship"
						style={{
							maxHeight: 360,
							objectFit: 'cover',
							display: 'block'
						}}
					/>
				</div>
			);
	};
	renderReadyButton = () => {
		const { docks } = this.props.battleship;
		if (
			docks[0].status === 'DEPLOYED' &&
			docks[1].status === 'DEPLOYED' &&
			docks[2].status === 'DEPLOYED' &&
			docks[3].status === 'DEPLOYED'
		) {
			return (
				<div
					style={{
						display: 'flex',
						height: '60%',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<button
						className="button is-large"
						style={{ width: '100%' }}
					>
						<strong> READY ! </strong>
					</button>
				</div>
			);
		}
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
				{this.renderShip()}
				{this.renderReadyButton()}
			</div>
		);
	}
}

export default SetupBoard;
