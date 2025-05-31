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
              Our Specialized Services
            </span>
            <h2
              className="section-title mb-3"
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#2d405f",
              }}
            >
              Our Services
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
              What We Provide: Physiotherapy, Rehabilitation, and Alignment
              Services
            </p>
          </div>
        </div>

        <div className="row g-4">
          <ServiceCard
            imageUrl="images/img_11.jpg"
            title="Physiotherapy"
            description="Comprehensive physiotherapy services: Pain relief, rehabilitation, and wellness, tailored for your optimal health and mobility."
            delay={0.1}
          />
          <ServiceCard
            imageUrl="images/img_22.jpg"
            title="Rehabilitation"
            description="Rehabilitation excellence: Aligning the spine, relieving pain, and promoting overall wellness for a healthy, active life."
            delay={0.2}
          />
          <ServiceCard
            imageUrl="images/chiro.jpg"
            title="Chiropractic"
            description="Chiropractic expertise: Aligning the spine, relieving pain, and promoting overall wellness for a healthy and active life."
            delay={0.3}
          />
          <ServiceCard
            imageUrl="images/kinesio.webp"
            title="Kinesio Taping"
            description="Kinesio taping innovation: Supporting movement, reducing discomfort, and promoting overall wellness for a healthy and active life."
            delay={0.4}
          />
          <ServiceCard
            imageUrl="images/img_555.jpg"
            title="Cupping Therapy"
            description="Enhance wellness with cupping therapy: Boost blood circulation, reduce pain, and experience deep relief and rejuvenation."
            delay={0.5}
          />
          <ServiceCard
            imageUrl="images/dryneedling.jpg"
            title="Dry Needling"
            description="Dry needling: Precisely targeting muscle knots for pain relief and overall wellness."
            delay={0.6}
          />
        </div>

        {/* Specialized Service Categories */}
        {/* <div className="mt-5 pt-5 border-top">
          <h3 className="text-center mb-5 fw-bold" style={{ color: "#2d405f" }}>
            What We Treat
          </h3>

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
                Orthopedic Physiotherapy
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/orthopedic-1.png"
                title="Joint Rehabilitation"
                description="Specialized treatments for bone, muscle, and joint injuries and conditions that improve your mobility and quality of life."
                delay={0.1}
              />

              <ServiceCard
                imageUrl="images/orthopedic-3.png"
                title="Shoulder Rehabilitation"
                description="Targeted treatments for shoulder pain and injuries, including rotator cuff, frozen shoulder, and fractures."
                delay={0.3}
              />
            </div>
          </div>



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
                Rehabilitation Services
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/rehabilation-1.png"
                title="Sports Injury Rehabilitation"
                description="Specialized rehabilitation programs to safely return athletes and active individuals back to sports."
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/rehabilation-2.png"
                title="Return to Work Programs"
                description="Programs designed to help employees return safely and effectively to work after workplace injuries."
                delay={0.2}
              />
            </div>
          </div>

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
                Pediatric Physiotherapy
              </div>
            </h4>
            <div className="row g-4">
              <ServiceCard
                imageUrl="images/pediatric-1.png"
                title="Pediatric Developmental Therapy"
                description="Specially designed to support the development of motor skills and developmental milestones for children."
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/pediatric-2.png"
                title="Pediatric Neuro Rehabilitation"
                description="Specialized physiotherapy support for children with cerebral palsy and other neurological conditions."
                delay={0.2}
              />
              <ServiceCard
                imageUrl="images/pediatric-3.png"
                title="Pediatric Orthopedic Management"
                description="Specialized support and treatment for bone and joint issues in growing children."
                delay={0.3}
              />
            </div>
          </div>

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
                Sports Physiotherapy
              </div>
            </h4>
            <div className="row">
              <ServiceCard
                imageUrl="images/sports-1.png"
                title="Athlete Rehabilitation"
                description="Specialized rehabilitation services for athletes focusing on performance restoration and injury prevention."
                delay={0.1}
              />
              <ServiceCard
                imageUrl="images/sports-2.png"
                title="Sport-Specific Training"
                description="Conditioning and injury prevention programs customized for specific sports."
                delay={0.2}
              />
              <ServiceCard
                imageUrl="images/sports-3.png"
                title="Performance Enhancement"
                description="Advanced techniques and programs to optimize athlete performance."
                delay={0.3}
              />
            </div>
          </div>
        </div> */}
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
              Learn More
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
            Learn More <i className="fa fa-arrow-right ms-1"></i>
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
