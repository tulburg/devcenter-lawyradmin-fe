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

window.Array.prototype.where = function(obj) {
	for(var i=0;i<this.length;i++) {
		for(var v in obj) {
			if(this[i][v] && this[i][v] === obj[v]) return this[i];
		}
	}
	return undefined;
}
window.Element.prototype.$ = window.$ = function(id) {
	if(id[0] === ".") return (this) ? (this.getElementsByClassName(id.substring(1)).length === 1) ? this.getElementsByClassName(id.substring(1))[0] : this.getElementsByClassName(id.substring(1)) : (document.getElementsByClassName(id.substring(1)).length === 1) ? document.getElementsByClassName(id.substring(1))[0] : document.getElementsByClassName(id.substring(1));
	if(id[0] === "#") return (this) ? this.getElementById(id.substring(1)) : document.getElementById(id.substring(1));
	if(id[0] === ">") return (this) ? (this.getElementsByTagName(id.substring(1)).length === 1) ? this.getElementsByTagName(id.substring(1))[0] : this.getElementsByTagName(id.substring(1)) : (document.getElementsByTagName(id.substring(1)).length === 1) ? document.getElementsByTagName(id.substring(1))[0] : document.getElementsByTagName(id.substring(1));
	return undefined;
}

ReactDOM.render(
	<Provider store={store}>
		<ConnectedApp />
	</Provider>
, document.getElementById('root'));

function mapStateToProps(state) {
	return state;
}
registerServiceWorker();
