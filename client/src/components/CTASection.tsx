import React from "react";

const CTASection: React.FC = () => {
  return (
    <div
      className="mt-5 block-cta-1 primary-overlay"
      style={{ backgroundImage: "url('images/hero_bg_22.webp')" }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h2 className="mb-3 mt-0 text-white">
              पहले आने वालों के लिए 30% तक की छूट
            </h2>
            <p className="mb-0 text-white lead">यूहू!</p>
          </div>
          <div className="col-lg-4">
            <p className="mb-0">
              {" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSffoTrMEMzFGiZF8QtC4zgejMu7LZ-0nlj7MUa1MlK7j5p5jA/viewform?embedded=true"
                className="btn btn-outline-white text-white btn-md btn-pill px-5 font-weight-bold btn-block universal-button"
              >
                संपर्क करें
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
