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

  const mainServices = [
    { img: "images/img_44.webp", title: "Physiotherapy", desc: "Comprehensive physiotherapy services: pain relief, rehabilitation and wellness, tailored for your better health and mobility." },
    { img: "images/img_22.jpg", title: "Rehabilitation", desc: "Rehabilitation excellence: aligning the spine, relieving pain and promoting holistic wellness for a healthy, active life." },
    { img: "images/img_555.jpg", title: "Cupping Therapy", desc: "Enhance wellness with cupping therapy: promote blood circulation, reduce pain and experience deep relief and rejuvenation." },
    { img: "images/dryneedling.jpg", title: "Dry Needling", desc: "Expert dry needling care: targets muscle pain and tension, improves comfort and mobility." }
  ];

  const serviceCategories = [
    {
      title: "Orthopedic Physiotherapy",
      services: [
        { img: "images/orthopedic-1.png", title: "Joint Rehabilitation", desc: "Specialized treatment for bone, muscle and joint injuries and conditions, improving your mobility and quality of life." },
        { img: "images/orthopedic-2.png", title: "Post-Surgical Rehabilitation", desc: "Specialized post-surgery care that ensures rapid recovery and optimal function." },
        { img: "images/orthopedic-3.png", title: "Shoulder Rehabilitation", desc: "Targeted treatment for shoulder pain and injuries, including rotator cuff, frozen shoulder and fractures." }
      ]
    },
    {
      title: "Neurological Physiotherapy",
      services: [
        { img: "images/neurological-1.png", title: "Stroke Rehabilitation", desc: "Treatments and exercises specifically designed to restore movement and functional abilities after stroke." },
        { img: "images/neurological-2.png", title: "Neurological Condition Management", desc: "Support and management for Parkinson's, Multiple Sclerosis and other neurological conditions." }
      ]
    },
    {
      title: "Rehabilitation Services",
      services: [
        { img: "images/rehabilation-1.png", title: "Sports Injury Rehabilitation", desc: "Specialized rehabilitation programs to safely return athletes and active individuals to sports." },
        { img: "images/rehabilation-2.png", title: "Return to Work Programs", desc: "Programs designed to help employees return to work safely and effectively after workplace injuries." }
      ]
    },
    {
      title: "Pediatric Physiotherapy",
      services: [
        { img: "images/pediatric-1.png", title: "Child Developmental Therapy", desc: "Specially designed to support motor skills development and developmental milestones for children." },
        { img: "images/pediatric-2.png", title: "Pediatric Neuro Rehabilitation", desc: "Specialized physiotherapy support for children with cerebral palsy and other neurological conditions." },
        { img: "images/pediatric-3.png", title: "Pediatric Bone Management", desc: "Specialized support and treatment for bone and joint issues in growing children." }
      ]
    },
    {
      title: "Sports Physiotherapy",
      services: [
        { img: "images/sports-1.png", title: "Athlete Rehabilitation", desc: "Specialized rehabilitation services for athletes focusing on performance restoration and injury prevention." },
        { img: "images/sports-2.png", title: "Sport-Specific Training", desc: "Conditioning and injury prevention programs tailored for specific sports." },
        { img: "images/sports-3.png", title: "Performance Enhancement", desc: "Advanced techniques and programs to optimize athlete performance." }
      ]
    }
  ];

  const coreServices = [
    { icon: "flaticon-first-aid-kit", title: "Comprehensive Physiotherapy", desc: "Our comprehensive physiotherapy services include various therapeutic methods and treatments designed to relieve pain, improve range of motion and promote general function." },
    { icon: "flaticon-balance", title: "Chiropractic Care", desc: "Our chiropractic care services focus on restoring spinal alignment and improving nervous system function, promoting your body's natural healing abilities." },
    { icon: "flaticon-fitness", title: "Rehabilitation", desc: "Our rehabilitation program is designed to help you recover from injuries, focusing on personalized exercises and therapies to restore strength, flexibility and function." }
  ];

  const testimonials = [
    { name: "Aditya Kumar", img: "images/person_1.jpg", text: "I am very happy with the care at Samarth Clinic. My pain has improved a lot and my mobility has also increased. I appreciate the quality of care here." },
    { name: "Sapna Verma", img: "images/person_2.jpg", text: "The team at Samarth Clinic is very professional and supportive. Their treatment for my back pain has been extremely effective. I definitely recommend their services." },
    { name: "Rajesh Sharma", img: "images/person_3.jpg", text: "My experience at Samarth Clinic has been wonderful. Their comprehensive rehabilitation services have helped me a lot in recovering from injury. I am very grateful for their dedication and expertise." }
  ];

  const blogPosts = [
    { img: "images/img_1.jpg", title: "Benefits of Physiotherapy", desc: "Physiotherapy plays an important role in helping to get pain relief, increase mobility and recover from injuries. Learn more about its benefits on our blog." },
    { img: "images/img_2.jpg", title: "Benefits of Chiropractic Care", desc: "Chiropractic care helps improve spinal alignment and promote nervous system function. Learn more about its benefits from our experts." },
    { img: "images/img_3.jpg", title: "Importance of Rehabilitation", desc: "Rehabilitation plays an important role in recovering from injuries and restoring normal function. Learn more about the importance of rehabilitation on our blog." }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (typedRef.current) {
      typed.current = new Typed(typedRef.current, {
        strings: ["years of old pain", "years of old stress", "years of old fatigue", "incurable diseases"],
        typeSpeed: 80, backSpeed: 80, backDelay: 4000, startDelay: 1000, loop: true, showCursor: true
      });
    }
    return () => typed.current?.destroy();
  }, []);

  const ServiceCard = ({ service, colClass = "col-md-4 mb-4" }) => (
    <div className={colClass}>
      <div className="block-service-1-card h-100">
        <a href="#" className="thumbnail-link d-block mb-4">
          <img src={service.img} alt={service.title} className="img-fluid" />
        </a>
        <h3 className="block-service-1-heading mb-3"><a href="#">{service.title}</a></h3>
        <div className="block-service-1-excerpt"><p>{service.desc}</p></div>
        <p><a href="#" className="d-inline-flex align-items-center block-service-1-more">
          <span></span> <span className="icon-keyboard_arrow_right icon"></span>
        </a></p>
      </div>
    </div>
  );

  const ServiceSection = ({ icon, title, desc }) => (
    <div className="col-md-6 col-lg-4 mb-4 mb-lg-4">
      <div className="block-service-2 d-flex">
        <div className="icon"><span className={icon}></span></div>
        <div className="text">
          <h3 className="block-service-2-heading">{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="site-wrap">
      <TopBar />

      {/* Hero Section */}
      <div className="site-blocks-cover overlay" style={{ backgroundImage: "url(images/hero_bg_11.webp)" }} data-aos="fade">
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-md-10">
              <div className="row justify-content-center mb-4">
                <div className="col-md-10 text-center">
                  <h1 data-aos="fade-up" className="mb-5">
                    We treat your <span className="text-pink-400" ref={typedRef}></span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="100">
                    <a href="/#appointments" className="btn btn-primary btn-pill">Get Started</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Section */}
      <div className="site-section block-services-1">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="site-section-heading text-center font-secondary text-black">Our Services</h2>
            </div>
          </div>
          <div className="row">
            {mainServices.map((service, index) => (
              <ServiceCard key={index} service={service} colClass="mb-4 mb-lg-4 col-sm-6 col-md-6 col-lg-3" />
            ))}
          </div>
        </div>
      </div>

      {/* Specialized Services Section */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="site-section-heading text-center font-secondary text-black">Specialized Physiotherapy Services</h2>
              <p className="lead">Our expert physiotherapy services are tailored for various conditions and needs</p>
            </div>
          </div>
          {serviceCategories.map((category, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-black mb-4 border-bottom pb-2">{category.title}</h3>
              <div className="row">
                {category.services.map((service, serviceIndex) => (
                  <ServiceCard key={serviceIndex} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="block-half-content-1 d-block d-lg-flex mt-5">
        <div className="block-half-content-img" style={{ backgroundImage: 'url("images/hero_bg_11.webp")' }}></div>
        <div className="block-half-content-text bg-primary">
          <div className="block-half-content-text-inner">
            <h2 className="block-half-content-heading mb-4">Why Choose Us</h2>
            <div className="block-half-content-excerpt">
              <p className="lead">
                Choose us for expert physiotherapy, chiropractic and alignment services, where personalized care, holistic approach and cutting-edge techniques ensure your wellness and pain relief.
              </p>
            </div>
          </div>
          <div className="block-counter-1 section-counter">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="block-counter-1-item">
                  <span className="number text-3xl font-bold text-white">
                    <span className="block-counter-1-number text-3xl font-bold text-white" ref={experienceCounter.countRef} data-number="14">
                      {experienceCounter.count}
                    </span>+
                  </span>
                  <span className="text-xl font-semibold text-white">Years Experience</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="block-counter-1-item">
                  <span className="number text-3xl font-bold text-white">
                    <span className="text-3xl font-bold text-white" ref={usersCounter.countRef} data-number="4500">
                      {usersCounter.count}
                    </span>+
                  </span>
                  <span className="text-xl font-semibold text-white">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <img src="images/img_111.webp" alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2 className="site-section-heading text-black">About Us</h2>
              <p className="lead">
                Welcome to Samarth Clinic, where we prioritize your health and well-being. With expertise, compassion and advanced techniques, we are dedicated to providing specialized and effective physiotherapy and chiropractic care. Our goal is to provide pain relief, improve mobility and promote overall health.
              </p>
              <p>
                Our team of experts includes experienced physiotherapists and chiropractic physicians, dedicated to providing personalized care and attention to each patient. We believe in understanding each patient's specific needs and goals to develop a personalized treatment plan.
              </p>
              <p>
                Please contact us or visit our website for more information. Our aim is to provide the best possible care and help you achieve the best possible health.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Services Section */}
      <div className="site-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center">
              <h2 className="site-section-heading font-secondary text-black">Our Services</h2>
            </div>
          </div>
          <div className="row align-items-stretch">
            {coreServices.map((service, index) => (
              <ServiceSection key={index} {...service} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="site-section block-13 bg-primary fixed overlay-primary bg-image" style={{ backgroundImage: 'url("images/hero_bg_11.webp")' }}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <div className="block-heading-1" data-aos="fade-up">
                <h2 className="text-white">Why Choose Us</h2>
                <p className="text-white">
                  Choose us for expert physiotherapy, chiropractic and alignment services, where personalized care, holistic approach and cutting-edge techniques ensure your wellness and pain relief.
                </p>
              </div>
            </div>
          </div>
          <div className="owl-carousel nonloop-block-13">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <div className="block-testimony-1 text-center rounded">
                  <blockquote className="mb-4">
                    <p>&ldquo; {testimonial.text} &rdquo;</p>
                  </blockquote>
                  <figure>
                    <img src={testimonial.img} alt="Image" className="img-fluid rounded-circle mx-auto" />
                  </figure>
                  <h3 className="font-size-20 text-white">{testimonial.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="site-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center">
              <h2 className="site-section-heading font-secondary text-black">Blog</h2>
            </div>
          </div>
          <div className="row">
            {blogPosts.map((post, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-5">
                <div className="block-blog-1 card h-100">
                  <a href="#"><img src={post.img} alt="Image" className="img-fluid" /></a>
                  <div className="card-body">
                    <h3><a href="#">{post.title}</a></h3>
                    <p>{post.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section 
      <div className="site-section bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center mb-5 mb-md-0">
              <img src="images/person_2.jpg" alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2 className="site-section-heading text-white mb-3">Meet Our Professionals</h2>
              <p className="lead">
                Our expert physiotherapists and chiropractic physicians are highly qualified and committed to providing the best care to each patient.
              </p>
              <p>They specialize in pain management, rehabilitation, and promoting general health and wellness.</p>
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
                  <h2 className="footer-heading mb-4">About Us</h2>
                  <p>
                    At Samarth Clinic, we provide the highest quality physiotherapy and chiropractic services for your health and well-being. Our goal is to improve your quality of life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>*/}
    </div>
  );
};

export default Services;