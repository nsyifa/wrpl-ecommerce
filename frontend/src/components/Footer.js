import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="row-1">
            <div className="col1">
              <img className = "footer-logo" src="img/ecommerce/logo-blue.svg"/>
            </div>
            <div className="col2">
              <p>Help you get the look that you always dream of</p>
            </div>
            {/* <div className="col3 list-socmed">
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
            </div> */}
          </div>
          <div className="row-2">
            <div className="col-1">
              <h4 className="subtitle">Information</h4>
              <ul className="list-unstyled information">
                <li>
                  <a href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-2">
              <h4 className="subtitle">Shop by Category</h4>
              <ul className="list-unstyled information">
                <li>
                  <a href="#">
                    Perfumes
                  </a>
                </li>
                <li>
                  <a href="#">
                    Cosmetics
                  </a>
                </li>
                <li>
                  <a href="#">
                    Clothes
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <h4 className="subtitle">Shop by Brands</h4>
              <ul className="list-unstyled information">
                <li>
                  <a href="#">
                    Effe
                  </a>
                </li>
                <li>
                  <a href="#">
                    Lumiere
                  </a>
                </li>
                <li>
                  <a href="#">
                    Zalya
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row-3">
            <p>Made with ♡ by Pluto team</p>
            <ul className="member-team">
              <li>Nasywa</li>
              <li>Maeve</li>
              <li>Safira</li>
              <li>Venus</li>
              <li>Coveeta</li>
              <li>Vincent</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
