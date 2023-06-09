import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import RegisterSuccessModal from "../components/RegisterSuccessModal";
import "../styles/register.css";

const Register = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAgreement: "",
  });
  const [termsAgreed, setTermsAgreed] = useState(false);

  const onInputChange = (e) => {
    const { id, value } = e.target;
    console.log(e);
    setInput((prev) => ({
      ...prev,
      [id]: value,
    }));
    validateInput(e);
  };

  const handleTermsAgreement = () => {
    setTermsAgreed(!termsAgreed);
  };

  const validateInput = (e) => {
    let { id, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [id]: "" };

      switch (id) {
        case "first_name":
          if (value.length <= 0) {
            stateObj[id] = "Please enter your name.";
          }
          break;

        case "last_name":
          if (value.length <= 0) {
            stateObj[id] = "Please enter your name.";
          }
          break;

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

        case "confirmPassword":
          if (!value) {
            stateObj[id] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[id] = "Password and Confirm Password does not match.";
          }
          break;

        case "termsAgreement":
          if (!termsAgreed) {
            stateObj[id] = "Please agree to the terms and services.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const latestCustomerFetch = () => {
    return axios.get("http://localhost:8081/api/customer/latest");
  };

  const addCustomer = async () => {
    console.log(input);

    const latestCustomer = await (await latestCustomerFetch()).data[0];

    console.log(latestCustomer);
    let cust_id = parseInt(latestCustomer.cust_id.replace("CT", "")) + 1;
    cust_id = "CT" + cust_id;
    const first_name = input.first_name;
    const last_name = input.last_name;
    const email = input.email;
    const phone = input.phone;
    const password = input.password;

    console.log(cust_id);

    axios
      .post("http://localhost:8081/api/customer/new", {
        cust_id: cust_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setShowSuccessModal(true);
        window.alert(
          "Successfully registered! Sign in to access your account."
        );
        window.location.href = "/login";
      });
  };

  const objectRef = useRef(null);

  useEffect(() => {
    const objectElement = objectRef.current;
    const objectPosition = objectElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const objectHeight = objectPosition.height;

    const scrollToPosition =
      objectPosition.top +
      window.pageYOffset -
      windowHeight / 2 +
      objectHeight / 2;

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="register-page">
      <img className="reglog-img-1" src="img/ecommerce/image1-reglog.png"></img>
      <img className="reglog-img-2" src="img/ecommerce/image2-reglog.png"></img>
      <img
        className="reglog-img-3"
        src="img/ecommerce/image3-reglog-2.png"
      ></img>
      <img className="reglog-img-4" src="img/ecommerce/image4-reglog.png"></img>
      <form onSubmit={handleSubmit} className="register-form" ref={objectRef}>
        <p className="register-title">Register</p>
        <div className="register-form__input-container">
          <label htmlFor="first_name" className="register-form__label">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            value={input.name}
            onChange={(e) => {
              onInputChange(e);
            }}
            onBlur={(e) => {
              validateInput(e);
            }}
            className="register-form__input"
          />
          {error.name && <span className="err">{error.name}</span>}
        </div>
        <div className="register-form__input-container">
          <label htmlFor="last_name" className="register-form__label">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            value={input.name}
            onChange={(e) => {
              onInputChange(e);
            }}
            onBlur={(e) => {
              validateInput(e);
            }}
            className="register-form__input"
          />
          {error.name && <span className="err">{error.name}</span>}
        </div>
        <div className="register-form__input-container">
          <label className="register-form__label" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={input.phone}
            onChange={(e) => {
              onInputChange(e);
            }}
            onBlur={(e) => {
              validateInput(e);
            }}
            className="register-form__input"
          />
          {error.phone && <span className="err">{error.phone}</span>}
        </div>
        <div className="register-form__input-container">
          <label htmlFor="email" className="register-form__label">
            Email
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
            Password
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
        <div className="register-form__input-container">
          <label htmlFor="confirm-password" className="register-form__label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={input.confirmPassword}
            onChange={(e) => {
              onInputChange(e);
            }}
            onBlur={(e) => {
              validateInput(e);
            }}
            className="register-form__input"
          />
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
        </div>
        <div className="register-form__input-container agreement">
          <label htmlFor="terms-agreement" className="register-form__label">
            <span className="check">
              <input
                type="checkbox"
                id="termsAgreement"
                checked={termsAgreed}
                onChange={handleTermsAgreement}
              />
            </span>
            I agree to the{" "}
            <a href="#" className="terms-of-service">
              terms of service
            </a>
            {error.termsAgreement && (
              <span className="err">{error.termsAgreement}</span>
            )}
          </label>
        </div>
        <button
          className="register-form__submit-button"
          type="submit"
          onClick={() => addCustomer()}
        >
          Register
        </button>
        <div className="already-account">
          Already have an account?{" "}
          <a href="/login" className="register-form__sign-in-link">
            Sign in
          </a>
        </div>
        <RegisterSuccessModal
          isOpen={showSuccessModal}
          onRequestClose={() => setShowSuccessModal(false)}
        />
      </form>
      <div className="footer-regist"></div>
    </div>
  );
};

export default Register;
