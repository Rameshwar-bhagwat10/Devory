import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-text-primary mb-6">
          Welcome to Devory
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          Discover, share, and collaborate on amazing projects
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-soft transition"
          >
            Explore Projects
          </Link>
          <Link
            href="/auth"
            className="px-6 py-3 border border-border-default rounded-lg hover:bg-bg-surface transition text-text-primary"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
