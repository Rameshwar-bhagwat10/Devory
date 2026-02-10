# Devory Phase 2 Setup Guide

## Prerequisites
- Node.js 18+ installed
- Supabase account
- Google account

## Quick Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

#### A. Supabase Setup
1. Go to https://supabase.com
2. Create new project
3. Get connection strings from Project Settings → Database
4. Copy both `DATABASE_URL` (pooling) and `DIRECT_URL` (direct)

#### B. Google OAuth Setup
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Configure OAuth consent screen (External)
5. Create OAuth credentials (Web application)
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret

#### C. Generate AUTH_SECRET
```bash
openssl rand -base64 32
```

### 3. Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Verify migration
npx prisma studio
```

### 4. Apply Row-Level Security (Optional but Recommended)

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents from `prisma/rls-policies.sql`
3. Run the SQL script
4. This enables database-level security

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Testing Authentication

### Test Flow:
1. Click "Sign In" on homepage
2. Click "Continue with Google"
3. Sign in with Google account
4. Complete onboarding form
5. You'll be redirected to dashboard

### Test Admin Access:
1. Go to Supabase Dashboard → Table Editor
2. Find your user in `users` table
3. Change `role` from `STUDENT` to `ADMIN`
4. Visit: http://localhost:3000/admin/test
5. You should see admin access confirmed

## Troubleshooting

### "Invalid redirect URI"
- Make sure you added `http://localhost:3000/api/auth/callback/google` to Google OAuth settings
- Check for typos in the URL

### "Database connection failed"
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Check if you replaced `[YOUR-PASSWORD]` with actual password
- Ensure Supabase project is active

### "AUTH_SECRET is not defined"
- Make sure `.env.local` exists in project root
- Restart dev server after creating `.env.local`

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Migration failed"
- Check database connection
- Ensure Supabase project is running
- Try: `npx prisma migrate reset` (WARNING: deletes all data)

## Environment Variables Reference

```env
# Required for Phase 2
DATABASE_URL=              # Supabase connection pooling URL
DIRECT_URL=                # Supabase direct connection URL
AUTH_SECRET=               # Generated secret (32+ characters)
NEXTAUTH_URL=              # http://localhost:3000 (dev)
GOOGLE_CLIENT_ID=          # From Google Cloud Console
GOOGLE_CLIENT_SECRET=      # From Google Cloud Console

# Optional for Phase 2
NEXT_PUBLIC_SUPABASE_URL=  # For future Supabase client features
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # For future Supabase client features

# Future Phases
OPENAI_API_KEY=            # Phase 16 (AI features)
```

## Database Schema Overview

### Core Tables:
- **users** - User accounts with role and onboarding status
- **user_profiles** - Extended user information and preferences
- **accounts** - OAuth provider accounts (Auth.js)
- **sessions** - Active user sessions (Auth.js)
- **subscriptions** - User subscription tiers and limits

### Feature Tables (Ready for future phases):
- **projects** - Project catalog
- **saved_projects** - User bookmarks
- **community_ideas** - User-submitted ideas
- **idea_reactions** - Likes/dislikes
- **idea_reports** - Content moderation
- **ai_usage_logs** - AI feature tracking
- **downloads** - PDF download tracking
- **editor_picks** - Featured projects
- **audit_logs** - System activity logs

## Next Steps

After successful setup:
1. ✅ Authentication works
2. ✅ Database connected
3. ✅ User creation automated
4. ✅ Onboarding flow functional
5. ✅ Role-based access working

**Ready for Phase 3!**

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Verify all environment variables are set
3. Check Supabase project status
4. Review Google OAuth configuration
5. Check browser console for errors
