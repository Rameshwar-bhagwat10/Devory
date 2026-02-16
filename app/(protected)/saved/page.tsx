import { requireAuth } from '@/lib/auth-helpers';
import { SaveService } from '@/features/projects/save.service';
import Link from 'next/link';
import SavedProjectCard from '@/components/projects/SavedProjectCard';

export default async function SavedProjectsPage() {
  const session = await requireAuth();
  const savedProjects = await SaveService.getSavedProjects(session.user.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-90 mb-4">
            Saved{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"></div>
            </span>
          </h1>
          <p className="text-lg text-text-60">
            Your bookmarked project ideas
          </p>
        </div>

        {/* Content */}
        {savedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedProjects.map((project: any, index: number) => (
              <div
                key={project.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              >
                <SavedProjectCard {...project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center bg-glass-5 border border-border-10 rounded-xl p-12 max-w-md">
              <svg className="w-16 h-16 mx-auto mb-4 text-text-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h3 className="text-xl font-bold text-text-90 mb-2">No saved projects yet</h3>
              <p className="text-text-60 mb-6">Start exploring and save projects that interest you</p>
              <Link
                href="/projects"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:scale-105 transition-all shadow-lg shadow-purple-600/25"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
