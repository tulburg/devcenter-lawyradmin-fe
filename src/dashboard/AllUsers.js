import React, { Component } from "react";
import Card from '../components/Card';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import store from '../store';

export default class AllUsers extends Component {
	state = { activity: true, userDirectory: false, loadComplete: false, users: undefined, showModal: false, metrics: undefined, pagination: [], page: 1 }
	showActivity() { this.setState({ activity: true, userDirectory: false }); }
	showUserDirectory() { this.setState({ activity: false, userDirectory: true }); }
	showUserModal(user) {
		this.setState({ showModal: true });
	}
	fetchUsers() {
		fetch(store.getState().state.api.dev+"users?page="+this.state.page, {
			method: 'GET',
			headers: { 'Authorization' : 'Bearer '+store.getState().state.token }
		}).then(res => res.json()).then(res => {
			console.log(res);
			this.setState({ users: res.data, loadComplete: true, pagination: res.meta.pagination });
		}).catch(err => console.log(err));
	}
	fetchMetrics() {
		let param = [
			"total_signed_up_users", "total_active_users", "total_paid_users", "total_unpaid_users", "total_ongoing_tests",
			"total_purchased_flashcards", "total_custom_flashcards", "total_revenue", "total_revenue_on_flashcards", "total_revenue_on_subscriptions",
			"most_answered_quiz", "least_answered_quiz"
		];
		fetch(store.getState().state.api.dev+"admin/metrics?fields[]="+param.join("&fields[]="), {
			method: 'GET',
			headers: { 'Authorization': 'Bearer '+store.getState().state.token, 'content-type': 'application/json'}
		}).then(res => res.json()).then(res => {
			console.log(res);
			store.dispatch({ type: "SAVE_METRICS", payload: res.data })
		}).catch(err => { console.log(err.message) });
	}
	render() {
		const { activity, userDirectory, loadComplete, users, showModal } = this.state;
		if(loadComplete === false) {
			return (<div className="main-section">
				<div className="load-pane">
					<i className="ic-spinner animate-spin"></i>
				</div>
			</div>);
		}else { 
			var self = this;
			const renderedUsersActivity = users.map(function(user) {
				return (<ul className="grid grid-3" key={user.id}><li className="name" onClick={() => self.showUserModal(user)}><div className="avatar-placeholder">UO</div>@ { user.username }</li><li>22-Nov-2018</li><li>20 mins ago</li></ul>);
			})
			const renderedUsersDirectory = users.map(function(user) {
				return (<ul className="grid grid-4" key={user.id}><li className="name" onClick={() => self.showUserModal(user)}>{ user.email }</li><li>{ user.username } </li><li>Saturday 22 Nov, 2018</li><li>5min ago</li></ul>);
			})
			const renderTabContent = [1].map(function(item) {
				if(activity){ return (
					<div className="table test-list" key={item}>
						<ul className="grid grid-3 thead">
							<li>NAME</li><li>DAY</li><li>TIME</li>
						</ul>
						<div className="tbody">
							{ renderedUsersActivity }
						</div>
					</div>
				)}
				if(userDirectory){ return (
					<div className="table test-list" key={item}>
						<ul className="grid grid-4 thead">
							<li>EMAIL</li><li>USERNAME</li><li>DAY</li><li>TIME</li>
						</ul>
						<div className="tbody">
							{ renderedUsersDirectory }
						</div>
					</div>
				)}
				return ("");
			});
			return( <div className="main-section">
				<section className="all-users">
					<div className="card-wrap">
						<Card bg="invert" icon="ic-group-2" number={(this.state.metrics!==undefined) ? this.state.metrics.total_signed_up_users.toLocaleString() : 0} title="Signed Up Users" classNames="sign-up-users" />
						<Card icon="ic-card" number={(this.state.metrics!==undefined) ? this.state.metrics.total_paid_users.toLocaleString() : 0} title="Paid Users" classNames="paid-users" />
						<Card icon="ic-user" number={(this.state.metrics!==undefined) ? this.state.metrics.total_active_users.toLocaleString() : 0} title="Active Users" classNames="active-users" />
					</div>
					<ul className="grid grid-2">
						<li>
							<div className="test-tab">
								<p onClick={() => { this.showActivity() }} className={`tab-item ${activity ? 'active' : ''}`} >Activity Log</p>
								<p onClick={() => { this.showUserDirectory() }} className={`tab-item ${userDirectory ? 'active' : ''}`} >User Directory</p>
							</div>
						</li>
						<li>
							<div className="search-box">
								<input type="text" placeholder="Search Users" />
								<button>Search <i className="ic-search"></i></button>
							</div>
						</li>
					</ul>
					<div className="cool">
						{ renderTabContent }
					</div>	
					<Pagination config={this.state.pagination} load={(v) => { this.setState({ page: v }); this.fetchUsers(); }} />
					<Modal closeModal={() => { this.setState({showModal: false }) }} visible={showModal}>
				      	<ul className="grid grid-2 user-modal">
				      		<li className="profile-holder">
				      			<div className="user-profile">
				      				<label>HOSTED BY</label>
				      				<div className="profile">
				      					<div className="avatar-placeholder">UO</div>
				      					<div className="profile-name">
				      						<h3>Name Username</h3>
				      						<p>@Username</p>
				      					</div>
				      				</div>
				      			</div>
				      			<ul className="grid grid-2 stats">
				      				<li><label>JOINED</label><span>83 days ago</span></li>
				      				<li><label>TESTS TAKEN</label><span>5</span></li>
				      			</ul>
				      			<ul className="grid grid-2 stats">
				      				<li><label>PAID FLASHCARDS</label><span>10</span></li>
				      				<li><label>FLASHCARDS CREATED</label><span>60</span></li>
				      			</ul>
				      			<ul className="grid grid-2 stats">
				      				<li><label>REVENUE</label><span>N3000</span></li>
				      				<li><label>TESTS TAKEN</label><span>5</span></li>
				      			</ul>
				      		</li>
				      		<li className="activity-holder">
			      				<label>USER ACTIVITY</label>
			      				<ul className="grid grid-2 activity-list"><li>@Username purchased 'Criminal Law Flashcards'</li><li>11/12/18</li></ul>
			      				<ul className="grid grid-2 activity-list"><li>@Username purchased 'Criminal Law Flashcards'</li><li>11/12/18</li></ul>
			      				<ul className="grid grid-2 activity-list"><li>@Username purchased 'Criminal Law Flashcards'</li><li>11/12/18</li></ul>
			      				<ul className="grid grid-2 activity-list"><li>@Username purchased 'Criminal Law Flashcards'</li><li>11/12/18</li></ul>
			      				<ul className="grid grid-2 activity-list"><li>@Username purchased 'Criminal Law Flashcards'</li><li>11/12/18</li></ul>
			      				<ul className="grid grid-2 activity-list"><li>@Username purchased 'Criminal Law Flashcards'</li><li>11/12/18</li></ul>
			      				<ul className="grid grid-2 activity-list"><li>@Username purchased 'Criminal Law Flashcards'</li><li>11/12/18</li></ul>
				      		</li>
				      	</ul>
				    </Modal>	
				</section>
			</div>)
		}
	}
	componentDidMount() {
		this.fetchUsers();
		if(!store.getState().state.metrics) { 
			this.fetchMetrics();
		}else {
			this.setState({ metrics: store.getState().state.metrics });
		}
	}
}