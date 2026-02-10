import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  
  if (session?.user) {
    redirect(searchParams.callbackUrl || '/dashboard');
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-main">
      <div className="w-full max-w-md">
        <div className="bg-bg-surface border border-border-default rounded-lg p-8 shadow-soft">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Devory
            </h1>
            <p className="text-text-secondary">
              Sign in to continue
            </p>
          </div>
          
          <AuthForm callbackUrl={searchParams.callbackUrl} />
        </div>
      </div>
    </div>
  );
}
