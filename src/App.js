import React, { Component } from 'react';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Dashboard from './dashboard';

class App extends Component {
	render() {
	    return (
	      	<Router>
		        <div>
					<Route exact path="/" component={Login} />
					<Route path="/reset-password" component={ResetPassword} />
					<Route path="/forgot-password" component={ForgotPassword} />
					<Route path="/dashboard" component={Dashboard} />
		        </div>
	      	</Router>
	    );
	}
}


export default App;
