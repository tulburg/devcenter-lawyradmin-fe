import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
// import Button from '../components/Button';
import { Link } from 'react-router-dom';
import store from '../store';

export default class Dashboard extends Component {

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
  			var c = 0;
  			const renderedCourses = store.getState().state.courses.map(function(course) {
  				c++; let icons = ["ic-handcuffs", "ic-book", "ic-olive", "ic-group", "ic-university", "ic-justice", "ic-flower", "ic-group-2", "ic-badge"]
  				return (<li key={course.id}><Link to={`/dashboard/create-test/${course.id}`}><div className="ball"><i className={icons[c-1]}></i></div><h2 className="title">{ course.title }</h2></Link></li>);
  			});
  			return (
		      	<div className="main-section">
			        <div className="card-wrap">
			          	<Card number={20} icon="ic-cards" title="Ongoing Tests" classNames="ongoing-card">
			            	<Link to="ongoing" className="card-button">
			            		<button className="alt">View Ongoing Tests <i className="ic-right"></i></button>
			            	</Link>
			          	</Card>

			          	<AnsweredStyle>
				            <p className="title">Most Answered</p>
				            <h2>Criminal Law</h2>
				            <span className="subtext">Year 2012</span>
			          	</AnsweredStyle>
			          	<AnsweredStyle>
				            <p className="title">Least Answered</p>
				            <h2>Criminal Law</h2>
				            <span className="subtext">Year 2012</span>
			          	</AnsweredStyle>
			        </div>

			        <div className="main-section__separator"></div>
			        <div className="test-courses">
		        		<h2 className="main-section__header">
		        			Create/Edit a Test
		        		</h2>
			        	<p className="main-section__sub-header">Choose a Course</p>
			        	<ul className="grid grid-5">
			        		{ renderedCourses }
			        	</ul>
			        </div>
			    </div>

		    );
  		}
  	}
  	componentWillMount() {

  	}
  	componentDidMount() {
  		if(store.getState().state.courses === undefined) {
  			this.loadCourses();
  		}else { this.setState({ loadComplete: true })}
  	}
}

const AnsweredStyle = styled.div`
width: 30%;
padding-left: 60px;
padding-top: 60px;
  .title {
    color: #4a4a4a;
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 14px;
  }

  .subtext {
    color: #9b9b9b;
  }
`;
