export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        Project: {slug}
      </h1>
      <p className="text-text-secondary">Project detail placeholder</p>
    </div>
  );
}
