import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Select from "../components/Select";
import store from "../store";

export default class CreateTest extends Component {
	state = {
		showUploadModal: false,
		course: null,
		loadComplete: false,
		file: null,
		year: undefined,
		tests: [],
		uploading: false,
		uploadError: undefined
	};

	onFailChange(value) {
		// console.log(value);
	}

	sortBy(type) {
		let tests = this.state.tests;
		if (type === "year") {
			tests.sort(function(a, b) {
				return a.year > b.year ? 1 : b.year > a.year ? -1 : 0;
			});
		} else if (type === "time") {
		} else if (type === "date") {
			tests.sort(function(a, b) {
				let c = new Date(a.created_at.replace(" ", "T")),
					d = new Date(b.created_at.replace(" ", "T"));
				return c > d ? 1 : d > c ? -1 : 0;
			});
		}
		this.setState({ tests: tests });
	}

	getCourse() {
		fetch(
			store.getState().state.api.dev +
				"courses/" +
				this.props.match.params.course_id +
				"/quizs",
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + store.getState().state.token
				}
			}
		)
			.then(res => res.json())
			.then(res => {
				let id = this.props.match.params.course_id;
				console.log(res.data);
				if (res.data) {
					store.dispatch({
						type: "SAVE_COURSE_TESTS_" + id,
						payload: res.data
					});
					this.setState({ loadComplete: true, tests: res.data });
				} else {
					console.error("Couldnt fetch course test");
				}
			});
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
		this.setState({ uploading: true });
		let formData = new FormData();
		formData.append("file", this.state.file);
		formData.append("course_id", this.state.course.id);
		formData.append("year", this.state.year);
		fetch(store.getState().state.api.dev + "quizs/upload", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + store.getState().state.token
			},
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				// console.log(res);
				if (res.data) {
					this.setState({
						uploading: false,
						showUploadModal: false,
						loadComplete: false
					});
					this.getCourse();
				} else {
					this.setState({
						uploading: false,
						uploadError: res.message
					});
					setTimeout(() => {
						this.setState({ uploadError: undefined });
					}, 4000);
				}
			})
			.catch(err => console.log(err));
	}

	deleteTest(id) {
		if (window.confirm("Are you sure you want to delete this test?")) {
			fetch(store.getState().state.api.dev + "quizs/" + id, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + store.getState().state.token
				}
			})
				.then(res => res.json())
				.then(res => {
					// console.log(res);
				})
				.catch(err => console.log(err));
		}
	}

	setFile(e) {
		e.preventDefault();
		var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		this.setState({ file: files[0] });
	}

	setYear(value) {
		this.setState({ year: value });
	}

	render() {
		if (this.state.course === null) {
			console.log("Unable to find this course");
		}
		const yearOptions = [{ title: "Select year", value: "" }];
		"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20"
			.split(",")
			.forEach(function(num) {
				yearOptions.push({
					title: 2000 + parseInt(num, 10),
					value: 2000 + parseInt(num, 10)
				});
				return;
			});
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
			const renderedTests = this.state.tests.map(function(test) {
				const userCreated = test.created_at.slice(0, 10);
				const userUpdated = test.updated_at.slice(0, 10);
				return (
					<ul className="grid grid-6" key={test.id}>
						<li>
							<Link
								to={`/dashboard/test/${id}/${test.id}`}
								className="no-decoration"
							>
								{self.state.course.title}
							</Link>
						</li>
						<li>{test.year}</li>
						<li>{userCreated}</li>
						<li>{userUpdated}</li>
						<li>
							<b>{test.completed_sessions}</b>
						</li>
						<li>
							<i
								className="ic-trash"
								onClick={() => {
									self.deleteTest(test.id);
								}}
							/>
						</li>
					</ul>
				);
			});
			return (
				<div className="main-section">
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
											Create a New Test
										</div>
										<div className="subtitle">
											UPLOAD EXCEL (.xls) FILE
										</div>
									</div>
								</a>
							</li>
							{/* <li>
								<div className="right-action">
									<span className="light">
										{" "}
										Displaying 7 of 7 Tests
									</span>
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
												{
													title: "Times Taken",
													value: "time"
												},
												{ title: "Year", value: "year" }
											]}
										/>
									</div>
								</div>
							</li> */}
						</ul>
						<br />
						<br />
						<div>Click a test to View & Edit</div>
						<br />
						<div className="table test-list">
							<ul className="grid grid-6 thead">
								<li>NAME</li>
								<li>YEAR</li>
								<li>CREATED</li>
								<li>EDITED</li>
								<li>TIMES TAKEN</li>
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
							<p>
								Upload a Spreadsheet containing your Test
								Questions
							</p>
							<br />
							<form onSubmit={e => this.handleUpload(e)}>
								Select question year:{" "}
								<Select
									name="failoptions"
									classNames=""
									options={yearOptions}
									onChange={v => {
										this.setYear(v);
									}}
								/>
								<input
									type="file"
									id="file"
									onChange={this.setFile.bind(this)}
									accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
								/>
								<br />
								<div
									className="filepicker"
									onClick={e => {
										document.getElementById("file").click();
										e.preventDefault();
									}}
								>
									<i className="ic-folder" />
								</div>
								<div className="filepicker-label">
									{this.state.file
										? this.state.file.name
										: "UPLOAD FROM COMPUTER"}
								</div>
								{this.state.uploadError !== undefined ? (
									this.state.uploadError
								) : this.state.uploading ? (
									<i className="ic-spinner animate-spin" />
								) : (
									<button className="alt">SUBMIT</button>
								)}
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
		if (store.getState().state["course_tests_" + id] === undefined) {
			this.getCourse();
		} else {
			this.setState({
				loadComplete: true,
				tests: store.getState().state["course_tests_" + id]
			});
		}
	}
}
