import React from "react";
import { motion } from "framer-motion";

const VisitUsSection: React.FC = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Treatment categories with their images
  const treatmentCategories = [
    {
      id: "joint-pain",
      title: "Joint Pain Management",
      image: "images/orthopedic-1.png",
      description:
        "Specialized treatments for joint pain, providing relief and improving mobility.",
    },
    {
      id: "musculoskeletal",
      title: "Musculoskeletal Pain Management",
      image: "images/orthopedic-2.png",
      description:
        "Comprehensive management for muscle, bone, and soft tissue pain.",
    },
    {
      id: "post-operative",
      title: "Post Operative Management",
      image: "images/po.png",
      description:
        "Personalized rehabilitation programs for optimal post-surgery recovery.",
    },
    {
      id: "neuropathic",
      title: "Neuropathic Pain Management",
      image: "images/neurological-1.png",
      description:
        "Advanced techniques to alleviate nerve pain and related symptoms.",
    },
    {
      id: "spinal",
      title: "Spinal Pain Management",
      image: "images/spinal.png",
      description:
        "Targeted therapies for back pain, disc issues, and spinal conditions.",
    },
    {
      id: "stroke",
      title: "Stroke & Spinal Cord Injury Rehabilitation",
      image: "images/sp.png",
      description:
        "Specialized rehabilitation services for neurological recovery and function improvement.",
    },
    {
      id: "pediatrics",
      title: "Pediatric Physiotherapy Rehabilitation",
      image: "images/pediatric-3.png",
      description:
        "Child-focused therapies addressing developmental and neurological conditions.",
    },
    {
      id: "sports",
      title: "Sports Physiotherapy Management",
      image: "images/sports-2.png",
      description:
        "Performance enhancement and injury rehabilitation for athletes and active individuals.",
    },
  ];

  return (
    <section id="visit-us" className="py-5 visit-us-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
              Why Visit Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-title mb-3"
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#2d405f",
              }}
            >
              Specialized Treatment Areas
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="section-divider mx-auto mb-4"
              style={{
                width: "70px",
                height: "4px",
                background: "linear-gradient(to right, #3a9efd, #56b3ff)",
                borderRadius: "2px",
              }}
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="section-subtitle"
              style={{
                fontSize: "1.1rem",
                color: "#5a6a85",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              We offer specialized care for various conditions with
              evidence-based approaches to help you recover and thrive
            </motion.p>
          </div>
        </div>

        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {treatmentCategories.map((category) => (
            <motion.div
              key={category.id}
              className="col-md-6 col-lg-3"
              variants={itemVariants}
            >
              <div
                className="treatment-card h-100"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  backgroundColor: "#fff",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  className="treatment-image-wrapper"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="img-fluid w-100"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                  />
                  <div
                    className="treatment-overlay"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      right: "0",
                      bottom: "0",
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "20px",
                    }}
                  >
                    <h3
                      className="treatment-title mb-0"
                      style={{
                        color: "white",
                        fontSize: "1.15rem",
                        fontWeight: "600",
                        textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      }}
                    >
                      {category.title}
                    </h3>
                  </div>
                </div>
                <div
                  className="treatment-content p-4"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <p
                    className="treatment-description mb-3"
                    style={{
                      color: "#5a6a85",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {category.description}
                  </p>{" "}
                  <a
                    href={`/services#${category.id}`}
                    className="treatment-link d-inline-flex align-items-center universal-button-outline"
                  >
                    Learn More
                    <i
                      className="fa fa-arrow-right ms-2"
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        .treatment-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        .treatment-card:hover img {
          transform: scale(1.1);
        }
        .treatment-link:hover {
          color: #0056b3;
          transform: translateX(5px);
        }
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default VisitUsSection;
