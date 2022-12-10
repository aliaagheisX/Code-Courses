import React from 'react'
import Modal from 'react-bootstrap/Modal';

import Login from './Login';
import Logout from './Logout';
import Signup from './Signup'

export default function FormModel({ show, onHide, type }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='xs'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Body>
        {
          type === 'login' ? <Login />
            : type === 'signup' ? <Signup /> : <Logout />}
      </Modal.Body>

    </Modal>
  )
}