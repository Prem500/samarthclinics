import React from "react";
import { useCounter } from "@/hooks/useCounter";

const WhyChooseUsSection: React.FC = () => {
  // Initialize counters
  const customersCounter = useCounter(200);
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
          <h2 className="block-half-content-heading mb-4">हमें क्यों चुनें</h2>
          <div className="block-half-content-excerpt">
            <p className="lead">
              हमें चुनें विशेषज्ञ फिजियोथेरेपी, चिरोप्रैक्टिक, और संरेखण सेवाओं
              के लिए, जहाँ व्यक्तिगत देखभाल, समग्र दृष्टिकोण, और अत्याधुनिक
              तकनीक आपके कल्याण और दर्द राहत को सुनिश्चित करती है।
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
                <span className="block-counter-1-caption">खुश ग्राहक</span>
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
                <span className="block-counter-1-caption">अनुभव के वर्ष</span>
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
                <span className="block-counter-1-caption">संतुष्टि</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
