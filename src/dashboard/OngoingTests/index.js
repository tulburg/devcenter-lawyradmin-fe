import React from 'react';
import styled from 'styled-components';
import TestCard from '../../components/TestCard';

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
            test="Criminal Law"
            start_time="10:00 AM"
            year={2012}
            participants={6}
          />
          <TestCard
            test="Criminal Law"
            start_time="10:00 AM"
            year={2012}
            participants={6}
          />
          <TestCard
            test="Criminal Law"
            start_time="10:00 AM"
            year={2012}
            participants={6}
          />
          <TestCard
            test="Criminal Law"
            start_time="10:00 AM"
            year={2012}
            participants={6}
          />
          <TestCard
            test="Criminal Law"
            start_time="10:00 AM"
            year={2012}
            participants={6}
          />
          <TestCard
            test="Criminal Law"
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
          <TestCard test="Criminal Law" start_time="10:00 AM" year={2012} />
          <TestCard test="Criminal Law" start_time="10:00 AM" year={2012} />
          <TestCard test="Criminal Law" start_time="10:00 AM" year={2012} />
          <TestCard test="Criminal Law" start_time="10:00 AM" year={2012} />
          <TestCard test="Criminal Law" start_time="10:00 AM" year={2012} />
          <TestCard test="Criminal Law" start_time="10:00 AM" year={2012} />
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
			<section class="ongoing-test">
				<span className="back-arrow" onClick={() => window.history.go(-1) }>
				  	<i className="ic-back" />
				</span>
				<h1 className="heading">Ongoing Tests</h1>
		        <OTContent>
		          <div className="test-tab">
		            <p
		              onClick={this.showIndividualTests}
		              className={`tab-item ${individual ? 'active' : ''}`}
		            >
		              individual tests
		            </p>
		            <p
		              onClick={this.showGroupTests}
		              className={`tab-item ${group ? 'active' : ''}`}
		            >
		              group tests
		            </p>
		          </div>
		          {/* <div className="card-wrap">
		            <TestCard
		              test="Criminal Law"
		              start_time="10:00 AM"
		              year={2012}
		              participants={6}
		            />
		            <TestCard
		              test="Criminal Law"
		              start_time="10:00 AM"
		              year={2012}
		              participants={6}
		            />
		            <TestCard
		              test="Criminal Law"
		              start_time="10:00 AM"
		              year={2012}
		              participants={6}
		            />
		            <TestCard
		              test="Criminal Law"
		              start_time="10:00 AM"
		              year={2012}
		              participants={6}
		            />
		            <TestCard
		              test="Criminal Law"
		              start_time="10:00 AM"
		              year={2012}
		              participants={6}
		            />
		            <TestCard
		              test="Criminal Law"
		              start_time="10:00 AM"
		              year={2012}
		              participants={6}
		            />
		          </div> */}
		          {this.renderCategory()}
		        </OTContent>
			</section>
      </div>
    );
  }
}

const OTContent = styled.div`
  .test-tab {
    display: flex;
    border-bottom: 1px solid #979797;
    padding-left: 10px;
    width: 40%;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .card-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .tab-item {
    color: #1c2d41;
    text-transform: capitalize;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 6px solid transparent;
    padding-bottom: 11px; 
    padding: 10px 20px;

    &.active {
      border-bottom-color: #50e3c2;
    }

    &:hover {
      border-bottom-color: #50e3c2;
      cursor: pointer;
    }
  }
`;

export default OngoingTests;
