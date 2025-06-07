import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPhone,
  faEnvelope,
  faClock,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const QuickInfoSection: React.FC = () => {
  // Define styles for better visual appeal
  const styles = {
    section: {
      padding: "5rem 0",
      backgroundColor: "#f8fcff",
      position: "relative" as "relative",
      backgroundImage:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #f0f7fc 100%)",
      boxShadow: "0 -10px 20px -5px rgba(0, 0, 0, 0.05)",
    },
    sectionTitle: {
      fontSize: "2.2rem",
      fontWeight: "700",
      color: "#2d405f",
      marginBottom: "1rem",
      textAlign: "center" as "center",
    },
    sectionSubtitle: {
      fontSize: "1.1rem",
      color: "#5a6a85",
      maxWidth: "700px",
      margin: "0 auto 3rem auto",
      textAlign: "center" as "center",
    },
    divider: {
      width: "70px",
      height: "4px",
      background: "linear-gradient(to right, #3a9efd, #56b3ff)",
      borderRadius: "2px",
      margin: "0 auto 1.5rem auto",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    iconContainer: {
      backgroundColor: "#e9f5ff",
      minWidth: "65px",
      width: "65px",
      height: "65px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#3a9efd",
      fontSize: "1.5rem",
      transition: "all 0.5s ease",
      flexShrink: 0,
      boxShadow: "0 5px 15px rgba(58, 158, 253, 0.15)",
      marginRight: "1.5rem",
    },
    infoBox: {
      padding: "2rem",
      borderRadius: "12px",
      transition: "all 0.4s ease",
      cursor: "default",
      border: "1px solid transparent",
      backgroundColor: "#fff",
      boxShadow: "0 5px 30px rgba(0,0,0,0.07)",
      margin: "15px 0",
      height: "100%",
      display: "flex",
    },
    heading: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#2d405f",
      marginBottom: "0.8rem",
    },
    excerpt: {
      color: "#5a6a85",
      fontSize: "1rem",
      lineHeight: "1.6",
    },
    link: {
      color: "#3a9efd",
      textDecoration: "none",
      transition: "all 0.3s ease",
      fontWeight: "500",
      display: "inline-flex",
      alignItems: "center",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="block-quick-info-2" id="contact" style={styles.section}>
      <div className="container" style={styles.container}>
        <motion.div
          className="text-center mb-5"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h2 style={styles.sectionTitle}>Get In Touch</h2>
          <div style={styles.divider}></div>
          <p style={styles.sectionSubtitle}>
            Reach out to us for appointments, questions, or more information
            about our services
          </p>
        </motion.div>

        <motion.div
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
            <motion.div
              className="d-flex quick-info-2 flex-column"
              style={styles.infoBox}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                borderColor: "#e9f5ff",
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <div className="icon" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Our Location
                  </strong>
                </div>
              </div>
              <span className="excerpt mt-2" style={styles.excerpt}>
                Near Sunil Bose, Canal Road - Dehri 821307
              </span>
              <a
                href="https://maps.google.com/?q=Dehri+821307"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-3"
                style={styles.link}
              >
                View on map{" "}
                <FontAwesomeIcon icon={faAngleRight} className="ms-1" />
              </a>
            </motion.div>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
            <motion.div
              className="d-flex quick-info-2 flex-column"
              style={styles.infoBox}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                borderColor: "#e9f5ff",
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <div className="icon" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Call Us Today
                  </strong>
                </div>
              </div>
              <span className="excerpt mt-2" style={styles.excerpt}>
                <a href="tel:+917004119766" style={styles.link}>
                  +917004119766
                </a>
              </span>
              <a
                href="tel:+917004119766"
                className="mt-auto pt-3"
                style={styles.link}
              >
                Call now{" "}
                <FontAwesomeIcon icon={faAngleRight} className="ms-1" />
              </a>
            </motion.div>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
            <motion.div
              className="d-flex quick-info-2 flex-column"
              style={styles.infoBox}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                borderColor: "#e9f5ff",
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <div className="icon" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Email Us
                  </strong>
                </div>
              </div>
              <span className="excerpt mt-2" style={styles.excerpt}>
                <a
                  href="mailto:Samarthclinic.info@gmail.com"
                  style={styles.link}
                >
                  Samarthclinic.info@gmail.com
                </a>
              </span>
              <a
                href="mailto:Samarthclinic.info@gmail.com"
                className="mt-auto pt-3"
                style={styles.link}
              >
                Send message{" "}
                <FontAwesomeIcon icon={faAngleRight} className="ms-1" />
              </a>
            </motion.div>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
            <motion.div
              className="d-flex quick-info-2 flex-column"
              style={styles.infoBox}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                borderColor: "#e9f5ff",
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <div className="icon" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    Opening Hours
                  </strong>
                </div>
              </div>
              <span className="excerpt mt-2" style={styles.excerpt}>
                Mon-Sun 10:00 AM - 08:00 PM
              </span>
              <a
                href="#appointments"
                className="mt-auto pt-3"
                style={styles.link}
              >
                Book appointment{" "}
                <FontAwesomeIcon icon={faAngleRight} className="ms-1" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickInfoSection;
