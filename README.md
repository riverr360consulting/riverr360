# Riverr360 Consulting Website

A lightweight, SEO-optimized website for revenue leakage consulting services.

## Tech Stack (100% Free)

- **Frontend**: Next.js 14 with App Router + TypeScript + Tailwind CSS
- **CMS**: Keystatic (file-based, no database needed)
- **Hosting**: Vercel (free tier)
- **Forms**: Web3Forms (unlimited free)
- **Analytics**: Vercel Analytics (free)

**Total Monthly Cost: $0** (only domain registration ~$12/year)

## Features

- ✅ SEO-optimized with metadata and structured data
- ✅ Fully responsive design
- ✅ Homepage with multiple CTA sections
- ✅ Profile/About page
- ✅ Case studies (listing + detail pages)
- ✅ Contact form with validation
- ✅ Easy content management with Keystatic CMS
- ✅ Fast performance with static generation
- ✅ Mobile-friendly navigation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account (for deployment)

### Installation

1. **Clone or download this project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Web3Forms (for contact form)**
   - Go to https://web3forms.com
   - Sign up for free
   - Get your access key
   - Open `components/ContactForm.tsx`
   - Replace `YOUR_ACCESS_KEY_HERE` with your actual key

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

5. **Access the CMS**
   - Go to http://localhost:3000/keystatic
   - Edit content directly in the browser
   - Content is saved as files in the `content/` folder

## Project Structure

```
riverr360-consulting/
├── app/
│   ├── page.tsx              # Homepage
│   ├── profile/page.tsx      # About/Profile page
│   ├── case-studies/page.tsx # Case studies listing
│   ├── contact/page.tsx      # Contact page
│   ├── keystatic/            # CMS admin interface
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Navigation
│   ├── Footer.tsx            # Footer
│   ├── CTAButton.tsx         # Reusable CTA button
│   ├── HeroSection.tsx       # Homepage hero
│   ├── LeakageExplained.tsx  # Explanation section
│   ├── ReasonsSection.tsx    # Reasons for leakage
│   ├── SolutionsSection.tsx  # Solutions offered
│   └── ContactForm.tsx       # Contact form
├── content/                  # CMS content (created automatically)
├── keystatic.config.tsx      # CMS configuration
├── tailwind.config.ts        # Tailwind CSS config
├── next.config.js            # Next.js config
└── package.json              # Dependencies
```

## Customization

### Update Content

1. **Using the CMS** (Recommended)
   - Run `npm run dev`
   - Visit http://localhost:3000/keystatic
   - Edit homepage content, profile, and case studies

2. **Directly in Files**
   - Edit components in `components/` folder
   - Update page content in `app/` folder

### Update Colors

Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: {
    // Change these values
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  }
}
```

### Add New Pages

Create new folders in `app/` directory:
```bash
app/
  new-page/
    page.tsx
```

## Deployment to Vercel (Free)

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Done! Your site is live

### Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## SEO Optimization

### Implemented SEO Features

- ✅ Semantic HTML structure
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Responsive images
- ✅ Fast loading with static generation
- ✅ Mobile-friendly design
- ✅ Clean URLs

### Add Your Domain

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard, go to your project
3. Settings → Domains
4. Add your custom domain
5. Update DNS records as instructed

## Content Management

### Adding Case Studies

1. Go to http://localhost:3000/keystatic
2. Click "Case Studies"
3. Click "Create Case Study"
4. Fill in the fields
5. Click "Save"
6. Content is saved to `content/case-studies/`

### Editing Homepage

1. Go to http://localhost:3000/keystatic
2. Click "Home Page"
3. Edit hero headline, subheadline, CTA text
4. Click "Save"

### Editing Profile

1. Go to http://localhost:3000/keystatic
2. Click "Profile Page"
3. Edit your bio, expertise, certifications
4. Click "Save"

## Analytics Setup (Optional)

### Vercel Analytics (Free)
- Already built-in when you deploy to Vercel
- No setup needed
- Privacy-friendly, no cookies

### Google Analytics (Free)
1. Get your GA4 tracking ID
2. Create `app/GoogleAnalytics.tsx`:
   ```tsx
   import Script from 'next/script'
   
   export default function GoogleAnalytics({ GA_ID }: { GA_ID: string }) {
     return (
       <>
         <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
         <Script id="google-analytics">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${GA_ID}');
           `}
         </Script>
       </>
     )
   }
   ```
3. Add to `app/layout.tsx`

## Performance

The site is optimized for performance:
- Static generation where possible
- Image optimization
- CSS purging with Tailwind
- Minimal JavaScript

Expected Lighthouse scores:
- Performance: 90+
- SEO: 95+
- Accessibility: 90+
- Best Practices: 95+

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### CMS not loading
- Make sure you're running `npm run dev`
- Clear browser cache
- Check console for errors

## Support

For questions or issues:
- Check the documentation
- Review the code comments
- Search GitHub issues for similar problems

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Set up Web3Forms key in ContactForm.tsx
3. ✅ Run dev server: `npm run dev`
4. ✅ Customize content via Keystatic CMS
5. ✅ Update colors/branding in tailwind.config.ts
6. ✅ Add your business information
7. ✅ Test contact form
8. ✅ Push to GitHub
9. ✅ Deploy to Vercel
10. ✅ Add custom domain

## License

This is a custom project for Riverr360 Consulting.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
