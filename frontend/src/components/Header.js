import Navbar from "./Navbar";
import React from "react";
import { Link } from "react-router-dom";
// import { logo } from "../../public/img/index";

const Header = ({ user, updateUser }) => {
  const handleLogout = () => {
    updateUser({});
    localStorage.clear();
    window.location.reload(false);
  };
  const userButton = () => {
    if (user.cust_name) {
      console.log(user);
      return (
        <React.Fragment>
          <Link to="cart">
            <img src="/icons/header_cart.svg" />
          </Link>

          <button className="login" onClick={handleLogout}>
            Log out
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="register">
            <button className="reg">Register</button>
          </Link>
          <Link to="login">
            <button className="login">Log in</button>
          </Link>
        </React.Fragment>
      );
    }
  };
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src="/img/4Kiddos.png" alt="logo"></img>
        </Link>
        <Navbar />
        <div className="profile">
          {/* <Link to="register">
            <button className="reg">Register</button>
          </Link>
          <Link to="login">
            <button className="login">Log in</button>
          </Link> */}
          {userButton()}
        </div>
      </div>
    </header>
  );
};

export default Header;
