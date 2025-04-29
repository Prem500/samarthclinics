import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const QuickInfoSection: React.FC = () => {
  // Define styles for better visual appeal
  const styles = {
    section: {
      padding: "3rem 0",
      backgroundColor: "#f0f7fc",
      borderBottom: "1px solid #e1edf7",
      marginTop: "-30px",
      zIndex: 10,
      position: "relative" as "relative",
    },
    container: {
      boxShadow: "0 5px 25px rgba(0,0,0,0.07)",
      borderRadius: "12px",
      padding: "1.8rem",
      backgroundColor: "#fff",
    },
    iconContainer: {
      backgroundColor: "#e9f5ff",
      minWidth: "55px",
      width: "55px",
      height: "55px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#3a9efd",
      fontSize: "1.3rem",
      transition: "all 0.3s ease",
      flexShrink: 0,
      boxShadow: "0 3px 10px rgba(58, 158, 253, 0.15)",
    },
    infoBox: {
      padding: "1rem",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      cursor: "default",
      border: "1px solid transparent",
    },
    heading: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#2d405f",
      marginBottom: "0.5rem",
    },
    excerpt: {
      color: "#5a6a85",
      fontSize: "0.95rem",
    },
    link: {
      color: "#3a9efd",
      textDecoration: "none",
      transition: "all 0.3s ease",
      fontWeight: "500",
    },
  };

  return (
    <div className="block-quick-info-2" style={styles.section}>
      <div className="container" style={styles.container}>
        <div className="block-quick-info-2-inner">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.backgroundColor = "#f9fbff";
                  e.currentTarget.style.border = "1px solid #e9f5ff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                }}
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Our Location
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    Near Sunil Bose, Canal Road - Dehri 821307
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.backgroundColor = "#f9fbff";
                  e.currentTarget.style.border = "1px solid #e9f5ff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                }}
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Call Us Today
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    <a
                      href="tel:+917004119766"
                      style={styles.link}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = "#0071e3";
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = "#3a9efd";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      +917004119766
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.backgroundColor = "#f9fbff";
                  e.currentTarget.style.border = "1px solid #e9f5ff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                }}
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Send Us a Message
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    <a
                      href="mailto:Samarthclinic.info@gmail.com"
                      style={styles.link}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = "#0071e3";
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = "#3a9efd";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      Samarthclinic.info@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.backgroundColor = "#f9fbff";
                  e.currentTarget.style.border = "1px solid #e9f5ff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                }}
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Opening Hours
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    Mon-Sat 10:00 AM - 06:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInfoSection;
