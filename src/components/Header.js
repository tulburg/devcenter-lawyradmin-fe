import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import store from '../store';
import logo from '../assets/logo.svg';

export default class Header extends Component {
	logout = () => { this.setState({logout: true}); store.dispatch({ type: 'LOGOUT_ACTION', payload: {} }); }
	state = { logout: false }
  	render() {
  		if(this.state.logout) { return (<Redirect to="/"/>); }
	    return (
		  	<header>
		    	<i className="ic-menu-2 res-menu"></i><img src={logo} alt="logo" width="40px" /> <Link to="/" className="no-decoration"><div className="header__logo">Lawyr</div></Link>
		    	<div className="right-action" align="right"><button className="btn-signout" onClick={() => this.logout() }>Sign out</button></div>
		  	</header>
		)
	}
}
