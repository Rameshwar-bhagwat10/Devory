import { requireAdmin } from '@/lib/auth-helpers';

export default async function AdminTestPage() {
  const session = await requireAdmin();
  
  return (
    <div className="min-h-screen bg-bg-main px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-bg-surface border border-border-default rounded-lg p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Admin Access Confirmed
          </h1>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-400">
              ✓ You have admin access
            </p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Admin Email</p>
              <p className="text-text-primary font-medium">{session.user.email}</p>
            </div>
            
            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-1">Role</p>
              <p className="text-text-primary font-medium">{session.user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
