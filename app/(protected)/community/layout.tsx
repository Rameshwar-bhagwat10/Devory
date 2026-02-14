import { auth } from '@/lib/auth';
import CommunitySidebar from '@/components/community/layout/CommunitySidebar';
import MobileBottomNav from '@/components/community/layout/MobileBottomNav';

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] to-[#080b14] pt-16">
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:block">
        {/* Fixed Left Sidebar */}
        <CommunitySidebar user={session?.user} />

        {/* Main Content Area - With left margin for sidebar */}
        <main className="ml-[280px]">
          <div className="max-w-[900px] mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Layout: Single column */}
      <div className="md:hidden min-h-screen pb-20">
        <main className="px-4 py-6">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav isAuthenticated={!!session} />
      </div>
    </div>
  );
}
