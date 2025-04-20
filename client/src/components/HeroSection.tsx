import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const HeroSection: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    // Initialize Typed.js
    if (typedRef.current) {
      typed.current = new Typed(typedRef.current, {
        strings: [
          "सालों पुराने दर्द",
          "सालों पुराने तनाव",
          "सालों पुराने थकान",
          "लाइलाज बिमारी",
        ],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 4000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
      });
    }

    // Cleanup
    return () => {
      typed.current?.destroy();
    };
  }, []);

  const scrollToAppointments = () => {
    const appointmentsSection = document.getElementById("appointments");
    if (appointmentsSection) {
      appointmentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="site-blocks-cover position-relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(28, 50, 93, 0.75), rgba(28, 50, 93, 0.65)), url(/images/img_111.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        minHeight: "90vh",
        width: "100%",
        overflow: "hidden",
      }}
      data-aos="fade"
    >
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div
          className="row align-items-center min-vh-75"
          style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
        >
          <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">
            <span
              className="badge mb-3 text-uppercase fw-medium d-inline-block"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                color: "white",
                backdropFilter: "blur(4px)",
                padding: "8px 16px",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                borderRadius: "30px",
              }}
              data-aos="fade-down"
            >
              समस्त नेरो मस्कुलोस्केलेटल विकारों के लिए
            </span>
            <h1
              data-aos="fade-up"
              className="mb-4 fw-bold text-white"
              style={{
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                letterSpacing: "0.5px",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
              }}
            >
              हम समाधान देते हैं आपके{" "}
              <span
                className="typed-text"
                ref={typedRef}
                style={{
                  color: "#56b3ff",
                  fontWeight: "bold",
                  position: "relative",
                  background: "linear-gradient(120deg, #56b3ff, #82d9ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none",
                }}
              ></span>
            </h1>

            <p
              className="lead text-white mb-5"
              style={{
                maxWidth: "700px",
                margin: "0 auto 2.5rem auto",
                opacity: "0.9",
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: "1.6",
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              उच्च गुणवत्ता वाली विशेषज्ञ फिजियोथेरेपी और पुनर्वास सेवाएँ प्रदान
              कर आपके जीवन की गुणवत्ता में सुधार लाना
            </p>

            <div
              className="d-flex justify-content-center flex-wrap gap-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button
                onClick={scrollToAppointments}
                className="btn btn-primary btn-lg px-4 py-2 py-md-3 shadow rounded-pill"
                style={{
                  background:
                    "linear-gradient(135deg, #3a9efd 0%, #0071e3 100%)",
                  border: "none",
                  transition: "all 0.3s ease",
                  fontWeight: "600",
                  boxShadow: "0 7px 15px rgba(0, 113, 227, 0.25)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0, 113, 227, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 7px 15px rgba(0, 113, 227, 0.25)";
                }}
              >
                <i className="fa fa-calendar-check-o me-2"></i> खूद अपॉइंटमेंट
                बुक करें
              </button>
              <a
                href="upi://pay?pa=akkiathletic@ybl"
                className="btn btn-outline-light btn-lg px-4 py-2 py-md-3 rounded-pill"
                style={{
                  borderWidth: "2px",
                  transition: "all 0.3s ease",
                  fontWeight: "600",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <i className="fa fa-credit-card me-2"></i> भुगतान करें
              </a>
            </div>

            {/* Feature pills - visible on all devices */}
            <div className="row mt-5" data-aos="fade-up" data-aos-delay="300">
              <div className="col-md-4 mb-3">
                <div
                  className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm p-3 rounded-pill d-flex align-items-center justify-content-center"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                >
                  <i className="fa fa-certificate me-2 text-white"></i>
                  <span className="text-white fw-medium">
                    प्रमाणित विशेषज्ञ
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div
                  className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm p-3 rounded-pill d-flex align-items-center justify-content-center"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                >
                  <i className="fa fa-clock me-2 text-white"></i>
                  <span className="text-white fw-medium">शीघ्र आराम</span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div
                  className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm p-3 rounded-pill d-flex align-items-center justify-content-center"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                >
                  <i className="fa fa-hand-holding-medical me-2 text-white"></i>
                  <span className="text-white fw-medium">व्यक्तिगत देखभाल</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
