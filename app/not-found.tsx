import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10">
            <span className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-white/60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Suggestions */}
        <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-left">
          <h3 className="text-lg font-semibold text-white mb-4">
            Here&apos;s what you can do:
          </h3>
          <ul className="space-y-2 text-white/60">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Check the URL for typos
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Go back to the previous page
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Visit our homepage
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-full hover:scale-105 transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            Browse Projects
          </Link>
        </div>

        {/* Search Suggestion */}
        <p className="mt-8 text-sm text-white/40">
          Looking for something specific?{' '}
          <Link
            href="/projects"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Search our projects
          </Link>
        </p>
      </div>
    </div>
  );
}
