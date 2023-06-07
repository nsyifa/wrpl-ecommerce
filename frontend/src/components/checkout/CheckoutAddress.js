import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../styles/checkout.css";
import { updateCustomerAddress } from "../../services/checkout";
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    maxWidth: "500px",
    maxHeight: "220px",
    margin: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -120%)",
    padding: "20px",
    borderRadius: "10px",
  },
};
const CheckoutAddress = ({ user, handleAddressChange }) => {
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (user && user.address?.length > 0) {
      setAddress(user.address);
    }
  }, [user]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`Input value: ${inputValue}`);
    setAddress(inputValue);
    handleAddressChange(inputValue);
    const res = await updateCustomerAddress(user, inputValue);
    closeModal();
  }
  return (
    <div>
      <h2>Alamat</h2>
      {address ? (
        <div>
          <p>{address}</p>
          <button className="checkout-address-add-button" onClick={openModal}>
            Ubah Alamat
          </button>
        </div>
      ) : (
        <div>
          <p>Belum ada alamat yang terdaftar</p>
          <button className="checkout-address-add-button" onClick={openModal}>
            + Tambah Alamat Baru
          </button>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalStyles}
      >
        <h2 className="input-address-header">Enter your address:</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="checkout-address-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="input-address-button" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CheckoutAddress;
