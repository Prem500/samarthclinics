import React from "react";
import { useCounter } from "@/hooks/useCounter";

const WhyChooseUsSection: React.FC = () => {
  // Initialize counters
  const customersCounter = useCounter(1500);
  const yearsCounter = useCounter(2);
  const satisfactionCounter = useCounter(100);

  return (
    <div id="blog" className="block-half-content-1 d-block d-lg-flex mt-5">
      <div
        className="block-half-content-img"
        style={{ backgroundImage: "url('images/hero_bg_11.webp')" }}
      ></div>
      <div className="block-half-content-text bg-primary">
        <div className="block-half-content-text-inner">
          <h2 className="block-half-content-heading mb-4">Why Choose Us</h2>
          <div className="block-half-content-excerpt">
            <p className="lead">
              Choose us for expert physiotherapy, chiropractic, and alignment
              services, where personalized care, a holistic approach, and
              cutting-edge techniques ensure your well-being and pain relief.
            </p>
          </div>
        </div>

        <div className="block-counter-1 section-counter">
          <div className="row">
            <div className="col-sm-4">
              <div className="counter">
                <div className="number-wrap">
                  <span
                    className="block-counter-1-number"
                    data-number="200"
                    ref={customersCounter.countRef}
                  >
                    {customersCounter.count}
                  </span>
                  <span className="append"></span>
                </div>
                <span className="block-counter-1-caption">Happy Clients</span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="counter">
                <div className="number-wrap">
                  <span
                    className="block-counter-1-number"
                    data-number="2"
                    ref={yearsCounter.countRef}
                  >
                    {yearsCounter.count}
                  </span>
                  <span className="append"></span>
                </div>
                <span className="block-counter-1-caption">
                  Years of Experience
                </span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="counter">
                <div className="number-wrap">
                  <span
                    className="block-counter-1-number"
                    data-number="100"
                    ref={satisfactionCounter.countRef}
                  >
                    {satisfactionCounter.count}
                  </span>
                  <span className="append">%</span>
                </div>
                <span className="block-counter-1-caption">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
