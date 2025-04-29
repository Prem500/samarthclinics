import React from "react";

const HeroSection: React.FC = () => {
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
          "linear-gradient(rgba(28, 50, 93, 0.75), rgba(28, 50, 93, 0.65)), url(/images/hero-2.jpg)",
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
            <h1
              data-aos="fade-up"
              className="mb-4 fw-bold text-white"
              style={{
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                letterSpacing: "0.5px",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                marginBottom: "2.5rem",
              }}
            >
              Best physiotherapy clinic in Dehri
            </h1>

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
                <i className="fa fa-calendar-check-o me-2"></i> Book Appointment
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
                <i className="fa fa-credit-card me-2"></i> Make Payment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
