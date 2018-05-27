import React, { Component } from 'react';
import store from '../store';

export default class Test extends Component {

	render() {
		return(
			<div className="main-section">
				<section className="test-questions">
					<span className="back-arrow">
					  	<i className="fas fa-arrow-left fa-lg" />
					</span>
					<h1 className="heading">Hello World</h1>
					<div className="top-action">
						<select><option value="">Year: 2012</option></select>
						<button className="btn-primary alt sparse">Edit</button>
					</div>
					<div className="question-pane">
						<div className="question">
							<div className="number">1</div>
							<div className="details">
								<div className="action-pane">
									<div className="title sparse">QUESTION</div>
									<div className="actions">
										<button className="small"><i className="fas fa-plus"></i> Link to Another Question</button>
										<span className="info-btn"><i className="fas fa-info"></i></span>
									</div>
								</div>
								<div className="question-box">
									Mr. Agu has juast been announced winner of the East American Lottery that took place. He has the title documents to late Mr. Kolawole's house in Ibadan. Mr. Kolawole died intestate and the childen of the deceased (Victor 39 and Emma 35) are still in the process of obtaining Letters of Administration. Meanwhile, each of the two sons are persistently disturbing him (Mr. Agu) to give it to them. He is therefore confused as to whom to delier this document as he does not want to pass t to the wrong person and neither does he want to continue to hold on to it. He has approached the court to decide on who to deliver the document to.
								</div>
							</div>
						</div>
						<div className="option-heading">
							<ul className="grid grid-2"><li className="sparse">OPTIONS</li><li className="sparse">MORE INFO</li></ul>
						</div>
						<div className="options">
							<div className="number bordered">A</div>
							<div className="option-pane">
								<ul className="grid grid-2">
									<li><div className="option-box">Stakeholder Interpleader</div></li>
									<li><div className="info-box">Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property</div></li>
								</ul>
							</div>
						</div>
						<div className="options">
							<div className="number bordered">B</div>
							<div className="option-pane">
								<ul className="grid grid-2">
									<li><div className="option-box">Stakeholder Interpleader</div></li>
									<li><div className="info-box">Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property</div></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="answer-pane">
						<div className="title">Set an Option</div>
						<select><option value="">B</option><option value="">A</option></select>
						<button className="sparse">save</button>
					</div>
				</section>
			</div>
		);
	}
	componentDidMount() {
		store.dispatch({ type: 'SHOW_QUESTION_NAV', payload: 10 });
	}
	componentWillUnmount() {
		store.dispatch({ type: 'HIDE_QUESTION_NAV', payload: 0 });
	}
}