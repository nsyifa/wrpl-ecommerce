import Navbar from "./Navbar";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
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
            <img src="/img/ecommerce/icon-cart.svg" className = "cart-icon" />
          </Link>

          <button className="login" onClick={handleLogout}>
            Sign out
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
            <button className="login">Sign in</button>
          </Link>
        </React.Fragment>
      );
    }
  };
  return (
    <header>
      <div className="nav-area">
        <div className = "upper-nav-area">
          <Link to="/" className="logo">
            <img src="/img/ecommerce/logo.png" alt="logo"></img>
          </Link>
          <div className = "search-bar-wrapper">
            <SearchBar></SearchBar>
          </div>
          <div className="profile">
            {userButton()}
          </div>
        </div>
        <Navbar />
        
      </div>
    </header>
  );
};

export default Header;
