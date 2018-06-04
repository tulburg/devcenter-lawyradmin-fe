import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import store from '../store';


export class TestView extends Component {
	state = { gotoEdit: false };
	render() {
		if(this.state.gotoEdit){ return (<Redirect to="1/edit"/>); }
		return(<div className="main-section">
			<section className="test-questions">
				<span className="back-arrow" onClick={() => window.history.go(-1) }>
				  	<i className="fas fa-arrow-left fa-lg" />
				</span>
				<h1 className="heading">Hello World</h1>
				<div className="top-action">
					<select><option value="">Year: 2012</option></select>
					<button className="btn-primary alt sparse" onClick={() => { this.setState({gotoEdit: true})}}>Edit</button>
				</div>
				<div className="question-pane edit-question">
					<div className="question">
						<div className="number">1</div>
						<div className="details">
							<div className="action-pane">
								<div className="title sparse">QUESTION</div>
								<div className="actions">
									<Link to="1/edit"> Linked to Question 2, 4, 5, 6</Link>
								</div>
							</div>
							<div className="question-box">
								Mr. Agu has juast been announced winner of the East American Lottery that took place. He has the title documents to late Mr. Kolawole's house in Ibadan. Mr. Kolawole died intestate and the childen of the deceased (Victor 39 and Emma 35) are still in the process of obtaining Letters of Administration. Meanwhile, each of the two sons are persistently disturbing him (Mr. Agu) to give it to them. He is therefore confused as to whom to delier this document as he does not want to pass t to the wrong person and neither does he want to continue to hold on to it. He has approached the court to decide on who to deliver the document to.
							</div>
						</div>
					</div>
					<div className="option-heading">
						<ul className="grid grid-2"><li className="sparse">ANSWERS</li><li className="sparse"></li></ul>
					</div>
					<div className="options">
						<div className="tab"></div>
						<div className="option-pane">
							<ul className="grid grid-2">
								<li>
									<div className="answer-box active">
										<div className="answer-title"><div className="number bordered">A</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
								<li>
									<div className="answer-box">
										<div className="answer-title"><div className="number bordered">B</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className="options">
						<div className="tab"></div>
						<div className="option-pane">
							<ul className="grid grid-2">
								<li>
									<div className="answer-box">
										<div className="answer-title"><div className="number bordered">C</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
								<li>
									<div className="answer-box">
										<div className="answer-title"><div className="number bordered">D</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="question-pane edit-question">
					<div className="question">
						<div className="number">2</div>
						<div className="details">
							<div className="action-pane">
								<div className="title sparse">QUESTION</div>
								<div className="actions">
									<Link to="1/edit"> Linked to Question 2, 4, 5, 6</Link>
								</div>
							</div>
							<div className="question-box">
								Mr. Agu has juast been announced winner of the East American Lottery that took place. He has the title documents to late Mr. Kolawole's house in Ibadan. Mr. Kolawole died intestate and the childen of the deceased (Victor 39 and Emma 35) are still in the process of obtaining Letters of Administration. Meanwhile, each of the two sons are persistently disturbing him (Mr. Agu) to give it to them. He is therefore confused as to whom to delier this document as he does not want to pass t to the wrong person and neither does he want to continue to hold on to it. He has approached the court to decide on who to deliver the document to.
							</div>
						</div>
					</div>
					<div className="option-heading">
						<ul className="grid grid-2"><li className="sparse">ANSWERS</li><li className="sparse"></li></ul>
					</div>
					<div className="options">
						<div className="tab"></div>
						<div className="option-pane">
							<ul className="grid grid-2">
								<li>
									<div className="answer-box">
										<div className="answer-title"><div className="number bordered">A</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
								<li>
									<div className="answer-box">
										<div className="answer-title"><div className="number bordered">B</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className="options">
						<div className="tab"></div>
						<div className="option-pane">
							<ul className="grid grid-2">
								<li>
									<div className="answer-box active">
										<div className="answer-title"><div className="number bordered">C</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
								<li>
									<div className="answer-box">
										<div className="answer-title"><div className="number bordered">D</div>Stakeholder Interpleader </div>
										Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property
									</div>
								</li>
							</ul>
						</div>
					</div>
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

export default class Test extends Component {
	textAreaChange(q, e) {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
	}
	render() {
		return(
			<div className="main-section">
				<section className="test-questions test-edit">
					<span className="back-arrow">
					  	<i className="fas fa-arrow-left fa-lg" />
					</span>
					<h1 className="heading">Hello World</h1>
					<div className="top-action">
						<select><option value="">Year: 2012</option></select>
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
								<div className="edit-question-box">
									<textarea onChange={(e) => this.textAreaChange("questionId", e)} defaultValue="Mr. Agu has juast been announced winner of the East American Lottery that took place. He has the title documents to late Mr. Kolawole's house in Ibadan. Mr. Kolawole died intestate and the childen of the deceased (Victor 39 and Emma 35) are still in the process of obtaining Letters of Administration. Meanwhile, each of the two sons are persistently disturbing him (Mr. Agu) to give it to them. He is therefore confused as to whom to delier this document as he does not want to pass t to the wrong person and neither does he want to continue to hold on to it. He has approached the court to decide on who to deliver the document to." />
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
									<li><div className="option-box"><textarea onChange={(e) => this.textAreaChange("questionId", e)} defaultValue="Stakeholder Interpleader" /></div></li>
									<li><div className="info-box"><textarea onChange={(e) => this.textAreaChange("questionId", e)} defaultValue="Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property" /></div></li>
								</ul>
							</div>
						</div>
						<div className="options">
							<div className="number bordered">B</div>
							<div className="option-pane">
								<ul className="grid grid-2">
									<li><div className="option-box"><textarea onChange={(e) => this.textAreaChange("questionId", e)} defaultValue="Stakeholder Interpleader" /></div></li>
									<li><div className="info-box"><textarea onChange={(e) => this.textAreaChange("questionId", e)} defaultValue="Interpleader proceedings are either Sheriff or Stakeholder. Sheriff involves the Sheriff of trhe court while Stakeholder involves a third party in custody of property" /></div></li>
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
		let textareas = document.getElementsByTagName("textarea");
		for(var i=0;i<textareas.length;i++) { textareas[i].style.height = textareas[i].scrollHeight+"px"; }
	}
	componentWillUnmount() {
		store.dispatch({ type: 'HIDE_QUESTION_NAV', payload: 0 });
	}
}