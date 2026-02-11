import { requireAuth } from '@/lib/auth-helpers';
import { signOut } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await requireAuth();
  
  return (
    <div className="min-h-screen bg-dark-base px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-glass-5 border border-border-10 rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          
          <div className="space-y-4">
            <div className="bg-glass-10 border border-border-10 rounded-lg p-4 hover:border-border-20 transition-all">
              <p className="text-text-60 text-sm mb-1">Email</p>
              <p className="text-text-90 font-medium">{session.user.email}</p>
            </div>
            
            <div className="bg-glass-10 border border-border-10 rounded-lg p-4 hover:border-border-20 transition-all">
              <p className="text-text-60 text-sm mb-1">Role</p>
              <p className="text-text-90 font-medium">{session.user.role}</p>
            </div>
            
            <div className="bg-glass-10 border border-border-10 rounded-lg p-4 hover:border-border-20 transition-all">
              <p className="text-text-60 text-sm mb-1">Onboarding Status</p>
              <p className="text-text-90 font-medium">
                {session.user.onboardingComplete ? 'Completed' : 'Pending'}
              </p>
            </div>
          </div>
          
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
            className="mt-6"
          >
            <button
              type="submit"
              className="w-full px-4 py-3 bg-error/10 hover:bg-error/20 border border-error/20 rounded-lg text-error font-medium transition-all focus:outline-none"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
