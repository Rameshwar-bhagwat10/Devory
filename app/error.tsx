'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-base">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Something went wrong
          </span>
        </h1>
        <p className="text-text-60 mb-6">
          We encountered an unexpected error.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-gradient-primary text-white font-medium rounded-lg transition-all hover:scale-105 focus:outline-none"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
