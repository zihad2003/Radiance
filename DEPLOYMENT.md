# Radiance Salon - Deployment Guide

This application is built with React 19 (Vite) and Convex.

## 1. Prerequisites

- Node.js 20+
- npm 10+
- A Convex account (https://convex.dev)

## 2. Environment Setup

Copy `env.example` to `.env.local` for local development or set these variables in your CI/CD pipeline.

```bash
VITE_CONVEX_URL=https://your-instance.convex.cloud
```

## 3. Deploy to Vercel (Recommended)

1. **Push code** to GitHub/GitLab/Bitbucket.
2. **Import project** in Vercel.
3. **Build Settings**:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables**:
   - Add `VITE_CONVEX_URL` from your Convex Settings.

## 4. Deploy to Netlify

1. **Push code** to Git provider.
2. **New Site from Git** in Netlify.
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Environment Variables**:
   - Add `VITE_CONVEX_URL`.

## 5. Docker Deployment

To self-host using Docker:

1. **Build the image**:
   ```bash
   docker build -t radiance-salon .
   ```

2. **Run the container**:
   ```bash
   docker run -p 80:80 \
     -e VITE_CONVEX_URL=https://your-instance.convex.cloud \
     radiance-salon
   ```
   *Note: Since Vite embeds env vars at build time, for dynamic Docker env vars, you might need to mount a config file or rebuild per environment.*

## 6. Production Checklist

- [ ] **Custom Domain**: Configured in Vercel/Netlify.
- [ ] **SSL**: Automatic on Vercel/Netlify.
- [ ] **SEO**: Verify `robots.txt` and `sitemap.xml` (using `vite-plugin-sitemap` or manual).
- [ ] **Performance**: `npm run build` triggers optimization. Check Lighthouse score.
- [ ] **Analytics**: Configure Google Analytics if needed.
