import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileContent from '@/components/profile/ProfileContent';

export const metadata = {
  title: 'Profile - Devory',
  description: 'View and manage your profile',
};

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/auth');
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    }>
      <ProfileContent userId={session.user.id} isOwnProfile={true} />
    </Suspense>
  );
}
