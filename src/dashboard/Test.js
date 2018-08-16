import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import store from '../store';
import Modal from '../components/Modal';
import Select from '../components/Select';


export class TestView extends Component {
	state = { gotoEdit: false, goHome: false, loadComplete: false, test: undefined, course: undefined };

	fetchQuestions() {
		let id = this.props.match.params.test_id;
		let course_id = this.props.match.params.course_id;
		let tests = store.getState().state["course_tests_"+course_id];
		let courses = store.getState().state.courses;
		if(tests !== undefined && courses !== undefined) {
			for ( var i = 0; i<courses.length; i++ ) {
				if(courses[i].id === course_id) { this.setState({ course: courses[i]}); }
			}
			for (var j = 0; j<tests.length; j++) {
				if(tests[j].id === id) { this.setState({test: tests[j]}); }
			}
			var self = this;
			setTimeout(function(){
				if(self.state.test !== undefined) {
					var qs = self.state.test.questions;
					var count = 0;
					for(var i = 0; i<qs.length; i++) {
						if(qs[i].answer.title !== "") count++;
					}
					store.dispatch({ type: 'SHOW_QUESTION_NAV', payload: count });
					self.setState({ loadComplete: true });
				}else { self.setState({goHome: true}); }
			}, 1000);
			
		}else { this.setState({goHome: true}); }
	}
	render() {
		let course_id = this.props.match.params.course_id;
		if(this.state.gotoEdit){ return (<Redirect to={`${this.props.match.url}/edit`} />); }
		if(this.state.goHome) { return (<Redirect to={`/dashboard/create-test/${course_id}`} />); }
		if(this.state.loadComplete === false) {
			return (
				<div className="main-section">
					<div className="load-pane">
						<i className="ic-spinner animate-spin"></i>
					</div>
				</div>
			);
		}else {
			let mappedQuestions = this.state.test.questions.map(function(question) {
				return (
					<div className="question-pane edit-question" key={question.serial_no} id={`question-${question.serial_no}`}>
						<div className="question" style={(question.answer.title === "") ? { marginBottom: '0px' } : {}}>
							<div className="number" style={(question.answer.title === "") ? { visibility: 'hidden' } : {}}>{ question.serial_no }</div>
							<div className="details">
								<div className="action-pane">
									<div className="title sparse">QUESTION</div>
									<div className="actions">
										<Link to="1/edit"> Linked to Question { question.linked_to.toString() }</Link>
									</div>
								</div>
								<div className="question-box">
								{ question.question }
								</div>
							</div>
						</div>
						<div className="option-heading" style={(question.answer.title === "") ? { display: 'none' } : {}}>
							<ul className="grid grid-2"><li className="sparse">ANSWERS</li><li className="sparse"></li></ul>
						</div>
						<div className="options" style={(question.answer.title === "") ? { display: 'none' } : {}}>
							<div className="tab"></div>
							<div className="option-pane">
								<ul className="grid grid-2">
									<li>
										<div className={`answer-box ${(question.answer.title === "A") ? 'active' : 'nope' }`}>
											<div className="answer-title"><div className="number bordered">A</div>{question.option_a.title} </div>
											{ question.option_a.description }
										</div>
									</li>
									<li>
										<div className={`answer-box ${(question.answer.title === "B") ? 'active' : 'nope' }`}>
											<div className="answer-title"><div className="number bordered">B</div>{ question.option_b.title } </div>
											{ question.option_b.description }
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="options" style={(question.answer.title === "") ? { display: 'none' } : {}}>
							<div className="tab"></div>
							<div className="option-pane">
								<ul className="grid grid-2">
									<li>
										<div className={`answer-box ${(question.answer.title === "C") ? 'active' : '' }`}>
											<div className="answer-title"><div className="number bordered">C</div>{ question.option_c.title } </div>
											{ question.option_c.description }
										</div>
									</li>
									<li>
										<div className={`answer-box ${(question.answer.title === "D") ? 'active' : '' }`}>
											<div className="answer-title"><div className="number bordered">D</div>{ question.option_d.title } </div>
											{ question.option_d.description }
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				);
			})
			return(<div className="main-section">
				<section className="test-questions">
					<span className="back-arrow" onClick={() => window.history.go(-1) }>
					  	<i className="ic-back" />
					</span>
					<h1 className="heading">{ this.state.course.title }</h1>
					<div className="top-action">
						<select><option value="">Year: { this.state.test.year }</option></select>
						<button className="btn-primary alt sparse" onClick={() => { this.setState({gotoEdit: true})}}>Edit</button>
					</div>
					{ (mappedQuestions.length > 0 ) ? mappedQuestions : <div className="empty">No question to display</div> }

				</section>
			</div>
			);
		}
	}
	componentDidMount() {
		this.fetchQuestions();
	}
	componentWillUnmount() {
		store.dispatch({ type: 'HIDE_QUESTION_NAV', payload: 0 });
	}
}

export default class Test extends Component {
	state = { gotoEdit: false, goHome: false, loadComplete: false, test: undefined, course: undefined, showModal: false, linkQuestion: undefined, showHint: false }
	values = {}
	textAreaChange(q, e) {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
		if(q.split("-")[0] === "question") { 
			this.values[q.split("-")[1]]["question"] = e.target.value; 
		}
		if(q.split("-")[0] === "option_a") { 
			this.values[q.split("-")[1]]["option_a"]["title"] = e.target.value;
		}
		if(q.split("-")[0] === "option_a(desc)") { 
			this.values[q.split("-")[1]]["option_a"]["description"] = e.target.value;
		}
		if(q.split("-")[0] === "option_b") { 
			this.values[q.split("-")[1]]["option_b"]["title"] = e.target.value;
		}
		if(q.split("-")[0] === "option_b(desc)") { 
			this.values[q.split("-")[1]]["option_b"]["description"] = e.target.value;
		}
		if(q.split("-")[0] === "option_c") { 
			this.values[q.split("-")[1]]["option_c"]["title"] = e.target.value;
		}
		if(q.split("-")[0] === "option_c(desc)") { 
			this.values[q.split("-")[1]]["option_c"]["description"] = e.target.value;
		}
		if(q.split("-")[0] === "option_d") { 
			this.values[q.split("-")[1]]["option_d"]["title"] = e.target.value;
		}
		if(q.split("-")[0] === "option_d(desc)") { 
			this.values[q.split("-")[1]]["option_d"]["description"] = e.target.value;
		}
	}
	fetchQuestions() {
		let id = this.props.match.params.test_id;
		let course_id = this.props.match.params.course_id;
		let tests = store.getState().state["course_tests_"+course_id]; 
		let courses = store.getState().state.courses;
		if(tests !== undefined && courses !== undefined) {
			for ( var i = 0; i<courses.length; i++ ) {
				if(courses[i].id === course_id) { this.setState({ course: courses[i]}); }
			}
			for (var j = 0; j<tests.length; j++) {
				if(tests[j].id === id) { 
					this.setState({test: tests[j]}); 
					for(var k = 0; k<tests[j].questions.length; k++) {
						this.values[tests[j].questions[k].id] = tests[j].questions[k];
					}
				}
			}
			
			var self = this;
			setTimeout(function(){
				if(self.state.test !== undefined) {
					var qs = self.state.test.questions;
					var count = 0;
					for(var q = 0; q<qs.length; q++) {
						if(qs[q].answer.title !== "") count++;
					}
					store.dispatch({ type: 'SHOW_QUESTION_NAV', payload: count });
					self.setState({ loadComplete: true });
				}else { self.setState({goHome: true}); }
				let textareas = document.getElementsByTagName("textarea");
				for(var i=0;i<textareas.length;i++) { textareas[i].style.height = textareas[i].scrollHeight+"px"; }
			}, 1000);
			
		}else { this.setState({goHome: true}); }
		console.log(this.values);
	}
	saveQuestion(id) {
		var question = this.values[id];
		console.log("Working...");
		document.getElementById("overlay-"+question.id).style = "display: block;";
		if(question !== undefined) {
			var param = {
				quiz_id: question.quiz_id, serial_no: question.serial_no, 
				question: question.question, option_a : question.option_a, option_b : question.option_b,
				option_c: question.option_c, option_d: question.option_d, answer: question.answer, linked_to: question.linked_to 
			}
			fetch(store.getState().state.api.dev+"questions/"+id, {
				method: 'PUT',
				headers: { 'Authorization' : 'Bearer '+store.getState().state.token, 'content-type': 'application/json' },
				body: JSON.stringify(param)
			}).then(res => res.json()).then(res => {
				document.getElementById("overlay-"+res.data.id).style = "display: none;";
				this.values[id] = res.data;
				this.updateStore(id);
			}).catch(err => console.log(err));
		}
	}
	linkedQuestion(id) {
		let question = this.values[id];
		this.setState({ linkQuestion: question, showModal: true });
		setTimeout(function() {
			console.log(JSON.stringify(question));
			for(var i=0;i<question.linked_to.length;i++) {
				var label = document.getElementById("link-option-"+question.linked_to[i]);
				label.getElementsByTagName("input")[0].setAttribute('checked', 'checked');
			}
			var linkLabel = document.getElementById("link-option-"+question.serial_no);
			if(linkLabel){ linkLabel.style = "opacity:0.5" };
			if(linkLabel){ linkLabel.getElementsByTagName("input")[0].setAttribute('disabled', 'disabled') };
		}, 1000);
	}
	deleteQuestion(id) {
		document.getElementById("overlay-"+id).style = "display: block;";
		if(window.confirm("Are you sure you want to delete this question?\nYou cannot undo this action")) {
			fetch(store.getState().state.api.dev+"questions/"+id, {
				method: 'DELETE',
				headers: { 'Authorization' : 'Bearer '+store.getState().state.token }
			});
			document.getElementById("overlay-"+id).style = "display: none;";
			document.getElementById("question-"+id).style = "display: none;";
		}else { document.getElementById("overlay-"+id).style = "display: none;"; }
	}
	chooseLink(id) {
		let question = this.values[id];
		this.values[this.state.linkQuestion.id].linked_to.push(question.serial_no.toString());
	}
	setAnswer(value, id) {
		this.values[id].answer.title = value;
		// var question = this.state.test.questions.where({id: id});
		this.setState({ test: this.state.test });
	}
	updateStore(id) {
		let test_id = this.props.match.params.test_id;
		let course_id = this.props.match.params.course_id;
		let tests = store.getState().state["course_tests_"+course_id]; 
		for (var j = 0; j<tests.length; j++) {
			if(tests[j].id === test_id) { 
				for(var k = 0; k<tests[j].questions.length; k++) {
					if(tests[j].questions[k].id === undefined) {
						tests[j].questions[k] = this.values[id];
						store.dispatch({ type: "SAVE_COURSE_TESTS_"+course_id, payload: tests});
					}else {  }
				}
			}
		}
	}
	render() {
		let course_id = this.props.match.params.course_id;
		if(this.state.gotoEdit){ return (<Redirect to={`${this.props.match.url}/edit`} />); }
		if(this.state.goHome) { return (<Redirect to={`/dashboard/create-test/${course_id}`} />); }
		if(this.state.loadComplete === false) {
			return (
				<div className="main-section">
					<div className="load-pane">
						<i className="ic-spinner animate-spin"></i>
					</div>
				</div>
			);
		}else {
			var self = this;
			const mappedLinkOptions = this.state.test.questions.map(function(question) {
				return (question.answer.title!=="") ? (<label id={`link-option-${question.serial_no}`} key={question.serial_no} className="link-inputs" onClick={(e) =>{ self.chooseLink(question.id)}}><input type="checkbox" /> { question.serial_no }</label>) : "" ;
			})
			const mappedQuestions = this.state.test.questions.map(function(question) {
				// const mappedAnswerOptions = ["A", "B", "C", "D"].map(function(option) {
				// 	if(option === question.answer.title) return (<option value={option} selected>{option}</option>);
				// 	return (<option value={option}>{option}</option>);
				// })
				return (
					<div key={question.id} id={`question-${question.id}`}>
						<div className="question-pane">
							<div className="question-overlay" id={`overlay-${question.id}`}><i className="ic-spinner animate-spin"></i></div>
							<div className="question">
								<div className="number" style={(question.answer.title === "") ? { visibility: 'hidden' } : {}}>{question.serial_no}</div>
								<div className="details">
									<div className="action-pane">
										<div className="title sparse">QUESTION</div>
										<div className="actions">
											<button className="small" onClick={() => self.linkedQuestion(question.id)}><i className="ic-plus"></i> Link to Another Question</button>
											<span className="info-btn" onClick={(e) => {var s = e.target.parentNode.getElementsByTagName("div")[0]; if(s !== undefined) { (s.style.display === 'block') ? s.style.display = 'none' : s.style.display ='block'; }} }> i <div className="dropmenu hint">Linking a question enables you set multiple follow-up questions. This will appear in the format - "Use this question to answer Question 1, 2 & 3"</div></span>
											<span className="delete-btn" onClick={() => self.deleteQuestion(question.id)}><i className="ic-trash"></i></span>
										</div>
									</div>
									<div className="edit-question-box">
										<textarea onChange={(e) => self.textAreaChange("question-"+question.id, e)} defaultValue={question.question} />
									</div>
									{ (question.answer.title === "") ? <div align="center" className="answer-pane" onClick={ () => self.saveQuestion(question.id) }><button className="sparse">SAVE</button></div> : '' }
								</div>
							</div>
							<div className="option-heading" style={(question.answer.title === "") ? { display: 'none' } : {}}>
								<ul className="grid grid-2"><li className="sparse">OPTIONS</li><li className="sparse">MORE INFO</li></ul>
							</div>
							<div className="options" style={(question.answer.title === '') ? { display: 'none' } : {} }>
								{ (question.answer.title === "A") ? <div className="number">A</div> : <div className="number bordered">A</div> }
								<div className="option-pane">
									<ul className="grid grid-2">
										<li><div className="option-box"><textarea onChange={(e) => self.textAreaChange("option_a-"+question.id, e)} defaultValue={question.option_a.title} /></div></li>
										<li><div className="info-box"><textarea onChange={(e) => self.textAreaChange("option_a(desc)-"+question.id, e)} defaultValue={question.option_a.description} /></div></li>
									</ul>
								</div>
							</div>
							<div className="options" style={(question.answer.title === "") ? { display: 'none' } : {}}>
								{ (question.answer.title === "B") ? <div className="number">B</div> : <div className="number bordered">B</div> }
								<div className="option-pane">
									<ul className="grid grid-2">
										<li><div className="option-box"><textarea onChange={(e) => self.textAreaChange("option_b-"+question.id, e)} defaultValue={question.option_b.title} /></div></li>
										<li><div className="info-box"><textarea onChange={(e) => self.textAreaChange("option_b(desc)-"+question.id, e)} defaultValue={question.option_b.description} /></div></li>
									</ul>
								</div>
							</div>
							<div className="options" style={(question.answer.title === "") ? { display: 'none' } : {}}>
								{ (question.answer.title === "C") ? <div className="number">C</div> : <div className="number bordered">C</div> }
								<div className="option-pane">
									<ul className="grid grid-2">
										<li><div className="option-box"><textarea onChange={(e) => self.textAreaChange("option_c-"+question.id, e)} defaultValue={question.option_c.title} /></div></li>
										<li><div className="info-box"><textarea onChange={(e) => self.textAreaChange("option_c(desc)-"+question.id, e)} defaultValue={question.option_c.description} /></div></li>
									</ul>
								</div>
							</div>
							<div className="options" style={(question.answer.title === "") ? { display: 'none' } : {}}>
								{ (question.answer.title === "D") ? <div className="number">D</div> : <div className="number bordered">D</div> }
								<div className="option-pane">
									<ul className="grid grid-2">
										<li><div className="option-box"><textarea onChange={(e) => self.textAreaChange("option_d-"+question.id, e)} defaultValue={question.option_d.title} /></div></li>
										<li><div className="info-box"><textarea onChange={(e) => self.textAreaChange("option_d(desc)-"+question.id, e)} defaultValue={question.option_d.description} /></div></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="answer-pane" style={(question.answer.title === "") ? { display: 'none' } : {}}>
							<div className="title">Set an Option</div>
							{/*<select>{ mappedAnswerOptions }</select>*/}
							<Select classNames="" name={'filter'+question.id} onChange={(v) => { self.setAnswer(v, question.id)}} options={[
								{ title: "A", value: "A" },
								{ title: "B", value: "B" },
								{ title: "C", value: "C" },
								{ title: "D", value: "D" }
							]} selected={question.answer.title}/>
							<button className="sparse" onClick={() => self.saveQuestion(question.id) }>save</button>
						</div>
					</div>
				);
			})
			return(
				<div className="main-section">
					<section className="test-questions test-edit">
						<span className="back-arrow" onClick={() => window.history.go(-1) }>
						  	<i className="ic-back" />
						</span>
						<h1 className="heading">{this.state.course.title}</h1>
						<div className="top-action">
							<select><option value="">Year: {this.state.test.year}</option></select>
						</div>
						
						{ mappedQuestions }

						<Modal visible={this.state.showModal} closeModal={() => this.setState({showModal: false})}>
							<div className="linked-modal">
								<div className="question">
									<div className="number">{ (this.state.linkQuestion !== undefined) ? this.state.linkQuestion.serial_no : ''}</div>
									<div className="details">
										<div className="action-pane">
											<div className="title sparse">QUESTION</div>
										</div>
										<div>
											<p>{ (this.state.linkQuestion !== undefined) ? this.state.linkQuestion.question : "" }</p>
										</div>
										<div className="link-options">
											<h4>Use this to answer questions</h4>
											{ mappedLinkOptions }
										</div>
									</div>
								</div>
							</div>
						</Modal>
					</section>
				</div>
			);
		}
	}
	componentDidMount() {
		store.dispatch({ type: 'SHOW_QUESTION_NAV', payload: 10 });
		this.fetchQuestions();
	}
	componentWillUnmount() {
		store.dispatch({ type: 'HIDE_QUESTION_NAV', payload: 0 });
	}
}