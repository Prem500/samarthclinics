import React from "react";
import { motion } from "framer-motion";

const ServicesSection: React.FC = () => {
  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h2 className="section-title">हमारी सेवाएं</h2>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle">
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
          <h3 className="text-center mb-5 fw-bold">
            विशिष्ट फिजियोथेरेपी सेवाएं
          </h3>

          {/* Orthopedic Physiotherapy Category */}
          <div className="service-category mb-5">
            <h4 className="category-title mb-4 pb-2 border-bottom">
              ऑर्थोपेडिक फिजियोथेरेपी
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
            <h4 className="category-title mb-4 pb-2 border-bottom">
              न्यूरोलॉजिकल फिजियोथेरेपी
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
            <h4 className="category-title mb-4 pb-2 border-bottom">
              पुनर्वास सेवाएं
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
            <h4 className="category-title mb-4 pb-2 border-bottom">
              बाल चिकित्सा फिजियोथेरेपी
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
            <h4 className="category-title mb-4 pb-2 border-bottom">
              खेल फिजियोथेरेपी
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

        <div className="row mt-4">
          <div className="col-12 text-center">
            <motion.a
              href="/services"
              className="btn btn-primary btn-lg rounded-pill px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              सभी सेवाएं देखें{" "}
              <i className="ms-2 icon-keyboard_arrow_right"></i>
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
      <div className="service-card h-100">
        <div className="service-card-image">
          <img src={imageUrl} alt={title} className="img-fluid rounded" />
          <div className="service-card-overlay">
            <motion.a
              href="#"
              className="btn btn-light btn-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              और जानें
            </motion.a>
          </div>
        </div>
        <div className="service-card-body">
          <h3 className="service-card-title">{title}</h3>
          <p className="service-card-text">{description}</p>
          <motion.a
            href="#"
            className="service-card-link"
            whileHover={{ x: 5 }}
          >
            और जानें <i className="icon-keyboard_arrow_right"></i>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
