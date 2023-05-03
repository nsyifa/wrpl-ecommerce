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
const PaymentAddress = ({ user }) => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (user && user.address?.length > 0) {
      setAddress(user.address);
      setName(user.cust_name);
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
    const res = await updateCustomerAddress(user, inputValue);
    closeModal();
  }
  return (
    <div>
      <h3>Address</h3>
      <p>{name}</p>
      <p>{address}</p>
    </div>
  );
};

export default PaymentAddress;
