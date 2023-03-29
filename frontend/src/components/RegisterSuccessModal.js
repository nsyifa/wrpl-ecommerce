import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");

function RegisterSuccessModal({ isOpen, onRequestClose }) {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  // close modal when onRequestClose is called
  const handleCloseModal = () => {
    setModalIsOpen(false);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Success Modal"
    >
      <h2>Registration Successful!</h2>
      <p>You have successfully registered.</p>
      <Link to="login">
        <button className="login">Go to Login Page</button>
      </Link>
    </Modal>
  );
}

export default RegisterSuccessModal;
