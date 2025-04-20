import React from "react";
import { motion } from "framer-motion";

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="services-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <span
              className="badge text-uppercase mb-2"
              style={{
                backgroundColor: "#e9f5ff",
                color: "#3a9efd",
                fontSize: "0.8rem",
                padding: "8px 15px",
                borderRadius: "20px",
                letterSpacing: "1px",
              }}
            >
              हमारी विशिष्ट सेवाएं
            </span>
            <h2
              className="section-title mb-3"
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#2d405f",
              }}
            >
              हमारी सेवाएं
            </h2>
            <div
              className="section-divider mx-auto mb-4"
              style={{
                width: "70px",
                height: "4px",
                background: "linear-gradient(to right, #3a9efd, #56b3ff)",
                borderRadius: "2px",
              }}
            ></div>
            <p
              className="section-subtitle"
              style={{
                fontSize: "1.1rem",
                color: "#5a6a85",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              हम क्या प्रदान करते हैं: फिजियोथेरेपी, पुनर्वास, और संरेखण सेवाएं
            </p>
          </div>
        </div>

        <div className="row g-4">
          <ServiceCard
            imageUrl="images/img_11.jpg"
            title="फिजियोथेरेपी"
            description="व्यापक फिजियोथेरेपी सेवाएं: दर्द राहत, पुनर्वास, और स्वास्थ्य, आपके उत्कृष्ट स्वास्थ्य और गतिशीलता के लिए अनुकूलित।"
            delay={0.1}
          />
          <ServiceCard
            imageUrl="images/img_22.jpg"
            title="पुनर्वास"
            description="पुनर्वास उत्कृष्टता: रीढ़ की हड्डी को संरेखित करना, दर्द को दूर करना, और एक स्वस्थ, सक्रिय जीवन के लिए समग्र कल्याण को बढ़ावा देना।"
            delay={0.2}
          />
          <ServiceCard
            imageUrl="images/chiro.jpg"
            title="चिरोप्रैक्टिक"
            description="चिरोप्रैक्टिक विशेषज्ञता: रीढ़ की हड्डी को संरेखित करना, दर्द को दूर करना, और समग्र कल्याण को बढ़ाना, एक स्वस्थ और सक्रिय जीवन के लिए।"
            delay={0.3}
          />
          <ServiceCard
            imageUrl="images/kinesio.webp"
            title="किनेसियो टेपिंग"
            description="किनेसियो टेपिंग नवाचार: आंदोलन को समर्थन देना, असुविधा को कम करना, और समग्र कल्याण को बढ़ावा देना, एक स्वस्थ और सक्रिय जीवन के लिए।"
            delay={0.4}
          />
          <ServiceCard
            imageUrl="images/img_555.jpg"
            title="कपिंग थेरेपी"
            description="कपिंग थेरेपी के साथ कल्याण को बढ़ाएं: रक्त परिसंचरण को बढ़ावा दें, दर्द को कम करें, और गहरी राहत और पुनरुत्थान का अनुभव करें।"
            delay={0.5}
          />
          <ServiceCard
            imageUrl="images/dryneedling.jpg"
            title="ड्राई नीडलिंग"
            description="ड्राई नीडलिंग: दर्द राहत और समग्र कल्याण के लिए मांसपेशी गांठों को सटीकता से लक्षित करना।"
            delay={0.6}
          />
        </div>

        {/* Specialized Service Categories */}
        <div className="mt-5 pt-5 border-top">
          <h3 className="text-center mb-5 fw-bold" style={{ color: "#2d405f" }}>
            विशिष्ट फिजियोथेरेपी सेवाएं
          </h3>

          {/* Orthopedic Physiotherapy Category */}
          <div className="service-category mb-5">
            <h4
              className="category-title mb-4 pb-2"
              style={{
                borderBottom: "2px solid #e9f5ff",
                paddingBottom: "10px",
                color: "#3a9efd",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              <div className="d-flex align-items-center">
                <span
                  className="category-icon me-3"
                  style={{
                    backgroundColor: "#e9f5ff",
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fa fa-bone" style={{ color: "#3a9efd" }}></i>
                </span>
                ऑर्थोपेडिक फिजियोथेरेपी
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/orthopedic-1.png"
                title="जोड़ पुनर्वास"
                description="हड्डियों, मांसपेशियों और जोड़ों की चोटों और स्थितियों के लिए विशेष उपचार, जो आपकी गतिशीलता और जीवन की गुणवत्ता में सुधार करता है।"
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/orthopedic-2.png"
                title="पोस्ट-सर्जिकल पुनर्वास"
                description="सर्जरी के बाद की विशेष देखभाल जो तेज़ी से ठीक होने और ऑप्टिमल समारोह को सुनिश्चित करती है।"
                delay={0.2}
              />
              <ServiceCard
                imageUrl="images/orthopedic-3.png"
                title="कंधा पुनर्वास"
                description="कंधे के दर्द और चोटों के लिए लक्षित उपचार, जिसमें रोटेटर कफ, जमे हुए कंधे और अस्थिभंग शामिल हैं।"
                delay={0.3}
              />
            </div>
          </div>

          {/* Neurological Physiotherapy Category */}
          <div className="service-category mb-5">
            <h4
              className="category-title mb-4 pb-2"
              style={{
                borderBottom: "2px solid #e9f5ff",
                paddingBottom: "10px",
                color: "#3a9efd",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              <div className="d-flex align-items-center">
                <span
                  className="category-icon me-3"
                  style={{
                    backgroundColor: "#e9f5ff",
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fa fa-brain" style={{ color: "#3a9efd" }}></i>
                </span>
                न्यूरोलॉजिकल फिजियोथेरेपी
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/neurological-1.png"
                title="स्ट्रोक पुनर्वास"
                description="स्ट्रोक के बाद आंदोलन और कार्यात्मक क्षमताओं को बहाल करने के लिए विशेष रूप से डिज़ाइन किए गए उपचार और अभ्यास।"
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/neurological-2.png"
                title="न्यूरोलॉजिकल स्थिति प्रबंधन"
                description="पार्किंसंस, मल्टीपल स्केलेरोसिस और अन्य न्यूरोलॉजिकल स्थितियों के लिए समर्थन और प्रबंधन।"
                delay={0.2}
              />
            </div>
          </div>

          {/* Rehabilitation Category */}
          <div className="service-category mb-5">
            <h4
              className="category-title mb-4 pb-2"
              style={{
                borderBottom: "2px solid #e9f5ff",
                paddingBottom: "10px",
                color: "#3a9efd",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              <div className="d-flex align-items-center">
                <span
                  className="category-icon me-3"
                  style={{
                    backgroundColor: "#e9f5ff",
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="fa fa-hospital-user"
                    style={{ color: "#3a9efd" }}
                  ></i>
                </span>
                पुनर्वास सेवाएं
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/rehabilation-1.png"
                title="खेल चोट पुनर्वास"
                description="एथलीटों और सक्रिय व्यक्तियों को खेल में सुरक्षित रूप से वापस लाने के लिए विशेष पुनर्वास कार्यक्रम।"
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/rehabilation-2.png"
                title="कार्य से वापसी कार्यक्रम"
                description="कार्यस्थल चोटों के बाद कर्मचारियों को सुरक्षित और प्रभावी ढंग से काम पर वापस जाने में मदद करने के लिए डिज़ाइन किए गए कार्यक्रम।"
                delay={0.2}
              />
            </div>
          </div>

          {/* Pediatric Physiotherapy Category */}
          <div className="service-category mb-5">
            <h4
              className="category-title mb-4 pb-2"
              style={{
                borderBottom: "2px solid #e9f5ff",
                paddingBottom: "10px",
                color: "#3a9efd",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              <div className="d-flex align-items-center">
                <span
                  className="category-icon me-3"
                  style={{
                    backgroundColor: "#e9f5ff",
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fa fa-baby" style={{ color: "#3a9efd" }}></i>
                </span>
                बाल चिकित्सा फिजियोथेरेपी
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/pediatric-1.png"
                title="बाल विकासात्मक थेरेपी"
                description="मोटर स्किल्स के विकास और बच्चों के लिए विकासात्मक मील के पत्थर को समर्थन देने के लिए विशेष रूप से डिज़ाइन किया गया।"
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/pediatric-2.png"
                title="बाल न्यूरो पुनर्वास"
                description="सेरेब्रल पाल्सी और अन्य न्यूरोलॉजिकल स्थितियों वाले बच्चों के लिए विशेष फिजियोथेरेपी समर्थन।"
                delay={0.2}
              />
              <ServiceCard
                imageUrl="images/pediatric-3.png"
                title="बाल अस्थि प्रबंधन"
                description="बढ़ते बच्चों में हड्डियों और जोड़ों के मुद्दों के लिए विशेष समर्थन और उपचार।"
                delay={0.3}
              />
            </div>
          </div>

          {/* Sports Physiotherapy Category */}
          <div className="service-category mb-5">
            <h4
              className="category-title mb-4 pb-2"
              style={{
                borderBottom: "2px solid #e9f5ff",
                paddingBottom: "10px",
                color: "#3a9efd",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              <div className="d-flex align-items-center">
                <span
                  className="category-icon me-3"
                  style={{
                    backgroundColor: "#e9f5ff",
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fa fa-running" style={{ color: "#3a9efd" }}></i>
                </span>
                खेल फिजियोथेरेपी
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/sports-1.png"
                title="एथलीट पुनर्वास"
                description="एथलीटों के लिए विशेष पुनर्वास सेवाएं जो प्रदर्शन बहाली और चोट की रोकथाम पर केंद्रित हैं।"
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/sports-2.png"
                title="खेल विशिष्ट प्रशिक्षण"
                description="विशिष्ट खेलों के लिए अनुकूलित कंडीशनिंग और चोट की रोकथाम के कार्यक्रम।"
                delay={0.2}
              />
              <ServiceCard
                imageUrl="images/sports-3.png"
                title="प्रदर्शन सुधार"
                description="एथलीटों के प्रदर्शन को अनुकूलित करने के लिए उन्नत तकनीकें और कार्यक्रम।"
                delay={0.3}
              />
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <motion.a
              href="/services"
              className="btn btn-lg rounded-pill px-5 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(135deg, #3a9efd 0%, #0071e3 100%)",
                color: "white",
                border: "none",
                boxShadow: "0 7px 15px rgba(58, 158, 253, 0.25)",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              सभी सेवाएं देखें <i className="ms-2 fa fa-arrow-right"></i>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  imageUrl: string;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageUrl,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      className="col-sm-6 col-md-6 col-lg-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className="service-card h-100"
        style={{
          border: "1px solid #f0f0f0",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="service-card-image"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="img-fluid"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              transition: "transform 0.6s ease",
            }}
          />
          <div
            className="service-card-overlay"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              background: "rgba(58, 158, 253, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: "0",
              transition: "opacity 0.3s ease",
            }}
          >
            <motion.a
              href="#"
              className="btn btn-light btn-sm rounded-pill px-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                fontWeight: "500",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              और जानें
            </motion.a>
          </div>
        </div>
        <div
          className="service-card-body"
          style={{
            padding: "1.5rem",
            textAlign: "left",
          }}
        >
          <h3
            className="service-card-title"
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#2d405f",
            }}
          >
            {title}
          </h3>
          <p
            className="service-card-text"
            style={{
              color: "#5a6a85",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              marginBottom: "1.5rem",
            }}
          >
            {description}
          </p>
          <motion.a
            href="#"
            className="service-card-link d-inline-block"
            whileHover={{ x: 5 }}
            style={{
              color: "#3a9efd",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
            }}
          >
            और जानें <i className="fa fa-arrow-right ms-1"></i>
          </motion.a>
        </div>
      </div>
      <style>{`
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        .service-card:hover .service-card-overlay {
          opacity: 1;
        }
        .service-card:hover .service-card-image img {
          transform: scale(1.1);
        }
      `}</style>
    </motion.div>
  );
};

export default ServicesSection;
