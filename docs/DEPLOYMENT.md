# LvlUp Deployment Guide

## Web Deployment (Vercel)

### Prerequisites
- GitHub account (already set up ✅)
- Vercel account (free at vercel.com)
- GitHub repo connected to Vercel

### Steps

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Select your LvlUp project
   - Settings → Environment Variables
   - Add your Firebase credentials

3. **Deploy**
   ```bash
   git push origin main
   ```
   Vercel will automatically deploy on every push!

### Live URL
`https://lvlup.vercel.app`

---

## Mobile Deployment

### iOS (App Store)

1. Install EAS CLI: `npm install -g eas-cli`
2. Create Apple Developer Account ($99/year)
3. Build: `cd mobile && eas build --platform ios`
4. Submit: `eas submit --platform ios`

### Android (Play Store)

1. Create Google Play Account ($25 one-time)
2. Build: `cd mobile && eas build --platform android`
3. Submit: `eas submit --platform android`

---

## PWA Setup

The app is already configured as a PWA!
- Install from browser menu
- Works offline
- No App Store submission needed

---

## Custom Domain

1. Buy domain (GoDaddy, Namecheap, etc.)
2. Vercel Dashboard → Domains
3. Add your domain
4. Follow DNS configuration
5. Wait 24-48 hours

---

## Monitoring

- Vercel Analytics
- Firebase Console
- GitHub Actions logs
