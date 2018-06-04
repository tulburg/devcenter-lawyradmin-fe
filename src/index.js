import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import './index.css';
import './assets/css/main.css';
import './assets/fonts/lawyr/stylesheet.css';
import './assets/fonts/circular/stylesheet.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedApp />
	</Provider>
, document.getElementById('root'));

function mapStateToProps(state) {
	return state;
}
registerServiceWorker();
