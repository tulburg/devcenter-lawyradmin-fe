import React, { Component } from 'react';
import store from '../store';

export default class FlashCards extends Component {

	render() {
		return (
			<div className="main-section">
				<section className="flashcards">
					<div className="card-holder">
						<ul className="grid grid-3">
							<li>
								<div className="card">
									<i className="fas fa-list"></i>
									<div className="content">
										<h2>200</h2>
										<p>Purcharsed Flashcards</p>
									</div>
								</div>
							</li>
							<li>
								<div className="card">
									<i className="fas fa-list"></i>
									<div className="content">
										<h2>200</h2>
										<p>Purcharsed Flashcards</p>
									</div>
								</div>
							</li>
							<li></li>
						</ul>
					</div>

	        		<div className="courses">
		        		<h2 className="main-section__header">Create/Edit a Test</h2>
			        	<p className="main-section__sub-header">Choose a Course</p>

			        	<ul className="grid grid-5">
			        		<li><div className="ball"><i className="fas fa-book"></i></div><h2 className="title">Criminal Law</h2></li>
			        		<li><div className="ball"><i className="fas fa-book"></i></div><h2 className="title">Criminal Law</h2></li>
			        		<li><div className="ball"><i className="fas fa-book"></i></div><h2 className="title">Criminal Law</h2></li>
			        		<li><div className="ball"><i className="fas fa-book"></i></div><h2 className="title">Criminal Law</h2></li>
			        		<li><div className="ball"><i className="fas fa-book"></i></div><h2 className="title">Criminal Law</h2></li>
			        	</ul>
	        		</div>
				</section>
			</div>
		);
	}
}