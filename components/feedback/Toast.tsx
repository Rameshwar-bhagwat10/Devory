'use client';

export default function Toast({
  message,
  type = 'info',
}: {
  message: string;
  type?: 'info' | 'success' | 'error';
}) {
  const bgColor =
    type === 'success'
      ? 'bg-success'
      : type === 'error'
      ? 'bg-error'
      : 'bg-accent-orange';

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  );
}
