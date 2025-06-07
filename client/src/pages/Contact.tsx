import { useEffect, useRef } from "react";
import Typed from "typed.js";
import AOS from "aos";
import TopBar from "@/components/TopBar";

const Contact = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Initialize Typed.js
    if (typedRef.current) {
      typed.current = new Typed(typedRef.current, {
        strings: ["संपर्क में रहें"],
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

  return (
    <div className="site-wrap">
      <TopBar />

      <div
        className="site-blocks-cover overlay"
        style={{ backgroundImage: "url(images/hero_bg_11.webp)" }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-md-10">
              <div className="row justify-content-center mb-4">
                <div className="col-md-10 text-center">
                  <h1 data-aos="fade-up" className="mb-5">
                    हमसे <span ref={typedRef} className="typed-words"></span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mb-5" data-aos="fade">
              <form
                action="#"
                className="p-5 bg-white"
                style={{ marginTop: "-150px" }}
              >
                <p data-aos="fade-up" data-aos-delay="100">
                  {" "}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSffoTrMEMzFGiZF8QtC4zgejMu7LZ-0nlj7MUa1MlK7j5p5jA/viewform?embedded=true"
                    className="btn btn-primary btn-pill universal-button"
                  >
                    अपॉइंटमेंट बुक करें
                  </a>
                </p>
              </form>
            </div>
            <div className="col-md-5" data-aos="fade" data-aos-delay="100">
              <div className="p-4 mb-3 bg-white">
                <p className="mb-0 font-weight-bold">पता</p>
                <p className="mb-4">नहर रोड, सुनील बोस के पास डेहरी में</p>

                <p className="mb-0 font-weight-bold">फ़ोन</p>
                <p className="mb-4">
                  <a href="#">+917004119766</a>
                </p>

                <p className="mb-0 font-weight-bold">ईमेल पता</p>
                <p className="mb-0">
                  <a href="#">Samarthclinic.info@gmail.com</a>
                </p>
              </div>

              <div className="p-4 mb-3 bg-white">
                <h3 className="h5 text-black mb-3">अधिक जानकारी</h3>
                <p>.</p>
                <p>
                  {" "}
                  <a
                    href="https://instagram.com/dr._prem__prakash?igshid=OGQ5ZDc2ODk2ZA=="
                    className="btn btn-primary px-4 py-2 text-white btn-pill btn-sm universal-button"
                  >
                    और जानें
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-5 block-cta-1 primary-overlay"
        style={{ backgroundImage: "url('images/hero_bg_22.webp')" }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <h2 className="mb-3 mt-0 text-white">
                पहली बार आने वालों के लिए 30% तक की छूट
              </h2>
              <p className="mb-0 text-white lead">योहोहो!</p>
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

      <footer className="site-footer">
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
                  <h2 className="footer-heading mb-4">हमें फॉलो करें</h2>
                  <a href="#" className="pl-0 pr-3">
                    <span className="icon-facebook"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-twitter"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-instagram"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-linkedin"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <h2 className="footer-heading mb-4">न्यूज़लेटर सदस्यता लें</h2>
              <p>हमारी मासिक सेवाओं की सदस्यता लें</p>
              <form action="#" method="post" className="subscription">
                <div className="input-group mb-3 d-flex align-items-stretch">
                  <input
                    type="text"
                    className="form-control bg-transparent"
                    placeholder="ईमेल दर्ज करें"
                    aria-label="ईमेल दर्ज करें"
                    aria-describedby="button-addon2"
                  />{" "}
                  <button
                    className="btn btn-primary text-white universal-button"
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
                कॉपीराइट &copy; {new Date().getFullYear()} सभी अधिकार सुरक्षित।
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
