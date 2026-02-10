# Project Hub

A comprehensive Next.js application for discovering, sharing, and collaborating on projects with community features and admin moderation.

## Features

- **Public Pages**: Landing page, project explorer, community feed
- **Authentication**: Login/signup with onboarding flow
- **Protected Routes**: Student dashboard, profile, saved projects
- **Community**: Post ideas, react to posts, report content
- **Admin Panel**: Moderate ideas, handle reports
- **AI Integration**: Project customization endpoints
- **PDF Generation**: Export projects as PDF

## Project Structure

```
├── app/
│   ├── (public)/          # Public routes (landing, projects, community)
│   ├── (protected)/       # Protected routes (dashboard, profile, saved)
│   ├── admin/             # Admin panel
│   ├── auth/              # Authentication pages
│   ├── onboarding/        # User onboarding
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── common/            # Common components (Cards, Loaders)
│   └── feedback/          # Feedback components (Toast, Error states)
├── features/              # Feature-specific services
│   ├── auth/              # Authentication logic
│   ├── projects/          # Project management
│   ├── community/         # Community features
│   ├── ai/                # AI services
│   ├── admin/             # Admin moderation
│   └── subscriptions/     # Subscription management
├── lib/                   # Shared utilities
├── types/                 # TypeScript type definitions
├── prisma/                # Database schema and migrations
└── styles/                # Global styles and tokens
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (create `.env.local`):
   ```
   DATABASE_URL="your_database_url"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
   ```

4. Run database migrations (optional - requires Prisma setup):
   ```bash
   npx prisma migrate dev
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Routes

### Public Routes
- `/` - Landing page
- `/projects` - Browse all projects
- `/projects/[slug]` - Project details
- `/community` - Community feed (read-only)
- `/auth` - Login/Signup

### Protected Routes (Requires Authentication)
- `/dashboard` - Student dashboard
- `/profile` - User profile and settings
- `/saved` - Saved projects
- `/community/new` - Post new community idea
- `/onboarding` - First-time user setup

### Admin Routes (Requires Admin Role)
- `/admin` - Admin dashboard
- `/admin/ideas` - Moderate community ideas
- `/admin/reports` - Handle user reports

## API Endpoints

- `GET/POST /api/projects` - Project CRUD
- `GET/PUT/DELETE /api/projects/[id]` - Individual project operations
- `GET/POST /api/community` - Community feed
- `POST /api/community/post` - Create post
- `POST /api/community/react` - Like/dislike
- `POST /api/community/report` - Report content
- `POST /api/ai` - AI customization
- `POST /api/pdf` - Generate PDF
- `GET/POST /api/admin/ideas` - Admin idea moderation
- `GET/POST /api/admin/reports` - Admin report handling

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Database**: Prisma (PostgreSQL ready)
- **Authentication**: Supabase (placeholder)
- **UI Components**: Custom components with shadcn/ui patterns

## Development Notes

- The project uses Next.js 16 App Router with route groups for organization
- Middleware handles authentication and routing guards
- Prisma is configured but requires installation: `npm install @prisma/client prisma`
- Supabase integration is stubbed and needs configuration

## Next Steps

1. Install and configure Prisma: `npm install @prisma/client prisma`
2. Set up Supabase authentication
3. Configure database connection
4. Implement actual authentication logic
5. Add form validation
6. Implement real data fetching
7. Add tests

## License

MIT
