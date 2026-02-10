import { requireAuth } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

export default async function OnboardingPage() {
  const session = await requireAuth();
  
  // Redirect if already completed
  if (session.user.onboardingComplete) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-bg-main px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-bg-surface border border-border-default rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Welcome to Devory
            </h1>
            <p className="text-text-secondary">
              Let&apos;s personalize your experience
            </p>
          </div>
          
          <OnboardingForm userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}
