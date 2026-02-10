import { requireOnboarding } from '@/lib/auth-helpers';
import { signOut } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await requireOnboarding();
  
  return (
    <div className="min-h-screen bg-bg-main px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-bg-surface border border-border-default rounded-lg p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Dashboard
          </h1>
          
          <div className="space-y-4">
            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Email</p>
              <p className="text-text-primary font-medium">{session.user.email}</p>
            </div>
            
            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Role</p>
              <p className="text-text-primary font-medium">{session.user.role}</p>
            </div>
            
            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Onboarding Status</p>
              <p className="text-text-primary font-medium">
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
              className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 font-medium transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
