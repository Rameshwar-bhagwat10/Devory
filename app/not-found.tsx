import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-base">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">404</span>
        </h1>
        <p className="text-xl text-text-60 mb-6">Page not found</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-primary text-white font-medium rounded-lg transition-all hover:scale-105 focus:outline-none"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
