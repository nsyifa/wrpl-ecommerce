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
          <button className="reg">Register</button>
          <button className="login">Log in</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
