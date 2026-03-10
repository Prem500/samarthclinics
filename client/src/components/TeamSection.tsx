import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const TeamSection: React.FC = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold display-5 text-primary">Our Team</h2>
          <div className="divider mx-auto my-4"></div>
          <p className="lead mb-4">
            Our qualified medical professionals are dedicated to providing the
            highest quality care
          </p>
        </div>{" "}
        <Row className="g-4 justify-content-center">
          <Col md={8} lg={6} xl={4} data-aos="zoom-in" data-aos-delay="100">
            <div className="card team-card h-100 border-0 shadow-sm">
              <div className="text-center p-4">
                <div
                  className="team-image-container mb-4 mx-auto position-relative"
                  style={{ maxWidth: "250px", height: "280px" }}
                >
                  <img
                    src="/images/premprofile.jpg"
                    alt="Dr. Prem Prakash"
                    className="img-fluid h-100 w-100 rounded"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                </div>
                <h3 className="h4 fw-bold mb-2">Dr. Prem Prakash</h3>
                <p className="text-muted mb-3">Senior Physiotherapist</p>
                <p className="small text-muted">
                  With over 2 years of experience, Dr. Prem Prakash specializes
                  in rehabilitation therapy, pediatrition, orthopedic
                  physiotherapy, neurological physiotherapy and sports injury
                  treatment.
                </p>
              </div>
            </div>
          </Col>

          <Col md={8} lg={6} xl={4} data-aos="zoom-in" data-aos-delay="200">
            <div className="card team-card h-100 border-0 shadow-sm">
              <div className="text-center p-4">
                <div
                  className="team-image-container mb-4 mx-auto position-relative"
                  style={{ maxWidth: "250px", height: "280px" }}
                >
                  <img
                    src="/images/doctor-2.jpg"
                    alt="Dr. Nikita Chauhan"
                    className="img-fluid h-100 w-100 rounded"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                </div>
                <h3 className="h4 fw-bold mb-2">Dr. Nikita Chauhan</h3>
                <p className="text-muted mb-3">Consultant Physiotherapist</p>
                <p className="small text-muted">
                  Dr Nikita Chauhan specialized in post-surgical and orthopedic
                  rehabilitation, pediatric and geriatric rehabilitation and
                  patient education and counselling.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .divider {
          height: 4px;
          width: 70px;
          background-color: var(--bs-primary);
        }
        .team-card {
          transition: transform 0.3s ease-in-out;
          border-radius: 10px;
          overflow: hidden;
        }
        .team-card:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
