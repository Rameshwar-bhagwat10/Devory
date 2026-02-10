import { auth } from '@/lib/auth';
import Link from 'next/link';

export default async function LandingPage() {
  const session = await auth();
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Devory
        </h1>
        <p className="text-text-secondary mb-8">
          Phase 2: Authentication & Database Complete
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-primary hover:bg-primary-soft text-white font-medium rounded-lg transition-colors"
              >
                Go to Dashboard
              </Link>
              <div className="px-6 py-3 bg-bg-surface border border-border-default rounded-lg">
                <p className="text-text-secondary text-sm">Signed in as</p>
                <p className="text-text-primary font-medium">{session.user.email}</p>
              </div>
            </>
          ) : (
            <Link
              href="/auth"
              className="px-6 py-3 bg-primary hover:bg-primary-soft text-white font-medium rounded-lg transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
