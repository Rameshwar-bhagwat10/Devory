export default function SuccessState({ message }: { message: string }) {
  return (
    <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
      <p className="text-green-400">{message}</p>
    </div>
  );
}
