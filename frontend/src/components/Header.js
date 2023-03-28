import Navbar from "./Navbar";
import { Link } from "react-router-dom";
// import { logo } from "../../public/img/index";

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src="/img/4Kiddos.png" alt="logo"></img>
        </Link>
        <Navbar />
        <div className="profile">
          <Link to="register">
            <button className="reg">Register</button>
          </Link>
          <Link to="login">
            <button className="login">Log in</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
