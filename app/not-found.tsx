import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-6">Page not found</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary hover:bg-primary-soft text-white rounded-lg transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
