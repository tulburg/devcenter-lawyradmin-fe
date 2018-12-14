import React, { Component } from "react";

export class Notification extends Component {
	render() {
		return (
			<div>
				<form action="">
					<textarea
						name="Enter notification"
						id=""
						cols="30"
						rows="10"
					/>

					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default Notification;
