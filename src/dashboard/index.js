import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import Modal from '../components/Modal';
import Header from '../components/Header';
import { Content, SendInvite } from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Nav from '../components/Nav';
import Tests from './Tests';
import OngoingTests from './OngoingTests';
import CreateTest from './CreateTest';
import store from '../store';

export default class Dashboard extends Component {
  state = {
    showModal: true,
    showDoneModal: false
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      showDoneModal: false
    });
  };
  render() {
  	const nav = [
  		{ url: "", title: "Home", icon: "fa-home" },
  		{ url: "tests", title: "Tests", icon: "fa-file-alt" },
  		{ url: "flashcards", title: "Flashcards", icon: "fa-sticky-note" },
  		{ separator: true },
  		{ url: "payments", title: "Payments", icon: "fa-credit-card" },
  		{ url: "users", title: "All Users", icon: "fa-user" }
  	]
  	if(!store.getState().state.session.active) { return (<Redirect to="/"/>); }
    return (
      <div>
        <Header />
        <Content>
          <div className="navigation">
            <Nav items={ nav } url={this.props.match.url}/>
          </div>

          <Route
            exact
            path="/dashboard"
            render={() => (
              <div className="main-section">
                <Modal
                  closeModal={this.onCloseModal}
                  visible={this.state.showModal}>
                  <SendInvite>
                    <h4 className="header">Invite users</h4>
                    <span className="subtext">
                      Enter an Email Address to Continue
                    </span>
                    <input className="textbox" placeholder="Email Address" />
                    <button
                      onClick={() =>
                        this.setState({ showDoneModal: true, showModal: false })
                      }
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
                    <h4 className="header uppercase">
                      Invite more users to use lawyr
                    </h4>
                    <span className="subtext">
                      Enter another Email Address to Continue
                    </span>
                    <div className="input-wrap">
                      <input className="textbox" placeholder="Email Address" />
                      <div type="button" className="input-wrap__btn">
                        <i className="fas fa-plus" />
                      </div>
                    </div>
                    <span className="invite-sent">
                      Invitation Email to user@devcenter.co sent{' '}
                    </span>
                  </SendInvite>
                </Modal>
                <h2 className="main-section__header">Overview</h2>
                <div className="card-wrap">
                  <Card
                    bg="invert"
                    icon="address-card"
                    number={3600}
                    title="signed up users"
                  >
                    <Button
                      onClick={() => this.setState({ showModal: true })}
                      color="#000"
                      text="Invite Users"
                      bg="#50e3c2"
                    />
                  </Card>
                  <Card icon="users" number={400} title="Active users">
                    <Button text="View Ongoing Tests" bg="#1c2d41" />
                  </Card>
                  <Card icon="file-alt" number={1000} title="Paid users">
                    <Button text="View purchases" bg="#1c2d41" />
                  </Card>
                </div>

                <div className="main-section__separator" />

                <h2 className="main-section__header">Content</h2>
                <div className="card-wrap">
                  <FlashCard>
                    <p className="flashcard__text">Create a Flash card</p>
                    <span className="flashcard__icon">
                      <i className="fas fa-arrow-right fa-lg" />
                    </span>
                  </FlashCard>
                  <FlashCard>
                    <p className="flashcard__text">Create a Test</p>
                    <span className="flashcard__icon">
                      <i className="fas fa-arrow-right fa-lg" />
                    </span>
                  </FlashCard>
                  <div className="quick-links">
                    <p className="quick-links__header">quick links</p>
                    <p className="quick-links__link">
                      <span>Edit Flashcards</span>
                      <span>
                        <i className="fas fa-arrow-right" />
                      </span>
                    </p>
                    <p className="quick-links__link">
                      <span>Edit Courses</span>
                      <span>
                        <i className="fas fa-arrow-right" />
                      </span>
                    </p>
                  </div>
                </div>

                <div className="main-section__separator" />

                <div className="invite-users">
                  <h2 className="invite-users__header">Invite users</h2>
                  <div className="invite-users__input-wrap">
                    <input />
                    <button>invite</button>
                  </div>
                  <p className="invite-users__link">
                    <a href="/">GO TO USERS PAGE</a>
                  </p>
                </div>
              </div>
            )}
          />
          <Route path={`${this.props.match.url}/tests`} component={Tests} />
          <Route
            path={`${this.props.match.url}/ongoing`}
            component={OngoingTests}
          />
          <Route path={`${this.props.match.url}/create-test`} component={CreateTest} />
        </Content>
      </div>
    );
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
  }
`;
