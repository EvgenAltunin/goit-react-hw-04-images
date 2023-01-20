import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { Backdrop, ModalWindow } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleEscPress);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleEscPress);
  }

  handleModalClose() {
    const { onClose } = this.props;
    onClose();
  }

  handleEscPress = event => {
    if (event.code === 'Escape') {
      this.handleModalClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.handleModalClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalWindow>{children}</ModalWindow>
      </Backdrop>,
      modalRoot
    );
  }
}
