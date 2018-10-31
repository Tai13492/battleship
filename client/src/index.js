import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import battleship from './common/store';

const store = { battleship };
// const store = { socket, battleship };

ReactDOM.render(
	<Provider {...store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
