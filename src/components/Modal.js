import React, { Component } from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

const Modal = styled.div`
  background: #ffffff;
  border-radius: 3px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1050;
  transition: opacity 300ms ease-in-out;
  opacity: ${props =>
    props.state === 'entering' ? '0' : props.state === 'entered' ? '1' : '0'};
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  z-index: 1050;
  padding: 30px;
  width: 40%;
  top: 50%;
  left: 50%;
  margin: 0;
  background-color: white;
  border-radius: 4px;
  transition: all 0.3s ease;
  max-height: 90vh;
`;

export default class ModalComponent extends Component {
  state = {
    visible: this.props.visible
  };

  open() {
    this.setState({
      visible: true
    });
  }

  close() {
    this.setState({
      visible: false
    });
  }

  handleClick = e => {
    console.dir(e.target);
    if (e.target.dataset.name === 'modal') {
      this.props.closeModal();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.visible === nextProps.visible) return;

    this.setState({
      visible: nextProps.visible
    });
  }

  render() {
    let { children } = this.props;
    return (
      <Transition
        in={this.state.visible}
        timeout={100}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {state => (
          <Modal state={state} data-name="modal" onClick={this.handleClick}>
            <Content>{children}</Content>
          </Modal>
        )}
      </Transition>
    );
  }
}
