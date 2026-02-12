import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  
  // Redirect authenticated users
  if (session?.user) {
    // Check onboarding status
    if (!session.user.onboardingComplete) {
      // Preserve callbackUrl for after onboarding
      const onboardingUrl = params.callbackUrl 
        ? `/onboarding?callbackUrl=${encodeURIComponent(params.callbackUrl)}`
        : '/onboarding';
      redirect(onboardingUrl);
    }
    
    // Use callback URL or default to dashboard page
    redirect(params.callbackUrl || '/dashboard');
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-base">
      <div className="w-full max-w-[400px]">
        <div className="bg-glass-5 border border-border-10 rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Devory
              </span>
            </h1>
            <h2 className="text-lg font-semibold text-text-90 mb-1">
              Sign in to Devory
            </h2>
            <p className="text-sm text-text-60">
              Continue to discover project ideas
            </p>
          </div>
          
          <AuthForm callbackUrl={params.callbackUrl} />
        </div>
      </div>
    </div>
  );
}
