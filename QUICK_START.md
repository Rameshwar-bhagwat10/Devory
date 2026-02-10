# 🚀 Quick Start - 5 Minutes Setup

## 1. Supabase (2 min)
```
1. Go to: https://supabase.com
2. Create project → Save password
3. Settings → Database → Copy both URLs:
   - Connection pooling → DATABASE_URL
   - Direct connection → DIRECT_URL
```

## 2. Google OAuth (2 min)
```
1. Go to: https://console.cloud.google.com
2. Create project → Enable Google+ API
3. OAuth consent screen → External → Fill basic info
4. Credentials → Create OAuth Client ID → Web app
5. Add redirect: http://localhost:3000/api/auth/callback/google
6. Copy Client ID & Secret
```

## 3. Generate Secret (10 sec)
```bash
openssl rand -base64 32
```

## 4. Create .env.local (30 sec)
```env
DATABASE_URL="your-pooling-url"
DIRECT_URL="your-direct-url"
AUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## 5. Run Migrations (30 sec)
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## ✅ Done!
Visit: http://localhost:3000

---

## 📋 Checklist

- [ ] Supabase project created
- [ ] Database URLs copied
- [ ] Google OAuth configured
- [ ] Redirect URI added
- [ ] AUTH_SECRET generated
- [ ] .env.local created
- [ ] Migrations run
- [ ] Dev server started
- [ ] Can sign in with Google
- [ ] Onboarding works
- [ ] Dashboard accessible

## 🆘 Common Issues

**"Invalid redirect URI"**
→ Add `http://localhost:3000/api/auth/callback/google` to Google OAuth

**"Database connection failed"**
→ Check DATABASE_URL has correct password

**"AUTH_SECRET not defined"**
→ Restart dev server after creating .env.local

**"Prisma Client error"**
→ Run `npx prisma generate`

---

## 🎯 Test Authentication

1. Click "Sign In"
2. Choose Google
3. Complete onboarding
4. See dashboard with your email

## 🔐 Test Admin Access

1. Supabase → Table Editor → users
2. Change your role to `ADMIN`
3. Visit: `/admin/test`
4. Should see "Admin access confirmed"

---

**Need detailed help?** See `SETUP_GUIDE.md`
