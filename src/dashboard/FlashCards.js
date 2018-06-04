import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
										<h2>500</h2>
										<p>Custom Flashcards Created</p>
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
			        		<li><Link to="/dashboard/create-flashcard/civil"><div className="ball"><i className="ic-handcuffs"></i></div><h2 className="title">Civil Litigation</h2></Link></li>
			        		<li><Link to="/dashboard/create-flashcard/criminal"><div className="ball"><i className="ic-book"></i></div><h2 className="title">Criminal Litigation</h2></Link></li>
			        		<li><Link to="/dashboard/create-flashcard/corporate"><div className="ball"><i className="ic-olive"></i></div><h2 className="title">Corporate Law Practices</h2></Link></li>
			        		<li><Link to="/dashboard/create-flashcard/property"><div className="ball"><i className="ic-group"></i></div><h2 className="title">Property Law Practices</h2></Link></li>
			        		<li><Link to="/dashboard/create-flashcard/professional"><div className="ball"><i className="ic-university"></i></div><h2 className="title">Professional Skills and Ethics</h2></Link></li>
			        	</ul>
	        		</div>
				</section>
			</div>
		);
	}
}