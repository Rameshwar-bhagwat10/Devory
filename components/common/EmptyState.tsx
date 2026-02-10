export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-text-muted text-lg">{message}</p>
    </div>
  );
}
