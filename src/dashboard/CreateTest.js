import React, { Component } from 'react';
import Modal from '../components/Modal';

export default class CreateTest extends Component {
	state = { showUploadModal: false }
	render() {
		return(
			<div className="main-section">
				<section className="create-test">
					<span className="back-arrow">
					  	<i className="fas fa-arrow-left fa-lg" />
					</span>
					<h1 className="heading">Hello World</h1>
					<ul className="grid grid-2">
						<li>
							<a href="" className="no-decoration" onClick={(e) => { e.preventDefault(); this.setState({ showUploadModal: true })}}>
								<div className="top-action">
									<div className="title">Create a New Test</div>
									<div className="subtitle">UPLOAD EXCEL (.xls) FILE</div>
								</div>
							</a>
						</li>
						<li>
							<div className="right-action">
								<span> Displaying 7 of 7 Tests</span>
								<div>
									<div className="title">Sort by:</div>
									<select>
										<option value="">Date Created</option>
										<option value="">Times Taken</option>
										<option value="">Year</option>
									</select>
								</div>
							</div>
						</li>
					</ul>
					<br/><br/>
					<div>Click a test to View & Edit</div><br/>
					<div className="table test-list">
						<ul className="grid grid-5 thead">
							<li>NAME</li><li>YEAR</li><li>CREATED</li><li>EDITED</li><li>TIMES TAKEN</li>
						</ul>
						<div className="tbody">
							<ul className="grid grid-5"><li>Criminal Law</li><li>2012</li><li>22-Nov-2018</li><li>22-Nov-2018</li><li><b>57</b></li></ul>
							<ul className="grid grid-5"><li>Criminal Law</li><li>2012</li><li>22-Nov-2018</li><li>22-Nov-2018</li><li><b>57</b></li></ul>
						</div>
					</div>
				</section>

				<Modal visible={this.state.showUploadModal} closeModal={() => this.setState({showUploadModal: false})}>


					<h1>Hello World</h1>
				</Modal>
			</div>
		);
	}
}