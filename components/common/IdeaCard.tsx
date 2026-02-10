export default function IdeaCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="border border-border-default rounded-lg p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary">{content}</p>
    </div>
  );
}
