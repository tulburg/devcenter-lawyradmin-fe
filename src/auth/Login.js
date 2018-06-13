import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import store from '../store';
import logo from '../assets/logo.svg';

class Login extends Component {
	state = { email: '', password: '', loading: false, hasError: false, error: '', redirect: false };
	login(email, password) {
		this.setState({loading: true});
		fetch(store.getState().state.api.dev+"users/login", {
			method: 'POST',
			headers : { 'accept': 'application/json', 'content-type': 'application/json' },
			body: JSON.stringify({ email: email, password: password })
		}).then(response => response.json()).then((res)=> {
			console.log(res);
			this.setState({loading: false});
			if(res.status) {
				store.dispatch({ type: 'LOGIN_ACTION', payload: { token: res.data.access_token }});
				this.setState({ redirect: true });
				window.location.href = "/dashboard"
			}else {
				this.setState({error: 'Invalid Email or Password', hasError: true});
			}
		});
	}
	handleLogin = (event) => {
		event.preventDefault();
		this.login(this.state.email, this.state.password);
	}
	render() {
		if(store.getState().state.session.active) { return (<Redirect to="/dashboard"/>) }
		if(this.state.redirect) { return (<Redirect to="/dashboard"/>) }
	    return (
	  		<div className="login-container">
	    		<div className="login-content">
	          		<div className="header-wrap">
	          			<img src={logo} alt="logo" width="80px" />
				        <h1>Lawyr</h1>
				        <h6>Learning Resource for Law Students</h6>
	          		</div>

	          		<form className="login-form" onSubmit={this.handleLogin}>
	            		<h6 className="form__header">{this.state.loading ? 'Loading...' : [(this.state.hasError ? `${this.state.error}` : 'Login to continue')]}</h6>
	            		<div className="form__input-wrap">
	              			<input className="form__input" type="text" placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
	              			<input className="form__input" type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
	            		</div>
			            <div style={{ marginTop: "15px", marginBottom: "35px" }}>
			              	<Link to="/forgot-password" className="form__fpw">forgot password?</Link>
			            </div>
	            		<button className="form__btn">Login</button>
	          		</form>
	        	</div>
	      	</div>
	    );
	}
	componentDidMount() {
	}
}

export default Login;
