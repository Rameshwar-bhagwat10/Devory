export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
      <p className="text-red-400">{message}</p>
    </div>
  );
}
