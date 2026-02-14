import { Suspense } from 'react';
import { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NotificationsList from '@/components/community/notifications/NotificationsList';
import { Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Notifications | Devory Community',
  description: 'Stay updated with your community notifications',
};

export default async function NotificationsPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth?callbackUrl=/community/notifications');
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl">
            <Bell className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
        </div>
        <p className="text-white/60">Stay updated with your community activity</p>
      </div>

      {/* Notifications List */}
      <Suspense fallback={
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      }>
        <NotificationsList />
      </Suspense>
    </div>
  );
}
