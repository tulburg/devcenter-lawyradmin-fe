import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import store from '../store';

class Payment extends Component {
	state = { rows: [
	        ['Sept 29', 0], ['Sept 30', 5], ['Nov 1', 15], ['Nov 2', 9], ['Nov 3', 10], ['Nov 4', 5], ['Nov 5', 0]
		], 
		columns: [
      		{ type: 'string' },
      		{ type: 'number', label: 'Payments'}
      	], 
      	options : {
	        hAxis: { type: 'number', title: '', baselineColor: '#aaa', gridlines: { count: 0} },
	        vAxis: { type: 'number', title: 'GOAT', baselineColor: '#aaa', gridlines: { count: 0}, color:'red' },
	        series: { 0: { curveType: 'function' } },
	        animation: { startup: true, duration: 300, easing: 'inAndOut' },
	        backgroundColor: { fill: 'transparent', stroke: '#c00' },
	        colors: ['#ccc', 'black'],
	        chartArea: { left: 0, width: '100%', height: 100 }
      	}, metrics: undefined 
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
		const renderedPurchaseHistory = [1,2,3,4,5,6].map(function(item) {
			return (<ul className="grid grid-3" key={item}><li className="name">@Username just purchased 'Criminal Law Flashcard'</li><li>22-Nov-2018</li><li>20 mins ago</li></ul>);
		})
		return (<div className="main-section">
			<section className="payment">
				<h4>Overview</h4>
				<ul className="grid grid-2 top">
					<li><Chart chartType="AreaChart" options={this.state.options} columns={this.state.columns} rows={this.state.rows} graph_id="MoneyChart" width="100%" height="240px" /> </li>
					<li>
						<div className="top-action">
							<label>TOTAL REVENUE</label>
							<h1>N{(this.state.metrics!==undefined) ? this.state.metrics.total_revenue.toLocaleString() : 0}</h1>
						</div>
					</li>
				</ul>
				<hr />
					<ul className="grid grid-3 card-holder">
						<li>
							<div className="card">
								<div className="head">
									<i className="ic-checkboard"></i>
									<div><h1>{(this.state.metrics!==undefined) ? this.state.metrics.total_purchased_flashcards.toLocaleString() : 0}</h1><p>Purchased Flashcards</p></div>
								</div>
								<div className="total">N{(this.state.metrics!==undefined) ? this.state.metrics.total_revenue_on_flashcards.toLocaleString() : 0}</div>
							</div>
							<Link to="payments/flashcards">Flashcard Purchases <i className="ic-right"></i></Link>
						</li>
						<li>
							<div className="card">
								<div className="head">
									<i className="ic-card"></i>
									<div><h1>{(this.state.metrics!==undefined) ? this.state.metrics.total_paid_users.toLocaleString() : 0}</h1><p>Paid Access</p></div>
								</div>
								<div className="total">N{(this.state.metrics!==undefined) ? this.state.metrics.total_revenue_on_subscriptions.toLocaleString() : 0}</div>
							</div>
							<Link to="payments/access">Flashcard Access <i className="ic-right"></i></Link>
						</li>
						<li></li>
					</ul>
				<hr />
				<div className="purchase-history">
					<h2>Purchase History</h2>
					<div className="table">
						<ul className="grid grid-3 thead">
							<li>NAME</li><li>DAY</li><li>TIME</li>
						</ul>
						<div className="tbody">
							{ renderedPurchaseHistory }
						</div>
					</div>
				</div>
			</section>
		</div>);
	}
	componentDidMount() {
		if(!store.getState().state.metrics) { 
			this.fetchMetrics();
		}else {
			this.setState({ metrics: store.getState().state.metrics });
		}
	}
}

class PaymentFlashcards extends Component {
	state = { loadComplete: false,  metrics: undefined }
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
  		if(this.state.loadComplete===false) {
  			return (
  				<div className="main-section">
					<div className="load-pane">
						<i className="ic-spinner animate-spin"></i>
					</div>
				</div>
  			);
  		}else {
  			var c = 0;
			const renderedCourses = store.getState().state.courses.map(function(course) {
				c++; let icons = ["ic-handcuffs", "ic-book", "ic-olive", "ic-group", "ic-university", "ic-justice", "ic-flower", "ic-group-2", "ic-badge"]
				return (<li key={course.id}><div className="ball"><i className={icons[c-1]}></i></div><h2 className="title">{ course.title }</h2><span>N10,000</span><p>500 Flashcards Purchased</p></li>);
			});
			return(<div className="main-section">
				<section className="payment-flashcards">
					<span className="back-arrow" onClick={() => window.history.go(-1) }>
					  	<i className="ic-back" />
					</span>
					<h1 className="heading">Flashcard Purchases</h1>
					<ul className="grid grid-4 card-holder">
						<li>
							<div className="card action">
								<p>FLASHCARD REVENUE</p>
								<h1>N{(this.state.metrics!==undefined) ? this.state.metrics.total_revenue_on_flashcards.toLocaleString() : 0}</h1>
							</div>
						</li>
						<li>
							<div className="card">
								<div className="head">
									<i className="ic-checklist"></i>
									<div><h1>{(this.state.metrics!==undefined) ? this.state.metrics.total_purchased_flashcards.toLocaleString() : 0}</h1><p>Purchased Flashcards</p></div>
								</div>
							</div>
						</li>
						<li>
							<div className="card">
								<div className="head">
									<i className="ic-list"></i>
									<div><h1>{(this.state.metrics!==undefined) ? this.state.metrics.total_custom_flashcards.toLocaleString() : 0}</h1><p>Custom Flashcards</p></div>
								</div>
							</div>
						</li>
						<li>
							<div className="stat">
								<p>MOST PURCHASED</p>
								<h1>Criminal Law</h1>
							</div>
						</li>
					</ul>
					<hr />
					<div className="test-courses">
						<ul className="grid grid-5">
							{ renderedCourses }
						</ul>
					</div>
				</section>
			</div>);
		}
	}
	componentDidMount() {
		if(store.getState().state.courses === undefined) {
			this.loadCourses();
		}else { this.setState({ loadComplete: true })}
		if(!store.getState().state.metrics) { 
			this.fetchMetrics();
		}else {
			this.setState({ metrics: store.getState().state.metrics });
		}
	}
}

class PaymentAccess extends Component {
	state = { loadComplete: false, metrics: undefined, users: []  }
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
	fetchPaidUsers() {
		var self = this;
		fetch(store.getState().state.api.dev+"users/clients/paid", {
			method: 'GET',
			headers: { 'Authorization': 'Bearer '+store.getState().state.token, 'content-type': 'application/json'}
		}).then(res => res.json()).then(res => {
			console.log(res);
			self.setState({ loadComplete: true, users: res.data });
		}).catch(err => { console.log(err.message) });
	}
	timeSince(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		var interval = Math.floor(seconds / 31536000);
		if (interval > 1) { return interval + " years"; }
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) { return interval + " months"; }
		interval = Math.floor(seconds / 86400);
		if (interval > 1) { return interval + " days"; }
		interval = Math.floor(seconds / 3600);
		if (interval > 1) { return interval + " hours"; }
		interval = Math.floor(seconds / 60);
		if (interval > 1) { return interval + " minutes"; }
		return Math.floor(seconds) + " seconds";
	}
	dateFormat(date) {
		var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"]
		return date.getDate()+"-"+months[date.getMonth()]+"-"+date.getFullYear();
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
  			var renderedUsers = this.state.users.map((u) => {
  				return (<ul className="grid grid-4" key={ u.id }><li>{ u.username }</li><li>{ this.dateFormat(new Date(u.created_at.replace(" ", "T"))) }</li><li>{ this.timeSince(new Date(u.created_at.replace(" ", "T")))+" ago" }</li><li>{ u.platform }</li></ul>);
  			})
			return (<div className="main-section">
				<section className="payment-access">
					<span className="back-arrow" onClick={() => window.history.go(-1) }>
					  	<i className="ic-back" />
					</span>
					<h1 className="heading">Paid Access</h1>
					<ul className="grid grid-4 card-holder">
						<li>
							<div className="card action">
								<p>PAID ACCESS REVENUE</p>
								<h1>N{(this.state.metrics!==undefined) ? this.state.metrics.total_revenue_on_subscriptions.toLocaleString() : 0}</h1>
							</div>
						</li>
						<li>
							<div className="card">
								<div className="head">
									<i className="ic-group-2"></i>
									<div><h1>{(this.state.metrics!==undefined) ? this.state.metrics.total_paid_users.toLocaleString() : 0}</h1><p>Paid Users</p></div>
								</div>
							</div>
						</li>
						<li>
							<div className="card">
								<div className="head">
									<i className="ic-user"></i>
									<div><h1>{(this.state.metrics!==undefined) ? this.state.metrics.total_unpaid_users.toLocaleString() : 0}</h1><p>Users on Free Trials</p></div>
								</div>
							</div>
						</li>
						<li>
						</li>
					</ul>
					<hr />
					<div className="table">
						<ul className="grid grid-4 thead"><li>USERNAME</li><li>DAY</li><li>TIME</li><li>PLATFORM</li></ul>
						<div className="tbody">
							{ renderedUsers }
						</div>
					</div>
				</section>
			</div>);
		}
	}
	componentDidMount() {
		if(!store.getState().state.metrics) { 
			this.fetchMetrics();
		}else {
			this.setState({ metrics: store.getState().state.metrics });
		}
		this.fetchPaidUsers();
	}
}

export { Payment, PaymentFlashcards, PaymentAccess }