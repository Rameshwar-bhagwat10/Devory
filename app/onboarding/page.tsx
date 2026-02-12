import { requireAuth } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await requireAuth();
  const params = await searchParams;
  
  // Redirect if already completed
  if (session.user.onboardingComplete) {
    redirect(params.callbackUrl || '/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center px-4">
      <OnboardingFlow userId={session.user.id} callbackUrl={params.callbackUrl} />
    </div>
  );
}
