import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              
             
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">Features</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">Follow Us</h2>
                <a
                  href="https://www.facebook.com/imthepremkumarshah"
                  className="pl-0 pr-3"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://www.instagram.com/dr._prem__prakash?igsh=aGw0dWp0eW9ucHM3"
                  className="pl-3 pr-3"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://youtube.com/@dr.premprakash?si=E-idqyuSrDL5HAAN"
                  className="pl-3 pr-3"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          </div>
          
        </div>
        <div className="row pt-5 mt-5">
          <div className="col-12 text-md-center text-left">
            <p>
              Copyright &copy; {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
