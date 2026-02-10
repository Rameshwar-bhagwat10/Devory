export default function ProjectCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-border-default rounded-lg p-4 hover:shadow-soft transition">
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
}
