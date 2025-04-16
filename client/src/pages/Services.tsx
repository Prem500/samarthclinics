import TopBar from "@/components/TopBar";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import AOS from "aos";
import { useCounter } from "@/hooks/useCounter";

const Services = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  const experienceCounter = useCounter(14);
  const usersCounter = useCounter(4500);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

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
                    हम आपके{" "}
                    <span className="text-pink-400" ref={typedRef}></span>
                  </h1>

                  <p data-aos="fade-up" data-aos-delay="100">
                    <a
                      href="/appointments"
                      className="btn btn-primary btn-pill"
                    >
                      शुरू करें
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section block-services-1">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="site-section-heading text-center font-secondary text-black">
                हमारी सेवाएं
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="mb-4 mb-lg-4 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/img_44.webp"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">फिजियोथैरेपी</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    व्यापक फिजियोथेरेपी सेवाएँ: दर्द निवारण, पुनर्वास और
                    स्वास्थ्य, आपके बेहतर स्वास्थ्य और गतिशीलता के लिए अनुकूलित।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>

            <div className="mb-4 mb-lg-4 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/img_22.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">पुनर्वास</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    पुनर्वास उत्कृष्टता: रीढ़ को संरेखित करना, दर्द से राहत देना
                    और स्वस्थ, सक्रिय जीवन के लिए समग्र कल्याण को बढ़ावा देना।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-4 mb-lg-4 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/img_555.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">कपिंग थेरेपी</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    कपिंग थेरेपी के साथ कल्याण बढ़ाएं: रक्त परिसंचरण को बढ़ावा
                    दें, दर्द को कम करें और गहन राहत और कायाकल्प का अनुभव करें।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-4 mb-lg-4 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/dryneedling.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">ड्राई नीडलिंग</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    ड्राई नीडलिंग विशेषज्ञ देखभाल: मांसपेशियों के दर्द और तनाव
                    को लक्षित करती है, आराम और चलने की क्षमता में सुधार करती है।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialized Service Categories Section */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="site-section-heading text-center font-secondary text-black">
                विशिष्ट फिजियोथेरेपी सेवाएं
              </h2>
              <p className="lead">
                हमारी विशेषज्ञ फिजियोथेरेपी सेवाएं विभिन्न स्थितियों और जरूरतों
                के लिए अनुकूलित हैं
              </p>
            </div>
          </div>

          {/* Orthopedic Physiotherapy Category */}
          <div className="mb-5">
            <h3 className="text-black mb-4 border-bottom pb-2">
              ऑर्थोपेडिक फिजियोथेरेपी
            </h3>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/orthopedic-1.png"
                      alt="जोड़ पुनर्वास"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">जोड़ पुनर्वास</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      हड्डियों, मांसपेशियों और जोड़ों की चोटों और स्थितियों के
                      लिए विशेष उपचार, जो आपकी गतिशीलता और जीवन की गुणवत्ता में
                      सुधार करता है।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/orthopedic-2.png"
                      alt="पोस्ट-सर्जिकल पुनर्वास"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">पोस्ट-सर्जिकल पुनर्वास</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      सर्जरी के बाद की विशेष देखभाल जो तेज़ी से ठीक होने और
                      ऑप्टिमल समारोह को सुनिश्चित करती है।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/orthopedic-3.png"
                      alt="कंधा पुनर्वास"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">कंधा पुनर्वास</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      कंधे के दर्द और चोटों के लिए लक्षित उपचार, जिसमें रोटेटर
                      कफ, जमे हुए कंधे और अस्थिभंग शामिल हैं।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Neurological Physiotherapy Category */}
          <div className="mb-5">
            <h3 className="text-black mb-4 border-bottom pb-2">
              न्यूरोलॉजिकल फिजियोथेरेपी
            </h3>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/neurological-1.png"
                      alt="स्ट्रोक पुनर्वास"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">स्ट्रोक पुनर्वास</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      स्ट्रोक के बाद आंदोलन और कार्यात्मक क्षमताओं को बहाल करने
                      के लिए विशेष रूप से डिज़ाइन किए गए उपचार और अभ्यास।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/neurological-2.png"
                      alt="न्यूरोलॉजिकल स्थिति प्रबंधन"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">न्यूरोलॉजिकल स्थिति प्रबंधन</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      पार्किंसंस, मल्टीपल स्केलेरोसिस और अन्य न्यूरोलॉजिकल
                      स्थितियों के लिए समर्थन और प्रबंधन।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rehabilitation Category */}
          <div className="mb-5">
            <h3 className="text-black mb-4 border-bottom pb-2">
              पुनर्वास सेवाएं
            </h3>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/rehabilation-1.png"
                      alt="खेल चोट पुनर्वास"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">खेल चोट पुनर्वास</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      एथलीटों और सक्रिय व्यक्तियों को खेल में सुरक्षित रूप से
                      वापस लाने के लिए विशेष पुनर्वास कार्यक्रम।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/rehabilation-2.png"
                      alt="कार्य से वापसी कार्यक्रम"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">कार्य से वापसी कार्यक्रम</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      कार्यस्थल चोटों के बाद कर्मचारियों को सुरक्षित और प्रभावी
                      ढंग से काम पर वापस जाने में मदद करने के लिए डिज़ाइन किए गए
                      कार्यक्रम।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pediatric Physiotherapy Category */}
          <div className="mb-5">
            <h3 className="text-black mb-4 border-bottom pb-2">
              बाल चिकित्सा फिजियोथेरेपी
            </h3>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/pediatric-1.png"
                      alt="बाल विकासात्मक थेरेपी"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">बाल विकासात्मक थेरेपी</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      मोटर स्किल्स के विकास और बच्चों के लिए विकासात्मक मील के
                      पत्थर को समर्थन देने के लिए विशेष रूप से डिज़ाइन किया गया।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/pediatric-2.png"
                      alt="बाल न्यूरो पुनर्वास"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">बाल न्यूरो पुनर्वास</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      सेरेब्रल पाल्सी और अन्य न्यूरोलॉजिकल स्थितियों वाले बच्चों
                      के लिए विशेष फिजियोथेरेपी समर्थन।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/pediatric-3.png"
                      alt="बाल अस्थि प्रबंधन"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">बाल अस्थि प्रबंधन</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      बढ़ते बच्चों में हड्डियों और जोड़ों के मुद्दों के लिए
                      विशेष समर्थन और उपचार।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sports Physiotherapy Category */}
          <div className="mb-5">
            <h3 className="text-black mb-4 border-bottom pb-2">
              खेल फिजियोथेरेपी
            </h3>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/sports-1.png"
                      alt="एथलीट पुनर्वास"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">एथलीट पुनर्वास</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      एथलीटों के लिए विशेष पुनर्वास सेवाएं जो प्रदर्शन बहाली और
                      चोट की रोकथाम पर केंद्रित हैं।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/sports-2.png"
                      alt="खेल विशिष्ट प्रशिक्षण"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">खेल विशिष्ट प्रशिक्षण</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      विशिष्ट खेलों के लिए अनुकूलित कंडीशनिंग और चोट की रोकथाम
                      के कार्यक्रम।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="block-service-1-card h-100">
                  <a href="#" className="thumbnail-link d-block mb-4">
                    <img
                      src="images/sports-3.png"
                      alt="प्रदर्शन सुधार"
                      className="img-fluid"
                    />
                  </a>
                  <h3 className="block-service-1-heading mb-3">
                    <a href="#">प्रदर्शन सुधार</a>
                  </h3>
                  <div className="block-service-1-excerpt">
                    <p>
                      एथलीटों के प्रदर्शन को अनुकूलित करने के लिए उन्नत तकनीकें
                      और कार्यक्रम।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block-half-content-1 d-block d-lg-flex mt-5">
        <div
          className="block-half-content-img"
          style={{ backgroundImage: 'url("images/hero_bg_11.webp")' }}
        ></div>
        <div className="block-half-content-text bg-primary">
          <div className="block-half-content-text-inner">
            <h2 className="block-half-content-heading mb-4">
              क्यों चुनें हमें
            </h2>
            <div className="block-half-content-excerpt">
              <p className="lead">
                विशेषज्ञ फिजियोथेरेपी, कायरोप्रैक्टिक और संरेखण सेवाओं के लिए
                हमें चुनें, जहां व्यक्तिगत देखभाल, समग्र दृष्टिकोण और अत्याधुनिक
                तकनीकें आपके कल्याण और दर्द निवारण को सुनिश्चित करती हैं।
              </p>
            </div>
          </div>

          <div className="block-counter-1 section-counter">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="block-counter-1-item">
                  <span className="number text-3xl font-bold text-white">
                    <span
                      className="block-counter-1-number text-3xl font-bold text-white"
                      ref={experienceCounter.countRef}
                      data-number="14"
                    >
                      {experienceCounter.count}
                    </span>
                    +
                  </span>
                  <span className=" text-xl font-semibold text-white">
                    वर्ष का अनुभव
                  </span>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="block-counter-1-item">
                  <span className="number text-3xl font-bold text-white">
                    <span
                      className="text-3xl font-bold text-white"
                      ref={usersCounter.countRef}
                      data-number="4500"
                    >
                      {usersCounter.count}
                    </span>
                    +
                  </span>
                  <span className=" text-xl font-semibold text-white">
                    खुशहाल ग्राहक
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <img
                src="images/img_111.webp"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2 className="site-section-heading text-black">
                हमारे बारे में
              </h2>
              <p className="lead">
                समर्थ क्लिनिक में आपका स्वागत है, जहां हम आपके स्वास्थ्य और भलाई
                को प्राथमिकता देते हैं। विशेषज्ञता, करुणा और उन्नत तकनीकों के
                साथ, हम विशिष्ट और प्रभावी फिजियोथेरेपी और कायरोप्रैक्टिक देखभाल
                प्रदान करने के लिए समर्पित हैं। हमारा लक्ष्य दर्द से राहत,
                गतिशीलता में सुधार और संपूर्ण स्वास्थ्य को बढ़ावा देना है। हमारे
                अनुभवी पेशेवर आपकी यात्रा को हर कदम पर समर्थन और मार्गदर्शन करने
                के लिए यहां हैं, आपको पुनर्प्राप्ति और समग्र कल्याण की ओर ले जा
                रहे हैं।
              </p>
              <p>
                विशेषज्ञों की हमारी टीम में अनुभवी फिजियोथेरेपिस्ट और
                काइरोप्रैक्टिक चिकित्सक शामिल हैं, जो प्रत्येक रोगी को व्यक्तिगत
                देखभाल और ध्यान प्रदान करने के लिए समर्पित हैं। हम व्यक्तिगत
                उपचार योजना विकसित करने के लिए प्रत्येक रोगी की विशिष्ट
                आवश्यकताओं और लक्ष्यों को समझने के महत्व में विश्वास करते हैं।
              </p>
              <p>
                कृपया हमसे संपर्क करें या अधिक जानकारी के लिए हमारी वेबसाइट
                देखें। हमारा उद्देश्य सर्वोत्तम संभव देखभाल प्रदान करना और आपको
                सर्वोत्तम संभव स्वास्थ्य प्राप्त करने में मदद करना है।
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center">
              <h2 className="site-section-heading font-secondary text-black">
                हमारी सेवाएं
              </h2>
            </div>
          </div>
          <div className="row align-items-stretch">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
              <div className="block-service-2 d-flex">
                <div className="icon">
                  <span className="flaticon-first-aid-kit"></span>
                </div>
                <div className="text">
                  <h3 className="block-service-2-heading">
                    व्यापक फिजियोथैरेपी
                  </h3>
                  <p>
                    हमारी व्यापक फिजियोथेरेपी सेवाओं में विभिन्न प्रकार की
                    चिकित्सा विधियाँ और उपचार शामिल हैं, जो दर्द से राहत, गति की
                    सीमा में सुधार और सामान्य कार्य को बढ़ावा देने के लिए
                    डिज़ाइन किए गए हैं।
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
              <div className="block-service-2 d-flex">
                <div className="icon">
                  <span className="flaticon-balance"></span>
                </div>
                <div className="text">
                  <h3 className="block-service-2-heading">
                    कायरोप्रैक्टिक देखभाल
                  </h3>
                  <p>
                    हमारी कायरोप्रैक्टिक देखभाल सेवाएँ रीढ़ की हड्डी के संरेखण
                    को बहाल करने और तंत्रिका तंत्र के कार्य में सुधार पर ध्यान
                    केंद्रित करती हैं, जिससे आपके शरीर की प्राकृतिक उपचार
                    क्षमताओं को बढ़ावा मिलता है।
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
              <div className="block-service-2 d-flex">
                <div className="icon">
                  <span className="flaticon-fitness"></span>
                </div>
                <div className="text">
                  <h3 className="block-service-2-heading">पुनर्वास</h3>
                  <p>
                    हमारा पुनर्वास कार्यक्रम चोटों से उबरने में आपकी सहायता करने
                    के लिए डिज़ाइन किया गया है, जो ताकत, लचीलेपन और कार्य को
                    बहाल करने के लिए व्यक्तिगत व्यायाम और थेरेपी पर केंद्रित है।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="site-section block-13 bg-primary fixed overlay-primary bg-image"
        style={{ backgroundImage: 'url("images/hero_bg_11.webp")' }}
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <div
                className="block-heading-1"
                data-aos="fade-up"
                data-aos-delay=""
              >
                <h2 className="text-white">हमें क्यों चुनें</h2>
                <p className="text-white">
                  "विशेषज्ञ फिजियोथेरेपी, कायरोप्रैक्टिक और संरेखण सेवाओं के लिए
                  हमें चुनें, जहां व्यक्तिगत देखभाल, समग्र दृष्टिकोण और
                  अत्याधुनिक तकनीकें आपके कल्याण और दर्द निवारण को सुनिश्चित
                  करती हैं।"
                </p>
              </div>
            </div>
          </div>

          <div className="owl-carousel nonloop-block-13">
            <div>
              <div className="block-testimony-1 text-center rounded">
                <blockquote className="mb-4">
                  <p>
                    &ldquo; मैं समर्थ क्लिनिक की देखभाल से बहुत खुश हूँ। मेरे
                    दर्द में बहुत सुधार हुआ है और मेरी गतिशीलता में भी वृद्धि
                    हुई है। मैं यहां की देखभाल की गुणवत्ता की सराहना करता
                    हूँ।&rdquo;
                  </p>
                </blockquote>

                <figure>
                  <img
                    src="images/person_1.jpg"
                    alt="Image"
                    className="img-fluid rounded-circle mx-auto"
                  />
                </figure>
                <h3 className="font-size-20 text-white">आदित्य कुमार</h3>
              </div>
            </div>
            <div>
              <div className="block-testimony-1 text-center rounded">
                <blockquote className="mb-4">
                  <p>
                    &ldquo; समर्थ क्लिनिक में टीम बहुत पेशेवर और सहायक है। मेरी
                    पीठ के दर्द के लिए उनका उपचार बेहद प्रभावी रहा है। मैं
                    निश्चित रूप से उनकी सेवाओं की सिफारिश करता हूँ।&rdquo;
                  </p>
                </blockquote>

                <figure>
                  <img
                    src="images/person_2.jpg"
                    alt="Image"
                    className="img-fluid rounded-circle mx-auto"
                  />
                </figure>
                <h3 className="font-size-20 text-white">सपना वर्मा</h3>
              </div>
            </div>
            <div>
              <div className="block-testimony-1 text-center rounded">
                <blockquote className="mb-4">
                  <p>
                    &ldquo; समर्थ क्लिनिक में मेरा अनुभव अद्भुत रहा है। उनकी
                    व्यापक पुनर्वास सेवाओं ने मुझे चोट से उबरने में बहुत मदद की
                    है। उनके समर्पण और विशेषज्ञता के लिए मैं बहुत आभारी
                    हूँ।&rdquo;
                  </p>
                </blockquote>

                <figure>
                  <img
                    src="images/person_3.jpg"
                    alt="Image"
                    className="img-fluid rounded-circle mx-auto"
                  />
                </figure>
                <h3 className="font-size-20 text-white">राजेश शर्मा</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center">
              <h2 className="site-section-heading font-secondary text-black">
                ब्लॉग
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="block-blog-1 card h-100">
                <a href="#">
                  <img
                    src="images/img_1.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <div className="card-body">
                  <h3>
                    <a href="#">फिजियोथैरेपी के लाभ</a>
                  </h3>
                  <p>
                    फिजियोथेरेपी का दर्द से राहत पाने, गतिशीलता बढ़ाने और चोटों
                    से उबरने में मदद करने में महत्वपूर्ण भूमिका है। हमारे ब्लॉग
                    पर इसके लाभों के बारे में अधिक जानें।
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="block-blog-1 card h-100">
                <a href="#">
                  <img
                    src="images/img_2.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <div className="card-body">
                  <h3>
                    <a href="#">कायरोप्रैक्टिक देखभाल के लाभ</a>
                  </h3>
                  <p>
                    कायरोप्रैक्टिक देखभाल रीढ़ की हड्डी के संरेखण को सुधारने और
                    तंत्रिका तंत्र के कार्य को बढ़ावा देने में मदद करती है।
                    हमारे विशेषज्ञों से इसके लाभों के बारे में और जानें।
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="block-blog-1 card h-100">
                <a href="#">
                  <img
                    src="images/img_3.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <div className="card-body">
                  <h3>
                    <a href="#">पुनर्वास के महत्व</a>
                  </h3>
                  <p>
                    पुनर्वास चोटों से उबरने और सामान्य कार्य को बहाल करने में
                    महत्वपूर्ण भूमिका निभाता है। हमारे ब्लॉग पर पुनर्वास के
                    महत्व के बारे में अधिक जानें।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center mb-5 mb-md-0">
              <img
                src="images/person_2.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2 className="site-section-heading text-white mb-3">
                हमारे पेशेवरों से मिलें
              </h2>
              <p className="lead">
                हमारे विशेषज्ञ फिजियोथेरेपिस्ट और काइरोप्रैक्टिक चिकित्सक
                अत्यधिक योग्य हैं और प्रत्येक रोगी को सर्वोत्तम देखभाल प्रदान
                करने के लिए प्रतिबद्ध हैं।
              </p>
              <p>
                वे दर्द प्रबंधन, पुनर्वास, और सामान्य स्वास्थ्य और कल्याण को
                बढ़ावा देने में विशेषज्ञ हैं।
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="site-section-heading text-black">
                हमारे संपर्क में रहें
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form action="#" method="post">
                <div className="row form-group">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="fname">
                      पहला नाम
                    </label>
                    <input type="text" id="fname" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="text-black" htmlFor="lname">
                      अंतिम नाम
                    </label>
                    <input type="text" id="lname" className="form-control" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="email">
                      ईमेल
                    </label>
                    <input type="email" id="email" className="form-control" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="message">
                      संदेश
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      cols={30}
                      rows={7}
                      className="form-control"
                      placeholder="आपका संदेश यहाँ लिखें"
                    ></textarea>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      value="भेजें"
                      className="btn btn-primary btn-md text-white"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-5">
                  <h2 className="footer-heading mb-4">हमारे बारे में</h2>
                  <p>
                    समर्थ क्लिनिक में, हम आपके स्वास्थ्य और भलाई के लिए उच्चतम
                    गुणवत्ता की फिजियोथेरेपी और कायरोप्रैक्टिक सेवाएं प्रदान
                    करते हैं। हमारा उद्देश्य आपके जीवन की गुणवत्ता में सुधार
                    करना है।
                  </p>
                </div>
                <div className="col-md-3 ml-auto">
                  <h2 className="footer-heading mb-4">महत्वपूर्ण लिंक</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">होम</a>
                    </li>
                    <li>
                      <a href="#">सेवाएं</a>
                    </li>
                    <li>
                      <a href="#">हमारे बारे में</a>
                    </li>
                    <li>
                      <a href="#">हमसे संपर्क करें</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <h2 className="footer-heading mb-4">हमसे संपर्क करें</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">ईमेल</a>
                    </li>
                    <li>
                      <a href="#">फोन</a>
                    </li>
                    <li>
                      <a href="#">पता</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h2 className="footer-heading mb-4">फॉलो करें</h2>
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
      </footer>
    </div>
  );
};

export default Services;
