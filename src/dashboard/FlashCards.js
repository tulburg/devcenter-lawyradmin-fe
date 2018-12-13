import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import Modal from "../components/Modal";
import Select from "../components/Select";
import store from "../store";

export default class FlashCards extends Component {
	render() {
		return (
			<div className="main-section">
				<Route
					exact
					path={`${this.props.match.url}/`}
					component={FlashCardsIndex}
				/>
				<Route
					exact
					path={`${this.props.match.url}/:course_id`}
					component={CourseFlashCards}
				/>
				<Route
					exact
					path={`${this.props.match.url}/:course_id/:flashcard_id`}
					component={CreateFlashCards}
				/>
				<Route
					path={`${
						this.props.match.url
					}/:course_id/:flashcard_id/edit`}
					component={EditFlashCards}
				/>
			</div>
		);
	}
}

class FlashCardsIndex extends Component {
	state = { loadComplete: false, metrics: undefined };
	loadCourses() {
		fetch(store.getState().state.api.dev + "courses", {
			method: "GET",
			headers: { Authorization: "Bearer " + store.getState().state.token }
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if (res.data) {
					store.dispatch({ type: "SAVE_COURSES", payload: res.data });
					this.setState({ loadComplete: true });
				} else {
					console.error("Unable to load courses ", res);
				}
			});
	}
	fetchMetrics() {
		let param = [
			"total_signed_up_users",
			"total_active_users",
			"total_paid_users",
			"total_unpaid_users",
			"total_ongoing_tests",
			"total_purchased_flashcards",
			"total_custom_flashcards",
			"total_revenue",
			"total_revenue_on_flashcards",
			"total_revenue_on_subscriptions",
			"most_answered_quiz",
			"least_answered_quiz"
		];
		fetch(
			store.getState().state.api.dev +
				"admin/metrics?fields[]=" +
				param.join("&fields[]="),
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + store.getState().state.token,
					"content-type": "application/json"
				}
			}
		)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				store.dispatch({ type: "SAVE_METRICS", payload: res.data });
			})
			.catch(err => {
				console.log(err.message);
			});
	}
	render() {
		if (this.state.loadComplete === false) {
			return (
				<div className="main-section">
					<div className="load-pane">
						<i className="ic-spinner animate-spin" />
					</div>
				</div>
			);
		} else {
			var c = -1;
			let mappedLinks = store
				.getState()
				.state.courses.map(function(course) {
					c++;
					let icons = [
						"ic-handcuffs",
						"ic-book",
						"ic-olive",
						"ic-group",
						"ic-university",
						"ic-justice",
						"ic-flower",
						"ic-group-2",
						"ic-badge"
					];
					return (
						<li key={course.id}>
							<Link to={`/dashboard/flashcards/${course.id}`}>
								<div className="ball">
									<i className={icons[c]} />
								</div>
								<h2 className="title">{course.title}</h2>
							</Link>
						</li>
					);
				});
			return (
				<section className="flashcards">
					{/* <div className="card-holder">
						<ul className="grid grid-3">
							<li>
								<div className="card">
									<i className="ic-cards-3" />
									<div className="content">
										<h2>
											{this.state.metrics !== undefined
												? this.state.metrics.total_purchased_flashcards.toLocaleString()
												: 0}
										</h2>
										<p>Purchased Flashcards</p>
									</div>
								</div>
							</li>
							<li>
								<div className="card">
									<i className="ic-flipcards" />
									<div className="content">
										<h2>
											{this.state.metrics !== undefined
												? this.state.metrics.total_custom_flashcards.toLocaleString()
												: 0}
										</h2>
										<p>Custom Flashcards Created</p>
									</div>
								</div>
							</li>
							<li />
						</ul>
					</div> */}

					<div className="courses">
						<h2 className="main-section__header">
							Create/Edit Flashcard
						</h2>
						<p className="main-section__sub-header">
							Choose a Course
						</p>

						<ul className="grid grid-5">{mappedLinks}</ul>
					</div>
				</section>
			);
		}
	}
	componentDidMount() {
		if (store.getState().state.courses === undefined) {
			this.loadCourses();
		} else {
			this.setState({ loadComplete: true });
		}
		if (!store.getState().state.metrics) {
			this.fetchMetrics();
		} else {
			this.setState({ metrics: store.getState().state.metrics });
		}
	}
}

class CourseFlashCards extends Component {
	state = {
		showUploadModal: false,
		course: null,
		loadComplete: false,
		file: null,
		year: undefined,
		flashcards: [],
		uploading: false,
		uploadError: undefined,
		gotoView: false,
		flashcard_id: undefined
	};

	sortBy(type) {
		let tests = this.state.flashcards;
		if (type === "cost") {
			tests.sort(function(a, b) {
				return a.cost > b.cost ? 1 : b.cost > a.cost ? -1 : 0;
			});
		} else if (type === "date") {
			tests.sort(function(a, b) {
				let c = new Date(a.created_at.replace(" ", "T")),
					d = new Date(b.created_at.replace(" ", "T"));
				return c > d ? 1 : d > c ? -1 : 0;
			});
		}
		this.setState({ tests: tests });
	}
	getFlashcards(complete) {
		let course_id = this.props.match.params.course_id;
		fetch(
			store.getState().state.api.dev +
				"courses/" +
				course_id +
				"/flashcards/default",
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + store.getState().state.token
				}
			}
		)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				res.data.sort((a, b) => {
					return a.serial_no > b.serial_no;
				});
				this.setState({ loadComplete: true, flashcards: res.data });
				store.dispatch({
					type: "SAVE_COURSE_FLASHCARD_" + course_id,
					payload: res.data
				});
				if (complete) {
					complete();
				}
			})
			.catch(err => console.log(err));
	}
	deleteFlashcard(id) {
		if (window.confirm("Are you sure you want to delete this flashcard?")) {
			fetch(store.getState().state.api.dev + "quizs/" + id, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + store.getState().state.token
				}
			})
				.then(res => res.json())
				.then(res => {
					window.$("#" + id + "-card").style.display = "none";
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
	simpleDate(value) {
		let date = value.split(" ")[0];
		let year = date.split("-")[0],
			month = date.split("-")[1],
			day = date.split("-")[2];
		let all_month = [
			"JAN",
			"FEB",
			"MAR",
			"APR",
			"MAY",
			"JUN",
			"JUL",
			"AUG",
			"SEPT",
			"OCT",
			"NOV",
			"DEC"
		];
		return day + "-" + all_month[parseInt(month, 10)] + "-" + year;
	}
	handleUpload(e) {
		e.preventDefault();
		if (this.state.file === undefined) {
			this.setUploadError("Please choose a file");
			return;
		}
		if (this.state.uploadTitle === "") {
			this.setUploadError("Enter the bundle title");
			return;
		}
		if (this.state.uploadDescription === "") {
			this.setUploadError("Enter the bundle description");
			return;
		}
		this.setState({ uploading: true });
		let formData = new FormData();
		formData.append("file", this.state.file);
		formData.append("course_id", this.state.course.id);
		formData.append("title", this.state.uploadTitle);
		formData.append("description", this.state.uploadDescription);
		formData.append("cost", this.state.uploadCost);
		fetch(store.getState().state.api.dev + "flashcards/upload", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + store.getState().state.token
			},
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				var self = this;
				if (res.data) {
					console.log(res.data);
					this.setState({
						uploading: false,
						showUploadModal: false,
						loadComplete: false
					});
					this.getFlashcards(() => {
						self.setState({
							flashcard_id: res.data.id,
							gotoView: true
						});
					});
				} else {
					this.setState({ uploading: false });
					// this.setUploadError(res.message);
				}
			});
	}
	setFile(e) {
		e.preventDefault();
		var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		this.setState({ file: files[0] });
	}
	render() {
		if (this.state.course === null) {
			console.log("Unable to find this course");
		}
		if (this.state.gotoView) {
			return (
				<Redirect
					to={`${this.props.match.url}/${this.state.flashcard_id}`}
				/>
			);
		}
		if (this.state.loadComplete === false) {
			return (
				<div className="main-section">
					<div className="load-pane">
						<i className="ic-spinner animate-spin" />
					</div>
				</div>
			);
		} else {
			let id = this.props.match.params.course_id;
			var self = this;
			const renderedTests = this.state.flashcards.map(function(
				flashcard
			) {
				return (
					<ul
						className="grid grid-6"
						key={flashcard.id}
						id={`${flashcard.id}-card`}
					>
						<li>
							<Link
								to={`/dashboard/flashcards/${id}/${
									flashcard.id
								}`}
								className="no-decoration"
							>
								{flashcard.title}
							</Link>
						</li>
						<li>{flashcard.description}</li>
						<li>{self.simpleDate(flashcard.created_at)}</li>
						<li>{self.simpleDate(flashcard.updated_at)}</li>
						<li>
							<b>{flashcard.currency + " " + flashcard.cost}</b>
						</li>
						<li>
							<i
								className="ic-trash"
								onClick={() => {
									self.deleteFlashcard(flashcard.id);
								}}
							/>
						</li>
					</ul>
				);
			});
			return (
				<div>
					<section className="create-test">
						<span
							className="back-arrow"
							onClick={() => window.history.go(-1)}
						>
							<i className="ic-back" />
						</span>
						<h1 className="heading">{this.state.course.title}</h1>
						<ul className="grid grid-2">
							<li>
								<a
									href=""
									className="no-decoration"
									onClick={e => {
										e.preventDefault();
										this.setState({
											showUploadModal: true
										});
									}}
								>
									<div className="top-action">
										<div className="title">
											Create a New Flashcard
										</div>
										<div className="subtitle">
											UPLOAD EXCEL (.xls) FILE
										</div>
									</div>
								</a>
							</li>
							<li>
								<div className="right-action">
									{/* <span className="light">
										{" "}
										Displaying 7 of 7 Flashcards
									</span> */}
									<div>
										<div className="title">Sort by:</div>
										<Select
											classNames=""
											name="filter"
											onChange={v => {
												this.sortBy(v);
											}}
											options={[
												{
													title: "Date Created",
													value: "date"
												},
												{ title: "Cost", value: "cost" }
											]}
										/>
									</div>
								</div>
							</li>
						</ul>
						<br />
						<br />
						<div>Click a Flashcard to View & Edit</div>
						<br />
						<div className="table test-list">
							<ul className="grid grid-6 thead">
								<li>TITLE</li>
								<li>DESCRIPTION</li>
								<li>CREATED</li>
								<li>EDITED</li>
								<li>COST</li>
								<li>DELETE</li>
							</ul>
							<div className="tbody">{renderedTests}</div>
						</div>
					</section>

					<Modal
						visible={this.state.showUploadModal}
						closeModal={() =>
							this.setState({ showUploadModal: false })
						}
					>
						<div className="excel-upload">
							<h4
								className="sparse mid-sparse"
								style={
									this.state.uploadError !== undefined
										? { color: "#c00" }
										: {}
								}
							>
								{this.state.uploadError !== undefined ? (
									this.state.uploadError
								) : this.state.uploading ? (
									<i className="ic-spinner animate-spin" />
								) : (
									"UPLOAD A FLASHCARD"
								)}
							</h4>
							<br />
							<p>
								Fill the form and upload .xls file to continue
							</p>
							<form onSubmit={e => this.handleUpload(e)}>
								<div className="input-wrapper">
									<label>Enter Title</label>
									<div className="wrapp">
										<input
											type="text"
											onChange={e =>
												this.setState({
													uploadTitle: e.target.value
												})
											}
											placeholder="Enter the title of the flashcard bundle"
										/>
									</div>
								</div>
								<div className="input-wrapper">
									<label>Enter Description</label>
									<div className="wrapp">
										<input
											type="text"
											onChange={e =>
												this.setState({
													uploadDescription:
														e.target.value
												})
											}
											placeholder="Enter the descript of the flashcard bundle"
										/>
									</div>
								</div>
								<div className="input-wrapper">
									<label>
										Upload Flashcard file from computer
									</label>
									<div className="wrapp">
										<input
											type="file"
											className="upload-file"
											onChange={e => this.setFile(e)}
											accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
										/>
										<span className="placeholder">
											{this.state.file
												? this.state.file.name
												: "Select Flashcard .xls file"}
										</span>
										<div
											className="button"
											onClick={e => {
												e.target.parentNode
													.$(".upload-file")
													.click();
												e.preventDefault();
											}}
										>
											SELECT FILE
										</div>
									</div>
								</div>
								<div className="input-wrapper">
									<label>Enter Cost</label>
									<div className="wrapp">
										<input
											type="text"
											onChange={e =>
												this.setState({
													uploadCost: e.target.value
												})
											}
											placeholder="Enter Cost"
										/>
									</div>
								</div>
								<button className="alt">Upload</button>
							</form>
						</div>
					</Modal>
				</div>
			);
		}
	}
	componentWillMount() {
		let courseId = this.props.match.params.course_id;
		let courses = store.getState().state.courses;
		for (var i = 0; i < courses.length; i++) {
			if (courses[i].id === courseId) {
				this.setState({ course: courses[i] });
			}
		}
	}

	componentDidMount() {
		let id = this.props.match.params.course_id;
		if (store.getState().state["course_flashcard_" + id] === undefined) {
			this.getFlashcards();
		} else {
			this.setState({
				loadComplete: true,
				flashcards: store.getState().state["course_flashcard_" + id]
			});
		}
	}
}

class CreateFlashCards extends Component {
	state = {
		loadComplete: false,
		goHome: false,
		course: { title: "Criminal Law" },
		questions: ["h"],
		flashcard: undefined,
		question: "",
		answer: ""
	};
	textAreaChange(e, type) {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
		if (type === "question") this.setState({ question: e.target.value });
		if (type === "answer") this.setState({ answer: e.target.value });
	}
	getCards() {
		let course_id = this.props.match.params.course_id;
		let flashcard_id = this.props.match.params.flashcard_id;
		let courseFlashcards = store.getState().state[
			"course_flashcard_" + course_id
		];
		let flashcard = courseFlashcards.where({ id: flashcard_id });
		flashcard.cards.sort((a, b) => {
			return a.serial_no > b.serial_no;
		});
		this.setState({ flashcard: flashcard, loadComplete: true });
	}
	createCard(serial_no) {
		this.setState({ loadComplete: false });
		let flashcard_id = this.props.match.params.flashcard_id;
		let course_id = this.props.match.params.course_id;
		let courseFlashcards = store.getState().state[
			"course_flashcard_" + course_id
		];
		let param = JSON.stringify({
			flashcard_id: flashcard_id,
			serial_no: serial_no,
			question: this.state.question,
			answer: this.state.answer
		});
		fetch(store.getState().state.api.dev + "cards", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + store.getState().state.token,
				"content-type": "application/json"
			},
			body: param
		})
			.then(res => res.json())
			.then(res => {
				if (res.data) {
					courseFlashcards
						.where({ id: flashcard_id })
						.cards.push(res.data);
					store.dispatch({
						type: "SAVE_COURSE_FLASHCARD_" + course_id,
						payload: courseFlashcards
					});
					this.getCards();
					this.setState({ loadComplete: true });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		if (this.state.gotoEdit) {
			return <Redirect to={`${this.props.match.url}/edit`} />;
		}
		if (this.state.goHome) {
			return <Redirect to="/dashboard/flashcards" />;
		}
		if (this.state.loadComplete === false) {
			return (
				<div className="load-pane">
					<i className="ic-spinner animate-spin" />
				</div>
			);
		} else {
			var num = 0;
			const renderedCards = this.state.flashcard.cards.map(function(
				card
			) {
				num = card.serial_no;
				return (
					<div className="question-pane edit-question" key={card.id}>
						<div className="question">
							<div className="number">{card.serial_no}</div>
							<div className="details">
								<div className="option-heading">
									<ul className="grid grid-2">
										<li className="sparse">QUESTION</li>
										<li className="sparse">ANSWER</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="options">
							<div className="tab" />
							<div className="option-pane">
								<ul className="grid grid-2">
									<li>
										<div className="gray-box">
											{" "}
											{card.question}{" "}
										</div>
									</li>
									<li>
										<div className="gray-box">
											{card.answer}
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				);
			});
			return (
				<section className="flashcards">
					<div className="create-flashcard">
						<span
							className="back-arrow"
							onClick={() => window.history.go(-1)}
						>
							<i className="ic-back" />
						</span>
						<h1 className="heading">
							{this.state.flashcard.title} -{" "}
							{this.state.course.title}
						</h1>
						<div className="heading-action">
							<p> {this.state.flashcard.description}</p>
							<button
								className="btn-primary sparse"
								onClick={() => {
									this.setState({ gotoEdit: true });
								}}
							>
								Edit
							</button>
						</div>

						<div>{renderedCards}</div>

						<div className="create-box" align="center">
							<h3>Create a New Flashcard</h3>
							<div className="question-pane edit-question">
								<div className="question">
									<div className="number bordered">
										{num + 1}
									</div>
									<div className="details">
										<div className="option-heading">
											<ul className="grid grid-2">
												<li className="sparse">
													QUESTION
												</li>
												<li className="sparse">
													ANSWER
												</li>
											</ul>
										</div>
									</div>
								</div>

								<div className="options">
									<div className="tab" />
									<div className="option-pane">
										<ul className="grid grid-2">
											<li>
												<div className="info-box">
													<textarea
														onChange={e =>
															this.textAreaChange(
																e,
																"question"
															)
														}
														defaultValue=""
														placeholder="Enter question"
													/>
												</div>
											</li>
											<li>
												<div className="info-box">
													<textarea
														onChange={e =>
															this.textAreaChange(
																e,
																"answer"
															)
														}
														defaultValue=""
														placeholder="Enter answer"
													/>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<button
								className="alt"
								onClick={() => this.createCard(num + 1)}
							>
								Create a new Flashcard
							</button>
						</div>
					</div>
				</section>
			);
		}
	}
	componentWillMount() {
		let courseId = this.props.match.params.course_id;
		let courses = store.getState().state.courses;
		for (var i = 0; i < courses.length; i++) {
			if (courses[i].id === courseId) {
				this.setState({ course: courses[i] });
			}
		}
		this.$ = window.$;
	}
	componentDidMount() {
		this.getCards();
		setTimeout(() => {
			let textareas = document.getElementsByTagName("textarea");
			for (var i = 0; i < textareas.length; i++) {
				textareas[i].style.height = textareas[i].scrollHeight + "px";
			}
		}, 1000);
	}
}

class EditFlashCards extends Component {
	state = {
		loadComplete: false,
		course: undefined,
		values: [],
		flashcard: undefined,
		showModal: false,
		selectedCard: undefined
	};
	textAreaChange(e, id) {
		if (e.target.tagName.match("TEXTAREA")) {
			e.target.style.height = "auto";
			e.target.style.height = e.target.scrollHeight + "px";
		}
		let cardId = id.split("-")[1];
		let type = id.split("-")[0];
		if (type === "question") {
			this.state.values.where({ id: cardId }).question = e.target.value;
		}
		if (type === "answer") {
			this.state.values.where({ id: cardId }).answer = e.target.value;
		}
		if (type === "title") {
			let f = this.state.flashcard;
			f.title = e.target.value;
			this.setState({ flashcard: f });
		}
		if (type === "description") {
			let f = this.state.flashcard;
			f.description = e.target.value;
			this.setState({ flashcard: f });
		}
		if (type === "cost") {
			let f = this.state.flashcard;
			f.cost = e.target.value;
			this.setState({ flashcard: f });
		}
	}
	getCards() {
		let course_id = this.props.match.params.course_id;
		let flashcard_id = this.props.match.params.flashcard_id;
		let courseFlashcards = store.getState().state[
			"course_flashcard_" + course_id
		];
		let flashcard = courseFlashcards.where({ id: flashcard_id });
		flashcard.cards.sort((a, b) => {
			return a.serial_no > b.serial_no;
		});
		this.setState({
			flashcard: flashcard,
			loadComplete: true,
			values: flashcard.cards
		});
	}
	saveCard(id) {
		this.$("#overlay-" + id).style = "display: block";
		let card = this.state.flashcard.cards.where({ id: id });
		let param = JSON.stringify({
			serial_no: card.serial_no,
			question: card.question,
			answer: card.answer
		});
		fetch(store.getState().state.api.dev + "cards/" + id, {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + store.getState().state.token,
				"content-type": "application/json"
			},
			body: param
		})
			.then(res => res.json())
			.then(res => {
				this.$("#overlay-" + id).style = "display: none";
				console.log(res);
			});
	}
	deleteCard(id) {
		this.$("#overlay-" + id).style = "display: block";
		fetch(store.getState().state.api.dev + "cards/" + id, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + store.getState().state.token,
				"content-type": "application/json"
			}
		}).then(res => {
			this.$("#" + id).style = "display:none";
		});
	}
	saveFlashcard() {
		let id = this.state.flashcard.id;
		let course_id = this.props.match.params.course_id;
		this.$("#overlay-" + id).style = "display: block";
		let f = this.state.flashcard;
		let param = JSON.stringify({
			title: f.title,
			description: f.description,
			course_id: course_id,
			cost: f.cost
		});
		fetch(store.getState().state.api.dev + "flashcards/" + id, {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + store.getState().state.token,
				"content-type": "application/json"
			},
			body: param
		})
			.then(res => res.json())
			.then(res => {
				this.$("#overlay-" + id).style = "display: none";
				console.log(res);
			});
	}
	chooseOrder(serial_no) {
		this.setState({ showModal: false });
		let oldCard = this.state.flashcard.cards.where({
			serial_no: serial_no
		});
		let card = this.state.flashcard.cards.where({
			id: this.state.selectedCard.id
		});
		oldCard.serial_no = card.serial_no;
		card.serial_no = serial_no;
		this.saveCard(this.state.selectedCard.id);
		this.saveCard(oldCard.id);
		this.state.flashcard.cards.sort((a, b) => {
			return a.serial_no > b.serial_no;
		});
		this.setState({ flashcard: this.state.flashcard });
		let course_id = this.props.match.params.course_id;
		let flashcard_id = this.props.match.params.flashcard_id;
		let courseFlashcards = store.getState().state[
			"course_flashcard_" + course_id
		];
		courseFlashcards.replace({ id: flashcard_id }, this.state.flashcard);
		store.dispatch({
			type: "SAVE_COURSE_FLASHCARD_" + course_id,
			payload: courseFlashcards
		});
		// this.state.flashcard.cards.replace({id: this.state.selectedCard.id}, this.state.selectedCard);
	}
	render() {
		if (this.state.loadComplete === false) {
			return (
				<div className="load-pane">
					<i className="ic-spinner animate-spin" />
				</div>
			);
		} else {
			var self = this;
			const mappedReorderOptions = this.state.flashcard.cards.map(
				function(card) {
					return (
						<label
							key={card.id}
							id={`order-option-${card.id}`}
							className="order-inputs"
							onClick={e => {
								self.chooseOrder(card.serial_no);
							}}
						>
							<input type="checkbox" /> {card.serial_no}
						</label>
					);
				}
			);
			const renderedCards = this.state.flashcard.cards.map(function(
				card
			) {
				return (
					<div
						className="question-pane edit-question board"
						key={card.id}
						id={card.id}
					>
						<div className="overlay" id={`overlay-${card.id}`}>
							<i className="ic-spinner animate-spin" />
						</div>
						<div className="menu">
							<i
								className="ic-menu"
								onClick={e => {
									var s = e.target.parentNode.getElementsByTagName(
										"div"
									)[0];
									if (s !== undefined) {
										s.style.display === "block"
											? (s.style.display = "none")
											: (s.style.display = "block");
									}
								}}
							/>
							<div className="dropmenu">
								<a
									href="#more"
									onClick={e => {
										e.preventDefault();
										self.setState({
											showModal: true,
											selectedCard: card
										});
									}}
								>
									Re-order
								</a>
								<a
									href="#select"
									onClick={e => {
										e.preventDefault();
										self.deleteCard(card.id);
									}}
									className="danger"
								>
									Delete Flashcard
								</a>
							</div>
						</div>
						<div className="question">
							<div className="number">{card.serial_no}</div>
							<div className="details">
								<div className="option-heading">
									<ul className="grid grid-2">
										<li className="sparse">QUESTION</li>
										<li className="sparse">ANSWER</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="options">
							<div className="tab" />
							<div className="option-pane">
								<ul className="grid grid-2">
									<li>
										<textarea
											defaultValue={card.question}
											onChange={e => {
												self.textAreaChange(
													e,
													"question-" + card.id
												);
											}}
										/>
									</li>
									<li>
										<textarea
											defaultValue={card.answer}
											onChange={e => {
												self.textAreaChange(
													e,
													"answer-" + card.id
												);
											}}
										/>
										<div align="right">
											<button
												className="sparse compact"
												onClick={() =>
													self.saveCard(card.id)
												}
											>
												SAVE
											</button>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				);
			});
			return (
				<section className="flashcards">
					<div className="create-flashcard">
						<span
							className="back-arrow"
							onClick={() => window.history.go(-1)}
						>
							<i className="ic-back" />
						</span>
						<h1 className="heading">
							{this.state.flashcard.title} -{" "}
							{this.state.course.title}
						</h1>
						<div className="heading-action">
							<p> {this.state.flashcard.description}</p>
						</div>

						<div className="question-pane edit-question board">
							<div
								className="overlay"
								id={`overlay-${this.state.flashcard.id}`}
							>
								<i className="ic-spinner animate-spin" />
							</div>
							<div className="question">
								<div className="tab" />
								<div className="details">
									<div className="option-heading">
										<ul className="grid">
											<li className="sparse">
												UPDATE FLASHCARD DETAILS
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="options">
								<div className="tab" />
								<div className="option-pane">
									<ul className="grid grid-2">
										<li>
											<div className="input-wrapper">
												<label className="left sparse sm-title">
													TITLE
												</label>
												<div className="wrapp">
													<input
														type="text"
														defaultValue={
															this.state.flashcard
																.title
														}
														onChange={e =>
															this.textAreaChange(
																e,
																"title-" +
																	this.state
																		.flashcard
																		.id
															)
														}
														placeholder="Enter the bundle title"
													/>
												</div>
											</div>
											<div className="input-wrapper">
												<label className="left sparse sm-title">
													PRICE
												</label>
												<div className="wrapp">
													<input
														type="text"
														defaultValue={
															this.state.flashcard
																.cost
														}
														onChange={e =>
															this.textAreaChange(
																e,
																"cost-" +
																	this.state
																		.flashcard
																		.id
															)
														}
														placeholder="Enter the bundle cost"
													/>
												</div>
											</div>
										</li>
										<li>
											<div className="input-wrapper">
												<label className="left sparse sm-title">
													DESCRIPTION
												</label>
												<div className="wrapp">
													<textarea
														className="except"
														type="text"
														defaultValue={
															this.state.flashcard
																.description
														}
														onChange={e =>
															this.textAreaChange(
																e,
																"description-" +
																	this.state
																		.flashcard
																		.id
															)
														}
														placeholder="Enter the bundle description"
													/>
												</div>
											</div>
											<div align="right">
												<button
													className="sparse compact alt"
													onClick={() =>
														this.saveFlashcard()
													}
												>
													SAVE
												</button>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div>{renderedCards}</div>

						<button
							className="alt bar compact create-btn"
							onClick={() => window.history.go(-1)}
						>
							Create a new Flashcard
						</button>

						<Modal
							visible={this.state.showModal}
							closeModal={() =>
								this.setState({ showModal: false })
							}
						>
							<div className="card-reorder">
								<h1>Select number to move to</h1>
								{mappedReorderOptions}
							</div>
						</Modal>
					</div>
				</section>
			);
		}
	}
	componentWillMount() {
		let courseId = this.props.match.params.course_id;
		let courses = store.getState().state.courses;
		for (var i = 0; i < courses.length; i++) {
			if (courses[i].id === courseId) {
				this.setState({ course: courses[i] });
			}
		}
		this.$ = window.$;
	}
	componentDidMount() {
		this.getCards();
		setTimeout(() => {
			let textareas = document.getElementsByTagName("textarea");
			for (var i = 0; i < textareas.length; i++) {
				textareas[i].style.height = textareas[i].scrollHeight + "px";
			}
		}, 1000);
	}
}
