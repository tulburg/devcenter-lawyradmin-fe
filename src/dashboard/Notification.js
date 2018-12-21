import React, { Component } from "react";

export class Notification extends Component {
	state = {
		notification: ""
	};

	onSubmit = e => {
		e.preventDefault();
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit()}>
					<textarea
						name="notification"
						cols="30"
						rows="10"
						onChange={this.onChange}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default Notification;
