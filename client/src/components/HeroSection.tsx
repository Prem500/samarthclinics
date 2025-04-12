import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { isAuthenticated } from "@/lib/authUtils";

interface HeroSectionProps {
  authenticated: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ authenticated }) => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(authenticated);

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated());
  }, []);

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
        backgroundImage: "url(/images/hero_bg_11.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh",
      }}
      data-aos="fade"
    >
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center justify-content-center text-center min-vh-75 d-flex">
          <div className="col-md-10">
            <div className="row justify-content-center mb-5">
              <div className="col-md-10 text-center">
                <h1
                  data-aos="fade-up"
                  className="mb-5 display-4 fw-bold text-white"
                  style={{
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                    letterSpacing: "0.5px",
                  }}
                >
                  हम समाधान देते हैं आपके{" "}
                  <span
                    className="text-pink-400"
                    ref={typedRef}
                    style={{
                      color: "#ff6b6b",
                      fontWeight: "bold",
                      textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                    }}
                  ></span>
                </h1>
                <div
                  className="d-flex justify-content-center flex-wrap gap-3"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <button
                    onClick={scrollToAppointments}
                    className="btn btn-primary btn-lg rounded-pill px-4 py-3 shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #4e73df 0%, #224abe 100%)",
                      border: "none",
                      transition: "all 0.3s ease",
                      fontWeight: "600",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateY(-3px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    खूद अपॉइंटमेंट बुक करें
                  </button>
                  <a
                    href="upi://pay?pa=akkiathletic@ybl"
                    className="btn btn-success btn-lg rounded-pill px-4 py-3 shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #2dce89 0%, #1fa173 100%)",
                      border: "none",
                      transition: "all 0.3s ease",
                      fontWeight: "600",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateY(-3px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    भुगतान करें
                  </a>
                  <a
                    href="https://wa.me/+917004119766?text=नमस्कार डॉक्टर साहब, हमको आपके पास इलाज करवाना है!"
                    className="btn btn-light btn-lg rounded-pill px-4 py-3 shadow-sm d-flex align-items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "#25D366",
                      color: "white",
                      border: "none",
                      transition: "all 0.3s ease",
                      fontWeight: "600",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateY(-3px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      style={{ fontSize: "24px", marginRight: "8px" }}
                    />
                    वॉट्सएप पर बात करें
                  </a>
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
