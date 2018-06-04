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
		            	<h6 className="form__header">password reset</h6>
			            <div className="form__subheader reset">
			                <p>Your password has been reset succesfully</p>
			                <p>Enter a new password to continue</p>
			            </div>
		            	<div className="form__input-wrap reset">
							<input className="form__input" type="text" placeholder="New Password" />
							<input className="form__input" type="password" placeholder="Confirm Password" />
		            	</div>
		            	<button className="form__btn">Save &amp; Continue</button>
		          	</div>
		        </div>
	      	</div>
	    );
	}
}

export default ResetPassword;
