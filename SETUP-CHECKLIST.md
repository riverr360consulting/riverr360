# Quick Setup Checklist

## Before You Start
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] GitHub account created
- [ ] Vercel account created (free)

## Initial Setup (10 minutes)

### 1. Install Dependencies
```bash
cd riverr360-consulting
npm install
```

### 2. Set Up Contact Form (5 minutes)
1. Go to https://web3forms.com
2. Sign up (free, no credit card)
3. Copy your access key
4. Open `components/ContactForm.tsx`
5. Line 22: Replace `YOUR_ACCESS_KEY_HERE` with your key
6. Save the file

### 3. Test Locally
```bash
npm run dev
```
- Open http://localhost:3000
- Check all pages load
- Test contact form
- Visit http://localhost:3000/keystatic to see CMS

## Customization (30 minutes)

### Update Business Information

1. **Company Details** - Edit `components/Footer.tsx`
   - [ ] Update email address
   - [ ] Update phone number
   - [ ] Add physical address (if needed)

2. **Profile Page** - Edit `app/profile/page.tsx`
   - [ ] Add your name
   - [ ] Add your title/credentials
   - [ ] Update bio
   - [ ] Update expertise areas
   - [ ] Update certifications
   - [ ] Add profile photo

3. **Case Studies** - Edit `app/case-studies/page.tsx`
   - [ ] Add real case study data
   - [ ] Or use CMS to add case studies

4. **Colors/Branding** - Edit `tailwind.config.ts`
   - [ ] Change primary colors to match your brand
   - [ ] Update if needed

### Content via CMS (Recommended)

1. Run `npm run dev`
2. Go to http://localhost:3000/keystatic
3. Update:
   - [ ] Home page hero text
   - [ ] Revenue leakage explanation
   - [ ] Your profile information
   - [ ] Add case studies

## Deploy to Vercel (15 minutes)

### Option A: GitHub + Vercel (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create repo on GitHub.com**
   - Click "New repository"
   - Name it "riverr360-consulting"
   - Don't initialize with README
   - Copy the repository URL

3. **Push to GitHub**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your "riverr360-consulting" repository
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! Your site is live

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Post-Deployment (10 minutes)

### 1. Test Live Site
- [ ] Visit your Vercel URL
- [ ] Check all pages work
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Test navigation

### 2. Add Custom Domain (Optional)

1. **Buy a domain** (Namecheap, GoDaddy, etc.)
   - Recommended: riverr360.com or riverr360consulting.com
   - Cost: ~$12/year

2. **Add to Vercel**
   - In Vercel dashboard, go to your project
   - Settings → Domains
   - Add your domain
   - Follow DNS setup instructions
   - Wait 24-48 hours for DNS propagation

### 3. Set Up Analytics

**Vercel Analytics** (Automatic - Free)
- Already enabled when deployed to Vercel
- View in Vercel dashboard → Analytics

**Google Analytics** (Optional)
- Create GA4 property
- Add tracking code (see README.md)

### 4. Submit to Search Engines

```bash
# Generate sitemap automatically
# Next.js will create this at /sitemap.xml
```

Submit to:
- [ ] Google Search Console
- [ ] Bing Webmaster Tools

## Maintenance

### Update Content
1. Edit via Keystatic CMS: http://your-domain.com/keystatic
2. Or edit files directly
3. Commit and push to GitHub
4. Vercel auto-deploys in ~2 minutes

### Monitor Performance
- Check Vercel Analytics weekly
- Monitor contact form submissions
- Review SEO performance in Search Console

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Hosting | $0/month | Free tier (100GB bandwidth) |
| Web3Forms | $0/month | Unlimited form submissions |
| Vercel Analytics | $0/month | Built-in |
| Domain Name | ~$12/year | Only required cost |
| **Total** | **~$1/month** | Just the domain! |

## Troubleshooting

### Contact form not working
- Check Web3Forms access key is correct
- Check console for errors
- Verify email in Web3Forms dashboard

### Changes not showing on live site
- Check if you pushed to GitHub
- Vercel auto-deploys from main branch
- Check Vercel dashboard for deployment status

### Build failing on Vercel
- Check build logs in Vercel
- Test `npm run build` locally first
- Ensure all dependencies are in package.json

### CMS not accessible
- Keystatic works in development mode
- For production, you need to enable it or use GitHub as CMS storage

## Support Resources

- Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
- Keystatic docs: https://keystatic.com/docs
- Vercel docs: https://vercel.com/docs
- Web3Forms docs: https://docs.web3forms.com

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Deployment
git add .
git commit -m "Your message"
git push             # Auto-deploys to Vercel

# Troubleshooting
rm -rf .next node_modules
npm install
npm run build
```

---

## Success Checklist

Before going live, ensure:
- [ ] All pages load correctly
- [ ] Contact form works and sends to your email
- [ ] All business information is updated
- [ ] Profile page has your information
- [ ] Case studies are added (at least 2-3)
- [ ] Mobile navigation works
- [ ] All CTAs link to correct pages
- [ ] Footer has correct contact info
- [ ] Site is live on Vercel
- [ ] Custom domain added (optional)
- [ ] Analytics tracking works

**Estimated Total Setup Time: 1-2 hours**

Congratulations! Your site is live! 🎉
