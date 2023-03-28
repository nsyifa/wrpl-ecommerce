import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";

const Login = ({ updateUser }) => {
  const [customer, setCustomer] = useState();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { id, value } = e.target;
    console.log(e);
    setInput((prev) => ({
      ...prev,
      [id]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { id, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [id]: "" };

      switch (id) {
        case "password":
          if (!value) {
            stateObj[id] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;
      }

      return stateObj;
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const customerFetchByEmail = async (email) => {
    const response = await axios.get(
      `http://localhost:8080/api/data/customers/email/:${email}`,
      {
        params: {
          email: email,
        },
      }
    );
    console.log(response.data);
    setCustomer(response.data[0][0]);
    return response.data;
  };

  const verifyCustomer = async () => {
    console.log(input);

    const email = input.email;
    const password = input.password;
    await customerFetchByEmail(email);
    if (customer) {
      if (customer.password === password) {
        updateUser(customer);
        localStorage.setItem("user", customer);
        console.log("HEYHO", customer);
      } else {
        console.log("not success");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="register-form__input-container">
        <label htmlFor="email" className="register-form__label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={input.email}
          onChange={(e) => {
            onInputChange(e);
          }}
          onBlur={(e) => {
            validateInput(e);
          }}
          className="register-form__input"
        />
        {error.email && <span className="err">{error.email}</span>}
      </div>
      <div className="register-form__input-container">
        <label htmlFor="password" className="register-form__label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={input.password}
          onChange={(e) => {
            onInputChange(e);
          }}
          onBlur={(e) => {
            validateInput(e);
          }}
          className="register-form__input"
        />
        {error.password && <span className="err">{error.password}</span>}
      </div>
      <button
        className="register-form__submit-button"
        type="submit"
        onClick={() => verifyCustomer()}
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;
