interface ProjectSchemaProps {
  title: string;
  description: string;
  slug: string;
  domain: string;
  difficulty: string;
  techStack: string[];
  estimatedDuration: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export default function ProjectSchema({
  title,
  description,
  slug,
  domain,
  difficulty,
  techStack,
  estimatedDuration,
  createdAt,
  updatedAt,
}: ProjectSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devory.com';
  const projectUrl = `${baseUrl}/projects/${slug}`;
  
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': projectUrl,
    name: title,
    description: description,
    url: projectUrl,
    genre: domain,
    keywords: [domain, difficulty, ...techStack].join(', '),
    inLanguage: 'en',
    datePublished: typeof createdAt === 'string' ? createdAt : createdAt.toISOString(),
    dateModified: typeof updatedAt === 'string' ? updatedAt : updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Devory',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Devory',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    educationalLevel: difficulty,
    timeRequired: estimatedDuration,
    about: {
      '@type': 'Thing',
      name: domain,
    },
    teaches: techStack.map(tech => ({
      '@type': 'Thing',
      name: tech,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
    />
  );
}
