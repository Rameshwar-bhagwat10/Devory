import { requireAdmin } from '@/lib/auth-helpers';

export default async function AdminTestPage() {
  const session = await requireAdmin();
  
  return (
    <div className="min-h-screen bg-dark-base px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-glass-5 border border-border-10 rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Admin Access Confirmed
            </span>
          </h1>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <p className="text-success">
              ✓ You have admin access
            </p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="bg-glass-10 border border-border-10 rounded-lg p-4 hover:border-border-20 transition-all">
              <p className="text-text-60 text-sm mb-1">Admin Email</p>
              <p className="text-text-90 font-medium">{session.user.email}</p>
            </div>
            
            <div className="bg-glass-10 border border-border-10 rounded-lg p-4 hover:border-border-20 transition-all">
              <p className="text-text-60 text-sm mb-1">Role</p>
              <p className="text-text-90 font-medium">{session.user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
