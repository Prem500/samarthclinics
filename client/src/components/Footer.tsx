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
                <h2 className="footer-heading mb-4">त्वरित लिंक</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">हमारे बारे में</a>
                  </li>
                  <li>
                    <a href="#">सेवाएं</a>
                  </li>
                  <li>
                    <a href="#">प्रशंसापत्र</a>
                  </li>
                  <li>
                    <a href="#">संपर्क करें</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">उत्पाद</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">हमारे बारे में</a>
                  </li>
                  <li>
                    <a href="#">सेवाएं</a>
                  </li>
                  <li>
                    <a href="#">प्रशंसापत्र</a>
                  </li>
                  <li>
                    <a href="#">संपर्क करें</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">विशेषताएं</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">हमारे बारे में</a>
                  </li>
                  <li>
                    <a href="#">सेवाएं</a>
                  </li>
                  <li>
                    <a href="#">प्रशंसापत्र</a>
                  </li>
                  <li>
                    <a href="#">संपर्क करें</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">हमें अनुसरण करें</h2>
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
          <div className="col-lg-3">
            <h2 className="footer-heading mb-4">न्यूज़लेटर सदस्यता</h2>
            <p>हमारी मासिक सेवाओं की सदस्यता लें</p>
            <form action="#" method="post" className="subscription">
              <div className="input-group mb-3 d-flex align-items-stretch">
                <input
                  type="text"
                  className="form-control bg-transparent"
                  placeholder="ईमेल दर्ज करें"
                  aria-label="ईमेल दर्ज करें"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-primary text-white"
                  type="button"
                  id="button-addon2"
                >
                  भेजें
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row pt-5 mt-5">
          <div className="col-12 text-md-center text-left">
            <p>
              कॉपीराइट &copy; {new Date().getFullYear()} सभी अधिकार सुरक्षित
              हैं।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
