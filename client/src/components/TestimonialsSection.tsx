import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { FaStar } from "react-icons/fa";
// import { FaQuoteLeft } from "react-icons/fa";
import { QuoteIcon, Star } from "lucide-react";

const TestimonialsSection: React.FC = () => {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile for better touch interaction
        },
      },
    ],
    arrows: true,
    className: "testimonial-slider",
  };

  const renderStars = (count = 5) => {
    return Array(count)
      .fill(0)
      .map((_, i) => <Star fill="orange" key={i} className="text-warning" />);
  };

  return (
    <div className="site-section testimonials-bg py-5">
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-12 text-center">
            <h2 className=" text-center font-secondary mb-3">खुश ग्राहक</h2>
            <div className="heading-underline mx-auto"></div>
            <p className="text-muted text-3xl mt-3">
              हमारे ग्राहकों का अनुभव जानें
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 testimonial-container">
            <Slider {...testimonialSettings}>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <QuoteIcon />
                  </div>
                  <div className="star-rating mb-3">{renderStars(5)}</div>
                  <blockquote>
                    Just a magical treatment. Hope all of you get the best
                    treatment from this best clinic.
                  </blockquote>
                  <div className="person-wrapper">
                    <div className="person-image">
                      <img
                        src="/images/User-4.png"
                        alt="Ravi Raj"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="person-info">
                      <h4 className="person-name">Ravi Raj</h4>
                      <p className="person-title">Local guide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <QuoteIcon />
                  </div>
                  <div className="star-rating mb-3">{renderStars(5)}</div>
                  <blockquote>
                    I visited with my Dad. Dr. Prem Prakash attends to him and
                    he is doing physiotherapy. He is humble and supportive. He
                    is feeling better now.
                  </blockquote>
                  <div className="person-wrapper">
                    <div className="person-image">
                      <img
                        src="/images/User-1.png"
                        alt="सुनील कुमार"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="person-info">
                      <h4 className="person-name">Akhileshwar Singh</h4>
                      <p className="person-title">Local Guide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <QuoteIcon />
                  </div>
                  <div className="star-rating mb-3">{renderStars(5)}</div>
                  <blockquote>Best physiotherapist in dehri.</blockquote>
                  <div className="person-wrapper">
                    <div className="person-image">
                      <img
                        src="images/User-2.png"
                        alt="रविंदर कुशवाहा"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="person-info">
                      <h4 className="person-name">Bibhu Maurya</h4>
                      <p className="person-title">Local guide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <QuoteIcon />
                  </div>
                  <div className="star-rating mb-3">{renderStars(5)}</div>
                  <blockquote>
                    I had an excellent experience at Samarth Clinic under the
                    care of Dr. Prem, one of the best physiotherapists in Dehri
                    on Sone. I visited for chronic back pain, and within a few
                    sessions, I saw a noticeable improvement in my mobility and
                    pain levels.
                  </blockquote>
                  <div className="person-wrapper">
                    <div className="person-image">
                      <img
                        src="images/User-3.png"
                        alt="बिनोद कुमार"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="person-info">
                      <h4 className="person-name">Ritik Kumar</h4>
                      <p className="person-title">Local guide</p>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-bg {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          padding-bottom: 80px;
        }
        
        .heading-underline {
          width: 80px;
          height: 4px;
          background: #007bff;
          border-radius: 2px;
          margin-top: 15px;
        }

        @media (max-width: 576px) {
          .testimonials-bg {
            padding-bottom: 60px;
          }
          
          .heading-underline {
            width: 60px;
            height: 3px;
          }
        }
        
        .testimonial-slider {
          padding: 40px 20px;
          margin: 0 0 20px 0;
        }
        
        .testimonial-container {
          position: relative;
          padding: 0 50px;
        }
        
        @media (max-width: 768px) {
          .testimonial-container {
            padding: 0 20px;
          }
          
          .testimonial-slider {
            padding: 20px 10px;
          }
        }
        
        .testimonial-card {
          padding: 15px;
        }
        
        @media (max-width: 576px) {
          .testimonial-card {
            padding: 10px 5px;
          }
        }
        
        .testimonial-content {
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          padding: 30px;
          position: relative;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        @media (max-width: 576px) {
          .testimonial-content {
            padding: 20px 15px;
          }
        }
        
        .testimonial-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        .quote-icon {
          color: #007bff;
          font-size: 24px;
          margin-bottom: 20px;
          opacity: 0.6;
        }
        
        @media (max-width: 576px) {
          .quote-icon {
            font-size: 20px;
            margin-bottom: 15px;
          }
        }
        
        .star-rating {
          display: flex;
          gap: 4px;
        }
        
        @media (max-width: 576px) {
          .star-rating svg {
            width: 16px;
            height: 16px;
          }
        }
        
        blockquote {
          font-style: italic;
          color: #495057;
          font-size: 16px;
          margin: 15px 0 25px;
          line-height: 1.6;
          font-weight: 400;
        }
        
        @media (max-width: 576px) {
          blockquote {
            font-size: 14px;
            margin: 10px 0 20px;
            line-height: 1.5;
          }
        }
        
        .person-wrapper {
          display: flex;
          align-items: center;
          margin-top: 20px;
          border-top: 1px solid #e9ecef;
          padding-top: 20px;
        }
        
        @media (max-width: 576px) {
          .person-wrapper {
            margin-top: 15px;
            padding-top: 15px;
          }
        }
        
        .person-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #f8f9fa;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        
        @media (max-width: 576px) {
          .person-image {
            width: 50px;
            height: 50px;
            border-width: 2px;
          }
        }
        
        .person-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .person-info {
          margin-left: 15px;
        }
        
        @media (max-width: 576px) {
          .person-info {
            margin-left: 10px;
          }
        }
        
        .person-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #212529;
        }
        
        .person-title {
          font-size: 14px;
          color: #6c757d;
          margin: 0;
        }
        
        @media (max-width: 576px) {
          .person-name {
            font-size: 16px;
          }
          
          .person-title {
            font-size: 12px;
          }
        }
        
        /* Improve touch target sizes on mobile */
        @media (max-width: 768px) {
          .testimonial-slider .slick-dots li {
            width: 16px;
            height: 16px;
            margin: 0 7px;
          }
          
          .testimonial-slider .slick-dots li button {
            width: 16px;
            height: 16px;
          }
          
          .testimonial-slider .slick-dots li button:before {
            width: 12px;
            height: 12px;
          }
          
          /* Add swipe indicator for touch devices */
          .testimonial-slider:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(to right, rgba(0,0,0,0.03), transparent 15px, transparent 85%, rgba(0,0,0,0.03));
            pointer-events: none;
            z-index: 1;
          }
        }
        
        /* Fix height issues on mobile */
        @media (max-width: 576px) {
          .text-3xl {
            font-size: 1.25rem !important;
          }
        }
        
        .testimonial-slider .slick-prev,
        .testimonial-slider .slick-next {
          background: #007bff !important;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10;
          transition: all 0.3s ease;
        }
        
        .testimonial-slider .slick-prev {
          left: -10px;
        }
        
        .testimonial-slider .slick-next {
          right: -10px;
        }
        
        /* Adjust arrow positions on smaller screens */
        @media (max-width: 992px) {
          .testimonial-slider .slick-prev {
            left: -5px;
          }
          
          .testimonial-slider .slick-next {
            right: -5px;
          }
        }
        
        /* Keep the rest of the existing styling */
        .testimonial-slider .slick-prev:hover,
        .testimonial-slider .slick-next:hover {
          background: #0056b3 !important;
          transform: scale(1.1);
        }
        
        .testimonial-slider .slick-prev:before,
        .testimonial-slider .slick-next:before {
          color: white;
          font-size: 20px;
          line-height: 1;
          opacity: 1;
        }
        
        .testimonial-slider .slick-dots {
          bottom: -50px;
          text-align: center;
          width: 100%;
        }
        
        .testimonial-slider .slick-dots li {
          width: 12px;
          height: 12px;
          margin: 0 5px;
        }
        
        .testimonial-slider .slick-dots li button {
          width: 12px;
          height: 12px;
          padding: 0;
        }
        
        .testimonial-slider .slick-dots li button:before {
          font-size: 0;
          width: 10px;
          height: 10px;
          background: #dee2e6;
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s ease;
          content: '';
          top: 1px;
          left: 1px;
        }
        
        .testimonial-slider .slick-dots li.slick-active button:before {
          background: #007bff;
          transform: scale(1.2);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;
