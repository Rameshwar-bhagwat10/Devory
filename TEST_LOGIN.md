# 🧪 Login Testing Guide

## ✅ Build Status: SUCCESS
- No TypeScript errors
- No build errors
- All 27 routes generated successfully

---

## 🚀 How to Test Login

### Step 1: Start Development Server

```bash
npm run dev
```

Wait for: `✓ Ready in X.Xs`

### Step 2: Open Browser

Visit: **http://localhost:3000**

You should see:
- "Devory" heading
- "Phase 2: Authentication & Database Complete"
- "Sign In" button

### Step 3: Test GitHub Login

1. Click **"Sign In"** button
2. You'll be redirected to `/auth` page
3. Click **"Continue with GitHub"**
4. GitHub will ask for authorization
5. After approval, you'll be redirected back
6. You'll see the **Onboarding** page

### Step 4: Complete Onboarding

1. Select at least one domain (e.g., Web Development)
2. Choose your skill level (Beginner/Intermediate/Advanced)
3. Optionally fill academic year and institution
4. Click **"Complete Setup"**
5. You'll be redirected to **Dashboard**

### Step 5: Verify Dashboard

You should see:
- Your email address
- Role: STUDENT
- Onboarding Status: Completed
- Sign Out button

### Step 6: Test Session Persistence

1. Refresh the page (F5)
2. You should still be logged in
3. Go back to homepage: http://localhost:3000
4. You should see "Go to Dashboard" and your email

### Step 7: Test Sign Out

1. Click **"Sign Out"** button
2. You'll be redirected to homepage
3. You should see "Sign In" button again

---

## 🔍 Alternative: Test Google Login

Same steps as GitHub, but click **"Continue with Google"** instead.

---

## ✅ What Should Work

- [x] Homepage loads
- [x] Sign In button visible
- [x] Auth page accessible
- [x] GitHub OAuth flow
- [x] Google OAuth flow
- [x] User auto-creation in database
- [x] Profile auto-creation
- [x] Subscription auto-creation
- [x] Onboarding form
- [x] Dashboard access
- [x] Session persistence
- [x] Sign out

---

## 🐛 Troubleshooting

### "Cannot GET /auth"
- Make sure dev server is running
- Check terminal for errors

### "Invalid redirect URI" (GitHub)
**Fix:**
1. Go to: https://github.com/settings/developers
2. Find your OAuth App
3. Add redirect URI: `http://localhost:3000/api/auth/callback/github`

### "Invalid redirect URI" (Google)
**Fix:**
1. Go to: https://console.cloud.google.com
2. APIs & Services → Credentials
3. Edit your OAuth client
4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`

### "Database connection error"
- Check `.env.local` has correct DATABASE_URL
- Verify Supabase project is active
- Check password encoding (# should be %23)

### "Session not found"
- Clear browser cookies
- Restart dev server
- Try incognito/private window

### Stuck on onboarding
- Check browser console for errors
- Verify at least one domain is selected
- Verify skill level is selected

---

## 📊 Database Verification

After signing in, check Supabase:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Table Editor**
4. Check these tables:

### users table
Should have your record with:
- email
- name
- role: STUDENT
- onboardingComplete: true (after onboarding)

### user_profiles table
Should have your profile with:
- preferredDomains
- skillLevel
- academicYear (if provided)
- institution (if provided)

### accounts table
Should have OAuth account with:
- provider: github or google
- providerAccountId

### subscriptions table
Should have your subscription with:
- tier: FREE
- status: active

---

## 🎯 Expected Flow

```
Homepage (/)
    ↓ Click "Sign In"
Auth Page (/auth)
    ↓ Click "Continue with GitHub/Google"
OAuth Provider
    ↓ Authorize
Callback
    ↓ Create user, profile, subscription
Onboarding (/onboarding)
    ↓ Fill form & submit
Dashboard (/dashboard)
    ↓ View user info
Sign Out
    ↓ Back to homepage
```

---

## ✨ Ready to Test!

Run: `npm run dev`

Then follow the steps above to test the complete authentication flow.

**Everything is configured and ready to work!** 🚀
