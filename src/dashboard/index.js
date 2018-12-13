import React, { Component } from "react";
import styled from "styled-components";
import { Route, Redirect } from "react-router-dom";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { SendInvite } from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import Nav from "../components/Nav";
import Tests from "./Tests";
import OngoingTests from "./OngoingTests";
import CreateTest from "./CreateTest";
import Test, { TestView } from "./Test";
import FlashCards from "./FlashCards";
import AllUsers from "./AllUsers";
import { Payment, PaymentFlashcards, PaymentAccess } from "./Payment";
import store from "../store";
import AnchorLink from "react-anchor-link-smooth-scroll";

function QuestionNav(props) {
	if (!props.showQuestionNav) return null;
	const questions = num => {
		let all = [];
		for (var i = 0; i < num; i++) {
			all.push(
				<li key={i}>
					<AnchorLink offset="80" href={`#question-${i + 1}`}>
						{i + 1}
					</AnchorLink>
				</li>
			);
		}
		return all;
	};
	return (
		<div className="question-nav">
			<span>Jump to Question</span>
			<div>
				<ul>{questions(props.questions)}</ul>
			</div>
		</div>
	);
}

export default class Dashboard extends Component {
	state = {
		showModal: false,
		showDoneModal: false,
		showQuestionNav: false,
		questions: 0,
		inviteEmail: "",
		hasInviteError: false,
		inviteError: "",
		inviteLoading: false,
		sentEmail: undefined,
		showingResMenu: false,
		metrics: undefined,
		gotoOngoing: false,
		gotoPurchases: false,
		invitationLoading: false,
		gotoUsers: false
	};

	onCloseModal = () => {
		this.setState({ showModal: false, showDoneModal: false });
	};

	toggleResMenu(e) {
		if (e.target.className && e.target.className.match("res-menu")) {
			this.setState({ showingResMenu: !this.state.showingResMenu });
		} else {
			this.setState({ showingResMenu: false });
		}
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

	inviteUser() {
		this.setState({ inviteLoading: true, invitationLoading: true });
		let param = JSON.stringify({ email: this.state.inviteEmail });
		var self = this;
		fetch(store.getState().state.api.dev + "users/invite", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + store.getState().state.token,
				"content-type": "application/json"
			},
			body: param
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({
					inviteLoading: false,
					invitationLoading: false
				});
				if (res.status === true) {
					self.setState({
						showDoneModal: true,
						showModal: false,
						hasInviteError: false,
						sentEmail: self.state.inviteEmail,
						inviteEmail: ""
					});
					setTimeout(() => {
						self.setState({ sentEmail: undefined });
					}, 5000);
				} else {
					self.setState({
						inviteError: res.message,
						hasInviteError: true
					});
					setTimeout(() => {
						self.setState({ hasInviteError: false });
					}, 5000);
				}
			})
			.catch(err => {
				console.log(err.message);
			});
	}

	setValue(e, key) {
		if (key === "invite") {
			this.setState({ inviteEmail: e.target.value });
		}
	}

	render() {
		const nav = [
			{ url: "", title: "Home", icon: "ic-home" },
			{ url: "tests", title: "Tests", icon: "ic-o-list" },
			{ url: "flashcards", title: "Flashcards", icon: "ic-card-4" },
			{ separator: true },
			// { url: "payments", title: "Payments", icon: "ic-card" },
			{ url: "users", title: "All Users", icon: "ic-user" }
		];
		if (this.state.gotoOngoing) {
			window.location.href = `${this.props.match.url}/ongoing`;
		}
		if (this.state.gotoPurchases) {
			window.location.href = `${
				this.props.match.url
			}/payments/flashcards`;
		}
		if (this.state.gotoUsers) {
			window.location.href = `${this.props.match.url}/users`;
		}
		if (!store.getState().state.session.active) {
			return <Redirect to="/" />;
		}
		let self = this;
		store.subscribe(function() {
			if (store.getState().main.show_question_nav !== undefined) {
				self.setState({
					showQuestionNav: store.getState().main.show_question_nav,
					questions: store.getState().main.questions
				});
			}
		});
		return (
			<div
				onClick={e => {
					this.toggleResMenu(e);
				}}
			>
				<Header />
				<div className="main">
					<div className="navigation">
						<Nav items={nav} url={this.props.match.url} />
						<QuestionNav
							questions={this.state.questions}
							showQuestionNav={this.state.showQuestionNav}
						/>
					</div>
					<div
						className={
							this.state.showingResMenu
								? "res-navigation active"
								: "res-navigation"
						}
					>
						<Nav items={nav} url={this.props.match.url} />
						<QuestionNav
							questions={this.state.questions}
							showQuestionNav={this.state.showQuestionNav}
						/>
					</div>
					<Route
						exact
						path="/dashboard"
						render={() => (
							<div className="main-section">
								<Modal
									closeModal={this.onCloseModal}
									visible={this.state.showModal}
								>
									<SendInvite>
										<h4
											className="header"
											style={
												this.state.hasInviteError &&
												!this.state.inviteLoading
													? { color: "#c00" }
													: {}
											}
										>
											{this.state.inviteLoading ? (
												<i className="ic-spinner animate-spin" />
											) : this.state.hasInviteError ? (
												this.state.inviteError
											) : (
												"Invite users"
											)}
										</h4>
										<span className="subtext">
											Enter an Email Address to Continue
										</span>
										<input
											className="textbox"
											placeholder="Email Address"
											onChange={e => {
												this.setValue(e, "invite");
											}}
										/>
										<button
											onClick={() => {
												this.inviteUser();
											}}
										>
											Invite
										</button>
									</SendInvite>
								</Modal>
								<Modal
									closeModal={this.onCloseModal}
									visible={this.state.showDoneModal}
								>
									<SendInvite>
										<h1 className="header--large">Done!</h1>
										<h4
											className="header uppercase"
											style={
												this.state.hasInviteError &&
												!this.state.inviteLoading
													? { color: "#c00" }
													: {}
											}
										>
											{this.state.inviteLoading ? (
												<i className="ic-spinner animate-spin" />
											) : this.state.hasInviteError ? (
												this.state.inviteError
											) : (
												"Invite more users to use lawyr"
											)}
										</h4>
										<span className="subtext">
											Enter another Email Address to
											Continue
										</span>
										<div className="input-wrap">
											<input
												className="textbox"
												placeholder="Email Address"
												onChange={e => {
													this.setValue(e, "invite");
												}}
											/>
											<div
												type="button"
												className="input-wrap__btn"
												onClick={() => {
													this.inviteUser();
												}}
											>
												<i className="ic-plus" />
											</div>
										</div>
										{this.state.sentEmail ? (
											<span className="invite-sent">
												Invitation Email to{" "}
												{this.state.sentEmail} sent
											</span>
										) : (
											""
										)}
									</SendInvite>
								</Modal>
								<h2 className="main-section__header">
									Overview
								</h2>
								<div className="card-wrap">
									<Card
										bg="invert"
										icon="ic-uniF11E"
										number={
											this.state.metrics !== undefined
												? this.state.metrics.total_signed_up_users.toLocaleString()
												: 0
										}
										title="signed up users"
										classNames="signed-up"
									>
										<Button
											onClick={() =>
												this.setState({
													showModal: true
												})
											}
											color="#000"
											text="Invite Users"
											bg="#50e3c2"
										/>
									</Card>
									<Card
										icon="ic-group-2"
										number={
											this.state.metrics !== undefined
												? this.state.metrics.total_active_users.toLocaleString()
												: 0
										}
										title="Active users"
										classNames="active-users"
									>
										<Button
											onClick={() =>
												this.setState({
													gotoOngoing: true
												})
											}
											text="View Ongoing Tests"
											bg="#1c2d41"
											className="card-button"
										/>
									</Card>
									<Card
										icon="ic-card"
										number={
											this.state.metrics !== undefined
												? this.state.metrics.total_paid_users.toLocaleString()
												: 0
										}
										title="Paid users"
										classNames="paid-users"
									>
										<Button
											onClick={() =>
												this.setState({
													gotoPurchases: true
												})
											}
											text="View purchases"
											bg="#1c2d41"
										/>
									</Card>
								</div>

								{/* <div className="main-section__separator" />

								<h2 className="main-section__header">
									Content
								</h2>
								<div className="card-wrap">
									<FlashCard>
										<p className="flashcard__text">
											Create a Flash card
										</p>
										<span
											className="flashcard__icon"
											onClick={() => {
												window.location.href =
													this.props.match.url +
													"/flashcards";
											}}
										>
											<i className="ic-right" />
										</span>
									</FlashCard>
									<FlashCard>
										<p className="flashcard__text">
											Create a Test
										</p>
										<span
											className="flashcard__icon"
											onClick={() => {
												window.location.href =
													this.props.match.url +
													"/tests";
											}}
										>
											<i className="ic-right" />
										</span>
									</FlashCard>
									<div className="quick-links">
										<p className="quick-links__header">
											quick links
										</p>
										<p
											className="quick-links__link"
											onClick={() => {
												window.location.href =
													this.props.match.url +
													"/flashcards";
											}}
										>
											<span>Edit Flashcards</span>
											<span>
												<i className="ic-right" />
											</span>
										</p>
										<p
											className="quick-links__link"
											onClick={() => {
												window.location.href =
													this.props.match.url +
													"/tests";
											}}
										>
											<span>Edit Courses</span>
											<span>
												<i className="ic-right" />
											</span>
										</p>
									</div>
								</div> */}

								{/* <div className="main-section__separator" /> */}

								{/* <div className="invite-users">
									<h2 className="invite-users__header">
										Invite users
									</h2>
									<div className="invite-users__input-wrap">
										<input
											onChange={e => {
												this.setValue(e, "invite");
											}}
											value={this.state.inviteEmail}
										/>
										<button
											onClick={() => {
												this.inviteUser();
											}}
										>
											{this.state.invitationLoading ? (
												<i className="ic-spinner animate-spin" />
											) : (
												"invite"
											)}
										</button>
									</div>
									<p className="invite-users__link">
										<a
											href="/"
											onClick={e => {
												this.setState({
													gotoUsers: true
												});
												e.preventDefault();
											}}
										>
											GO TO USERS PAGE
										</a>
									</p>
								</div> */}
							</div>
						)}
					/>
					<Route
						path={`${this.props.match.url}/tests`}
						component={Tests}
					/>
					<Route
						path={`${this.props.match.url}/ongoing`}
						component={OngoingTests}
					/>
					<Route
						path={`${this.props.match.url}/create-test/:course_id`}
						component={CreateTest}
					/>
					<Route
						exact
						path={`${
							this.props.match.url
						}/test/:course_id/:test_id`}
						component={TestView}
					/>
					<Route
						path={`${
							this.props.match.url
						}/test/:course_id/:test_id/edit`}
						component={Test}
					/>
					<Route
						path={`${this.props.match.url}/flashcards`}
						component={FlashCards}
					/>
					<Route
						path={`${this.props.match.url}/users`}
						component={AllUsers}
					/>
					<Route
						exact
						path={`${this.props.match.url}/payments`}
						component={Payment}
					/>
					<Route
						exact
						path={`${this.props.match.url}/payments/flashcards`}
						component={PaymentFlashcards}
					/>
					<Route
						exact
						path={`${this.props.match.url}/payments/access`}
						component={PaymentAccess}
					/>
				</div>
			</div>
		);
	}

	componentDidMount() {
		console.log(store.getState().state);
		if (!store.getState().state.metrics) {
			this.fetchMetrics();
		} else {
			this.setState({ metrics: store.getState().state.metrics });
		}
	}
}

const FlashCard = styled.div`
	width: 30%;
	border-radius: 12px;
	background-color: #d6dce3;
	display: flex;
	justify-content: space-around;
	justify-content: space-evenly;
	align-items: center;

	.flashcard__text {
		font-size: 22px;
		width: 50%;
	}

	.flashcard__icon {
		height: 40px;
		width: 40px;
		border-radius: 100%;
		background-color: #1c2d41;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
`;
