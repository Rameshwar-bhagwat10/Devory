export default function IdeaCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="border border-border-10 rounded-lg p-4 bg-glass-5 hover:bg-glass-10 hover:border-border-20 transition-all">
      <h3 className="text-lg font-semibold text-text-90 mb-2">{title}</h3>
      <p className="text-text-60">{content}</p>
    </div>
  );
}
