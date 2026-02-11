export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-text-60 text-lg">{message}</p>
    </div>
  );
}
