# Deployment Guide - Samarth Clinic Website

This guide covers deploying the Samarth Clinic Next.js website to production.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
Vercel is the easiest way to deploy Next.js applications.

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables**
   ```
   NEXT_PUBLIC_BACKEND_URL=https://samarthclinics.onrender.com/api
   NEXT_PUBLIC_PROD_BACKEND_URL=https://samarthclinics.onrender.com/api
   ```

### Option 2: Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Option 3: Traditional Hosting
1. Build the project: `npm run build`
2. Upload the build files to your hosting provider
3. Configure your web server (Apache/Nginx)

## 🔧 Pre-Deployment Checklist

### Environment Setup
- [ ] Set production API URLs
- [ ] Configure domain-specific metadata
- [ ] Update Google Analytics/tracking codes
- [ ] Set up error monitoring (Sentry)

### Performance Optimization
- [ ] Compress images and convert to WebP
- [ ] Enable CDN for static assets
- [ ] Configure caching headers
- [ ] Set up monitoring and analytics

### Security
- [ ] Enable HTTPS
- [ ] Configure security headers
- [ ] Set up rate limiting
- [ ] Review and test authentication flows

### SEO & Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google My Business listing
- [ ] Set up Google Analytics 4
- [ ] Configure social media meta tags

## 🌐 Domain Configuration

### Custom Domain Setup
1. **Purchase Domain**: Register `samarthclinics.com` or similar
2. **DNS Configuration**:
   ```
   A Record: @ → Vercel IP
   CNAME: www → samarthclinics.com
   ```
3. **SSL Certificate**: Automatically handled by Vercel/Netlify

### Subdomain Options
- `www.samarthclinics.com` - Main website
- `api.samarthclinics.com` - Backend API
- `admin.samarthclinics.com` - Admin dashboard

## 📊 Monitoring & Analytics

### Essential Tracking
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'Samarth Clinic',
  page_location: window.location.href
});

// Facebook Pixel (optional)
fbq('track', 'PageView');
```

### Performance Monitoring
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Uptime Monitoring**: Use services like UptimeRobot
- **Error Tracking**: Implement Sentry or similar

## 🔄 CI/CD Pipeline

### Automated Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 🗄️ Database & Backend

### Backend Deployment
The existing backend is deployed on Render:
- **URL**: `https://samarthclinics.onrender.com`
- **Database**: MongoDB Atlas
- **Authentication**: JWT tokens

### Database Backup
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/samarth"

# Automated daily backups
crontab -e
0 2 * * * /path/to/backup-script.sh
```

## 📱 Mobile App Considerations

### PWA Features
The website includes PWA capabilities:
- Service worker for offline functionality
- App manifest for "Add to Home Screen"
- Push notifications (future enhancement)

### Mobile Optimization
- Touch-friendly interface
- Fast loading on mobile networks
- Optimized images for mobile devices

## 🔍 SEO Optimization

### Technical SEO
- [x] Structured data markup
- [x] XML sitemap
- [x] Robots.txt
- [x] Meta descriptions
- [x] Open Graph tags

### Local SEO
- [ ] Google My Business optimization
- [ ] Local directory submissions
- [ ] Location-based keywords
- [ ] Customer reviews management

## 🚨 Emergency Procedures

### Rollback Plan
```bash
# Quick rollback to previous version
vercel --prod --confirm

# Or manual rollback
git revert HEAD
git push origin main
```

### Backup Procedures
- **Code**: GitHub repository
- **Database**: MongoDB Atlas automatic backups
- **Assets**: CDN with versioning

## 📞 Support & Maintenance

### Regular Maintenance
- **Weekly**: Check uptime and performance
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review analytics and optimize

### Emergency Contacts
- **Developer**: [Your contact information]
- **Hosting**: Vercel/Netlify support
- **Domain**: Domain registrar support

## 📈 Growth & Scaling

### Traffic Growth Planning
- **CDN**: Cloudflare for global performance
- **Caching**: Redis for session management
- **Load Balancing**: Multiple server instances

### Feature Expansion
- Online payment integration
- Telemedicine capabilities
- Patient portal
- Mobile app development

---

**Deployment Status**: ✅ Ready for Production
**Last Updated**: March 2026
**Next Review**: Quarterly