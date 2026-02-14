import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PublicProfileContent from '@/components/profile/PublicProfileContent';

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { userId } = await params;
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/auth');
  }

  // If viewing own profile, redirect to /profile
  if (userId === session.user.id) {
    redirect('/profile');
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    }>
      <PublicProfileContent 
        userId={userId}
      />
    </Suspense>
  );
}
