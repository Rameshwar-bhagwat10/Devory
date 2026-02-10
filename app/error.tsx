'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-6">
          We encountered an unexpected error.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary hover:bg-primary-soft text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
