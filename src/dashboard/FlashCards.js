import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from '../components/Modal';
// import Select from '../components/Select';
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
	state = { loadComplete: false };
	loadCourses() {
		fetch(store.getState().state.api.dev+"courses", {
			method: 'GET',
			headers: { 'Authorization' : 'Bearer '+store.getState().state.token }
		}).then(res => res.json()).then(res => {
			console.log(res);
			if(res.data) {
				store.dispatch({type: 'SAVE_COURSES', payload: res.data });
				this.setState({ loadComplete: true });
			}else {
				console.error("Unable to load courses ", res);
			}
		});
	}
	render() {
  		if(this.state.loadComplete===false) {
  			return (
  				<div className="main-section">
					<div className="load-pane">
						<i className="ic-spinner animate-spin"></i>
					</div>
				</div>
  			);
  		}else {
			var c = -1;
			let mappedLinks = store.getState().state.courses.map(function(course) {
				c++;
				let icons = ["ic-handcuffs", "ic-book", "ic-olive", "ic-group", "ic-university", "ic-justice", "ic-flower", "ic-group-2", "ic-badge"]
				return (<li key={course.id}><Link to={`/dashboard/flashcards/${course.id}`}><div className="ball"><i className={icons[c]}></i></div><h2 className="title">{ course.title }</h2></Link></li>);
			})
			return (
				<section className="flashcards">
					<div className="card-holder">
						<ul className="grid grid-3">
							<li>
								<div className="card">
									<i className="ic-cards-3"></i>
									<div className="content">
										<h2>200</h2>
										<p>Purcharsed Flashcards</p>
									</div>
								</div>
							</li>
							<li>
								<div className="card">
									<i className="ic-flipcards"></i>
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
			        		{ mappedLinks }
			        	</ul>
		    		</div>
		    	</section>
			);
		}
	}
	componentDidMount() {
		if(store.getState().state.courses === undefined) {
  			this.loadCourses();
  		}else { this.setState({ loadComplete: true })}
	}
}

class CreateFlashCards extends Component {
	state = { loadComplete: false, goHome: false, showUploadModal: false, uploading: false, file: undefined,
		course: { title: "Criminal Law"}, uploadError: undefined,
		questions: ["h"],
		uploadTitle: '', uploadDescription: '', uploadCost: ''
	}
	textAreaChange(e) {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
	}
	handleUpload(e) {
		e.preventDefault();
		if(this.state.file === undefined) { this.setUploadError("Please choose a file"); return; }
		if(this.state.uploadTitle === '') { this.setUploadError("Enter the bundle title"); return; }
		if(this.state.uploadDescription === '') { this.setUploadError("Enter the bundle description"); return; }
		this.setState({uploading: true});
		let formData = new FormData();
		formData.append('file', this.state.file);
		formData.append('course_id', this.state.course.id);
		formData.append('year', this.state.year);
		fetch(store.getState().state.api.dev+"quizs/upload", {
			method: 'POST',
			headers: { 'Authorization' : 'Bearer '+store.getState().state.token },
			body: formData
		}).then(res => res.json()).then(res => {
			if(res.data) { 
				this.setState({uploading: false, showUploadModal: false, loadComplete: false });
				this.getCourse();
			}else {
				this.setState({uploading: false });
				this.setUploadError(res.message);
			}
		});
	}
	setFile(e) {
		e.preventDefault();
		var files = (e.dataTransfer) ? e.dataTransfer.files : e.target.files;
	    this.setState({file: files[0]});
	}
	setUploadError(error) {
		this.setState({ uploadError: error})
		setTimeout(()=>{ this.setState({uploadError: undefined}); }, 4000);
	}
	render() {
		if(this.state.loadComplete === false) {
			return (
				<div className="main-section">
					<div className="load-pane">
						<i className="ic-spinner animate-spin"></i>
					</div>
				</div>
			);
		}else {
			const yearOptions =  [{title: "Select year", value: "" }]
			"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20".split(",").forEach(function(num) {
				yearOptions.push({title: 2000+parseInt(num,10), value: 2000+parseInt(num,10)}); return;
			});
			const renderedQuestions = this.state.questions.map(function(question) {
				return (
					<div className="question-pane edit-question" key={question}>
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
						  	<i className="ic-back" />
						</span>
						<h1 className="heading">{ this.state.course.title } Flashcards</h1>
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
							<h3>Create a New Flashcard</h3>
							<div className="question-pane edit-question">
								<div className="question">
									<div className="number bordered">1</div>
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
												<div className="info-box">
													<textarea onChange={(e) => this.textAreaChange(e) } defaultValue="Some description you are"></textarea>
												</div>
											</li>
											<li>
												<div className="info-box">
													<div className="title">A. Shareholder interploader</div>
													<textarea onChange={(e) => this.textAreaChange(e) } defaultValue="Some description you are"></textarea>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<button className="alt">Create a new Flashcard</button>
						</div>
					</div>
					<Modal visible={this.state.showUploadModal} closeModal={() => this.setState({showUploadModal: false})}>
						<div className="excel-upload">
							<h4 className="sparse mid-sparse" style={(this.state.uploadError !== undefined) ? { color: "#c00" } : {} }>{ (this.state.uploadError !== undefined) ? this.state.uploadError : (this.state.uploading) ? <i className="ic-spinner animate-spin"></i> : "UPLOAD A FLASHCARD" }</h4><br/>
							<p>Fill the form and upload .xls file to continue</p>
							<form onSubmit={(e) => this.handleUpload(e) }>
								<div className="input-wrapper">
									<label>Enter Title</label>
									<div className="wrapp"><input type="text" onChange={(e) => this.setState({ uploadTitle: e.target.value })} placeholder="Enter the title of the flashcard bundle" /></div> 
								</div>
								<div className="input-wrapper">
									<label>Enter Description</label>
									<div className="wrapp"><input type="text" onChange={(e) => this.setState({ uploadDescription: e.target.value })} placeholder="Enter the descript of the flashcard bundle" /></div> 
								</div>
								<div className="input-wrapper">
									<label>Upload Flashcard file from computer</label>
									<div className="wrapp">
										<input type="file" className="upload-file" onChange={(e) => this.setFile(e) } accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" />
										<span className="placeholder">{ (this.state.file) ? this.state.file.name : "Select Flashcard .xls file" }</span>
										<div className="button" onClick={(e) => { e.target.parentNode.$(".upload-file").click(); e.preventDefault(); }}>SELECT FILE</div>
									</div> 
								</div>
								<div className="input-wrapper">
									<label>Enter Cost</label>
									<div className="wrapp"><input type="text" onChange={(e) => this.setState({ uploadCost: e.target.value })} placeholder="Enter Cost" /></div> 
								</div>
								<button className="alt">Upload</button>
							</form>
							
						</div>
					</Modal>
				</section>
			);
		}
	}
	componentDidMount() {
		fetch(store.getState().state.api.dev+"flashcards", {
			method: 'GET',
			headers: { 'Authorization' : 'Bearer '+store.getState().state.token }
		}).then(res => res.json()).then(res => {
			console.log(res);
		});
		if(store.getState().state.courses !== undefined) {
			let course_id = this.props.match.params.course_id;
			let course = store.getState().state.courses.where({id: course_id})
			if(course !== undefined) this.setState({ course: course, loadComplete: true});
			setTimeout(() => { 
				let textareas = document.getElementsByTagName("textarea");
				for(var i=0;i<textareas.length;i++) { textareas[i].style.height = textareas[i].scrollHeight+"px"; }
			}, 500);
		}else { this.setState({ goHome: true }); }
	}
}




