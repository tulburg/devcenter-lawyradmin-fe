import React from "react";
import TestCard from "../../components/TestCard";

class OngoingTests extends React.Component {
	state = {
		group: true,
		individual: false
	};

	renderCategory() {
		if (this.state.group) {
			return (
				<div className="card-wrap">
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
						participants={6}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
						participants={6}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
						participants={6}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
						participants={6}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
						participants={6}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
						participants={6}
					/>
				</div>
			);
		}

		if (this.state.individual) {
			return (
				<div className="card-wrap">
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
					/>
					<TestCard
						test="Criminal Litigation"
						start_time="10:00 AM"
						year={2012}
					/>
				</div>
			);
		}
	}

	showIndividualTests = () =>
		this.setState({
			group: false,
			individual: true
		});

	showGroupTests = () =>
		this.setState({
			group: true,
			individual: false
		});

	render() {
		const { group, individual } = this.state;
		return (
			<div className="main-section">
				<section className="ongoing-test">
					<span
						className="back-arrow"
						onClick={() => window.history.go(-1)}
					>
						<i className="ic-back" />
					</span>
					<h1 className="heading">Ongoing Tests</h1>
					<div>
						<div className="test-tab">
							<p
								onClick={this.showIndividualTests}
								className={`tab-item ${
									individual ? "active" : ""
								}`}
							>
								individual tests
							</p>
							<p
								onClick={this.showGroupTests}
								className={`tab-item ${group ? "active" : ""}`}
							>
								group tests
							</p>
						</div>
						{/* <div className="card-wrap">
								<TestCard
									test="Criminal Litigation"
									start_time="10:00 AM"
									year={2012}
									participants={6}
								/>
								<TestCard
									test="Criminal Litigation"
									start_time="10:00 AM"
									year={2012}
									participants={6}
								/>
								<TestCard
									test="Criminal Litigation"
									start_time="10:00 AM"
									year={2012}
									participants={6}
								/>
								<TestCard
									test="Criminal Litigation"
									start_time="10:00 AM"
									year={2012}
									participants={6}
								/>
								<TestCard
									test="Criminal Litigation"
									start_time="10:00 AM"
									year={2012}
									participants={6}
								/>
								<TestCard
									test="Criminal Litigation"
									start_time="10:00 AM"
									year={2012}
									participants={6}
								/>
							</div> */}
						{this.renderCategory()}
					</div>
				</section>
			</div>
		);
	}
}

export default OngoingTests;
