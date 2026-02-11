export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        <span className="bg-gradient-primary bg-clip-text text-transparent">
          Project: {slug}
        </span>
      </h1>
      <p className="text-text-60">Project detail placeholder</p>
    </div>
  );
}
