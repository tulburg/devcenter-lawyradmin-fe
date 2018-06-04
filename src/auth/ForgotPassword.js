import React, { Component } from "react";
import logo from '../assets/logo.svg';

class ResetPassword extends Component {
	render() {
	    return (
	      	<div className="login-container">
		        <div className="login-content">
		          	<div className="header-wrap">
		          		<img src={logo} alt="logo" width="80px" />
			            <h1>Lawyr</h1>
			            <h6>Learning Resource for Law Students</h6>
		          	</div>

		      		<div className="login-form">
		            	<h6 className="form__header">enter your email address</h6>
				        <span className="form__subheader">
				          	You'd receive a link to reset your password
				        </span>
			            <div className="form__input-wrap forgot">
			              	<input className="form__input" type="email" placeholder="Email" />
			            </div>
			            <div style={{ marginTop: "15px", marginBottom: "35px" }}>
			              	<a href="/" className="form__fpw">Back to Login</a>
			            </div>
		            	<button className="form__btn">Reset</button>
		          	</div>
		        </div>
	      	</div>
	    );
	}
}

export default ResetPassword;
