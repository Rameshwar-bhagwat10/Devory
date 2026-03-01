# 🚀 Devory - Production Deployment Guide

## Quick Start Deployment (30 minutes)

This guide will walk you through deploying Devory to production on Vercel.

---

## Prerequisites

- [x] Vercel account (free tier works)
- [x] GitHub repository with Devory code
- [x] Supabase database (already configured)
- [x] Google Cloud Console access
- [x] GitHub Developer Settings access

---

## Step 1: Generate Production Secrets (5 min)

### 1.1 Generate AUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output - you'll need it for Vercel environment variables.

**Example output:**
```
Eq2XYIpa41fLcTRrdmUHH/ylIqPSq1zgjEN+J1yENhE=
```

---

## Step 2: Configure Google OAuth for Production (10 min)

### 2.1 Go to Google Cloud Console
https://console.cloud.google.com/apis/credentials

### 2.2 Create OAuth 2.0 Client ID
1. Click "Create Credentials" → "OAuth 2.0 Client ID"
2. Application type: "Web application"
3. Name: "Devory Production"

### 2.3 Add Authorized Redirect URIs
```
https://your-domain.vercel.app/api/auth/callback/google
https://your-custom-domain.com/api/auth/callback/google
```

### 2.4 Save Credentials
- Copy `Client ID`
- Copy `Client Secret`

---

## Step 3: Configure GitHub OAuth for Production (5 min)

### 3.1 Go to GitHub Developer Settings
https://github.com/settings/developers

### 3.2 Create New OAuth App
1. Click "New OAuth App"
2. Application name: "Devory Production"
3. Homepage URL: `https://your-domain.vercel.app`
4. Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`

### 3.3 Generate Client Secret
1. Click "Generate a new client secret"
2. Copy `Client ID`
3. Copy `Client Secret`

---

## Step 4: Deploy to Vercel (10 min)

### 4.1 Import Project
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Next.js" framework preset

### 4.2 Configure Environment Variables

Add these in Vercel dashboard (Settings → Environment Variables):

```bash
# Database (Supabase)
DATABASE_URL=postgresql://postgres.fgsdbxybscoolwenytjk:%23iamram19022006@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20&pool_timeout=30

DIRECT_URL=postgresql://postgres.fgsdbxybscoolwenytjk:%23iamram19022006@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://fgsdbxybscoolwenytjk.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnc2RieHlic2Nvb2x3ZW55dGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MTk2NzEsImV4cCI6MjA4NjI5NTY3MX0.oa0bMcxQhsV-Uy1RF0QRrZblMrwVryFkQi1wgoyx3Cs

# Auth.js (use the secret you generated in Step 1)
AUTH_SECRET=<YOUR_GENERATED_SECRET_FROM_STEP_1>

# IMPORTANT: Update this after deployment
NEXTAUTH_URL=https://your-project.vercel.app

# Google OAuth (from Step 2)
GOOGLE_CLIENT_ID=<YOUR_PRODUCTION_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_PRODUCTION_GOOGLE_CLIENT_SECRET>

# GitHub OAuth (from Step 3)
GITHUB_CLIENT_ID=<YOUR_PRODUCTION_GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<YOUR_PRODUCTION_GITHUB_CLIENT_SECRET>

# OpenAI (optional - leave empty for now)
OPENAI_API_KEY=
```

**Important:** Mark all secrets as "Sensitive" in Vercel

### 4.3 Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Note your deployment URL: `https://your-project.vercel.app`

---

## Step 5: Update OAuth Redirect URIs (5 min)

### 5.1 Update Google OAuth
1. Go back to Google Cloud Console
2. Edit your OAuth client
3. Update redirect URI with actual Vercel URL:
   ```
   https://your-actual-project.vercel.app/api/auth/callback/google
   ```

### 5.2 Update GitHub OAuth
1. Go back to GitHub Developer Settings
2. Edit your OAuth app
3. Update callback URL with actual Vercel URL:
   ```
   https://your-actual-project.vercel.app/api/auth/callback/github
   ```

### 5.3 Update NEXTAUTH_URL in Vercel
1. Go to Vercel dashboard → Settings → Environment Variables
2. Edit `NEXTAUTH_URL`
3. Update to: `https://your-actual-project.vercel.app`
4. Redeploy (Vercel will prompt you)

---

## Step 6: Run Database Migrations (Optional)

If this is a fresh database:

```bash
# Set production database URL
export DATABASE_URL="postgresql://postgres.fgsdbxybscoolwenytjk:%23iamram19022006@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres"

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npm run db:seed
```

---

## Step 7: Verify Deployment (5 min)

### 7.1 Test Authentication
1. Visit your production URL
2. Click "Get Started" or "Sign In"
3. Test Google OAuth login
4. Complete onboarding flow
5. Verify dashboard loads

### 7.2 Test Core Features
- [ ] Browse projects
- [ ] View project details
- [ ] Save a project
- [ ] View community feed
- [ ] Create a post
- [ ] View profile

### 7.3 Check Performance
- [ ] Pages load in < 1 second
- [ ] Images load properly
- [ ] No console errors
- [ ] Mobile responsive

---

## Step 8: Configure Custom Domain (Optional)

### 8.1 Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 8.2 Update Environment Variables
1. Update `NEXTAUTH_URL` to custom domain
2. Update OAuth redirect URIs to custom domain
3. Redeploy

---

## Troubleshooting

### Issue: "Configuration mismatch" error on login

**Solution:**
1. Verify `NEXTAUTH_URL` matches your actual domain
2. Check OAuth redirect URIs are correct
3. Redeploy after changes

### Issue: Database connection errors

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Check Supabase database is running
3. Verify connection pooling settings

### Issue: Images not loading

**Solution:**
1. Check `next.config.ts` has correct image domains
2. Verify Google profile images are allowed
3. Check network tab for CORS errors

### Issue: Build fails on Vercel

**Solution:**
1. Check build logs for specific errors
2. Verify all environment variables are set
3. Try building locally first: `npm run build`

---

## Post-Deployment Checklist

- [ ] Authentication working (Google OAuth)
- [ ] All pages accessible
- [ ] Database connections working
- [ ] Images loading correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance acceptable (< 1s load)
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)

---

## Monitoring & Maintenance

### Enable Vercel Analytics
1. Go to Project → Analytics
2. Enable Web Analytics
3. Enable Speed Insights

### Set Up Error Tracking (Recommended)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Monitor Database
1. Check Supabase dashboard regularly
2. Monitor connection pool usage
3. Review slow queries

---

## Rollback Procedure

If something goes wrong:

1. Go to Vercel dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Verify rollback successful

---

## Support

- **Vercel Support:** https://vercel.com/support
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Support:** https://supabase.com/support

---

## Success! 🎉

Your Devory app is now live in production!

**Next Steps:**
1. Share your app with users
2. Monitor performance and errors
3. Gather user feedback
4. Plan future features

**Production URL:** https://your-project.vercel.app

---

**Deployment Time:** ~30 minutes
**Difficulty:** Easy
**Status:** ✅ Complete
