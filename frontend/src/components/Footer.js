import React from "react";
// import circle from "/img/landing-page/Ellipse 3.png";
// import wave from "/img/landing-page/footer.png";
// import logo from "/img/landing-page/Group 1.png";
// import wave2 from "/img/landing-page/Rectangle 29.png";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <img className="wave-footer" src="/img/landing-page/Rectangle 29.png" />
      <img className="logo-circle" src="/img/landing-page/Ellipse 3.png" />
      <img className="logo-shortened" src="/img/landing-page/Group 1.png" />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac
              ante at ante vehicula hendrerit sed non magna.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li>
                <i className="fa fa-map-marker"></i> 123 Main Street, New York,
                NY 10001
              </li>
              <li>
                <i className="fa fa-phone"></i> (123) 456-7890
              </li>
              <li>
                <i className="fa fa-envelope"></i> info@example.com
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#">
                  <i className="fa fa-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-instagram"></i> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
