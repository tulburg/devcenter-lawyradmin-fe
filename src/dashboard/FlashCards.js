import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import store from '../store';

export default class FlashCards extends Component {

	render() {
		return (
			<div className="main-section">
				<Route exact path={`${this.props.match.url}/`} component={FlashCardsIndex} />
				<Route path={`${this.props.match.url}/:course_id`} component={CreateFlashCards} />
			</div>
		);
	}
}

class FlashCardsIndex extends Component {
	render() {
		return (
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
		        		<li><Link to={`${this.props.match.url}/3789374893421`}><div className="ball"><i className="ic-handcuffs"></i></div><h2 className="title">Civil Litigation</h2></Link></li>
		        		<li><Link to="/dashboard/create-flashcard/criminal"><div className="ball"><i className="ic-book"></i></div><h2 className="title">Criminal Litigation</h2></Link></li>
		        		<li><Link to="/dashboard/create-flashcard/corporate"><div className="ball"><i className="ic-olive"></i></div><h2 className="title">Corporate Law Practices</h2></Link></li>
		        		<li><Link to="/dashboard/create-flashcard/property"><div className="ball"><i className="ic-group"></i></div><h2 className="title">Property Law Practices</h2></Link></li>
		        		<li><Link to="/dashboard/create-flashcard/professional"><div className="ball"><i className="ic-university"></i></div><h2 className="title">Professional Skills and Ethics</h2></Link></li>
		        	</ul>
	    		</div>
	    	</section>
		);
	}
}

class CreateFlashCards extends Component {
	state = {
		course: { title: "Criminal Law"},
		questions: ["h"]
	}
	render() {
		const renderedQuestions = this.state.questions.map(function(question) {
			return (
				<div className="question-pane edit-question">
					<div className="question">
						<div className="number">1</div>
						<div className="details">
							<div className="option-heading">
								<ul className="grid grid-2"><li className="sparse">QUESTION</li><li className="sparse">ANSWER</li></ul>
							</div>
						</div>
					</div>
					
					<div className="options">
						<div className="tab"></div>
						<div className="option-pane">
							<ul className="grid grid-2">
								<li>
									<div className="gray-box">
										Some description you are
									</div>
								</li>
								<li>
									<div className="gray-box">
										<div className="title">A. Shareholder interploader</div>
										Some description you are
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			);
		});
		return(
			<section className="flashcards">
				<div className="create-flashcard">
					<span className="back-arrow" onClick={() => window.history.go(-1) }>
					  	<i className="fas fa-arrow-left fa-lg" />
					</span>
					<h1 className="heading">{ this.state.course.title }</h1>
					<ul className="grid grid-2">
						<li>
							<a href="" className="no-decoration" onClick={(e) => { e.preventDefault(); this.setState({ showUploadModal: true })}}>
								<div className="top-action">
									<div className="title">Create a New Flashcard</div>
									<div className="subtitle">UPLOAD EXCEL (.xls) FILE</div>
								</div>
							</a>
						</li>
						<li>
							<div className="right-action">
								<button className="btn-primary sparse" onClick={() => { this.setState({gotoEdit: true})}}>Edit</button>
							</div>
						</li>
					</ul>
					<div>
						{ renderedQuestions }
					</div>

					<div className="create-box" align="center">
						<div className=""></div>
						<button className="alt">Create a new Flashcard</button>
					</div>
				</div>
			</section>
		);
	}
	componentDidMount() {
		fetch(store.getState().state.api.dev+"flashcards", {
			method: 'GET',
			headers: { 'Authorization' : 'Bearer '+store.getState().state.token }
		}).then(res => res.json()).then(res => {
			console.log(res);
		});
	}
}




