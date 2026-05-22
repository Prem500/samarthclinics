# Samarth Clinic - Modern Physiotherapy Website

A modern, responsive Next.js website for Samarth Clinic, a professional physiotherapy and rehabilitation center in Dehri.

## 🚀 Features

- **Modern Design**: Clean, professional medical theme with blue/teal color palette
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper metadata, structured data, and search engine optimization
- **Fast Performance**: Built with Next.js 16 and optimized for speed
- **Accessibility**: WCAG compliant design with proper semantic HTML
- **Interactive**: Smooth animations and transitions with Framer Motion

## 📄 Pages

- **Homepage** (`/`) - Hero section, services overview, about, testimonials, contact
- **About** (`/about`) - Clinic history, team, values, and achievements
- **Services** (`/services`) - Comprehensive list of physiotherapy services
- **Contact** (`/contact`) - Contact information, map, FAQ, and emergency contact
- **Doctor Auth** (`/doctor-auth`) - Secure authentication for medical professionals

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios

## 🏥 Services Featured

### Core Services
- Physiotherapy
- Rehabilitation
- Home Physiotherapy
- Speech Therapy
- Occupational Therapy
- Neuro Rehabilitation

### Specialized Programs
- **Orthopedic Physiotherapy**: Joint rehabilitation, post-surgical care, shoulder treatment
- **Neurological Physiotherapy**: Stroke rehabilitation, neurological condition management
- **Sports Physiotherapy**: Athlete rehabilitation, performance enhancement
- **Pediatric Physiotherapy**: Developmental therapy, neurological care for children

## 📱 Key Features

### Patient Experience
- Online appointment booking
- WhatsApp integration for quick contact
- Interactive Google Maps integration
- Patient testimonials and reviews
- Emergency contact options

### Professional Features
- Doctor authentication system
- Admin firewall protection
- Appointment management
- Patient data handling
- Secure backend integration

## 🎨 Design Highlights

- **Medical Theme**: Professional blue and teal color scheme
- **Typography**: Clean, readable fonts (Inter & Poppins)
- **Components**: Reusable UI components with consistent styling
- **Animations**: Subtle, professional animations that enhance UX
- **Mobile Optimization**: Touch-friendly interface for mobile users

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api
NEXT_PUBLIC_PROD_BACKEND_URL=https://samarthclinics.onrender.com/api
```

## 🌐 Backend Integration

The frontend integrates with a Node.js/Express backend for:
- Doctor authentication
- Appointment booking
- Patient management
- Prescription handling

### API Endpoints Used
- `POST /auth/doctor/login` - Doctor login
- `POST /auth/doctor/register` - Doctor registration
- `POST /auth/admin-firewall` - Admin verification
- `POST /booking/create` - Create appointment
- `GET /role/doctors` - Get doctor information

## 📊 SEO & Performance

- **Metadata**: Comprehensive meta tags for all pages
- **Structured Data**: JSON-LD for better search engine understanding
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Proper search engine directives
- **Performance**: Optimized images, lazy loading, and efficient bundling

## 🔒 Security Features

- Admin firewall for doctor authentication
- Input validation and sanitization
- Secure token-based authentication
- Protected routes and API endpoints

## 📞 Contact Information

**Samarth Clinic**
- **Address**: Canal Road, Near Sunil Bose, Dehri
- **Phone**: +91 7004119766
- **Email**: Samarthclinic.info@gmail.com
- **Hours**: Monday-Saturday 9:00 AM - 8:00 PM

## 👨‍⚕️ Medical Team

- **Dr. Prem Prakash** - Senior Physiotherapist (BPT)
- **Dr. Nikita Chauhan** - Consultant Physiotherapist (BPT, MPT)

## 📈 Business Impact

This modern website provides:
- Professional online presence
- Improved patient experience
- Better search engine visibility
- Mobile accessibility for all users
- Streamlined appointment booking
- Enhanced credibility and trust

## 🚀 Deployment

The application can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📝 License

This project is proprietary software developed for Samarth Clinic.

---

**Built with ❤️ for better healthcare accessibility**