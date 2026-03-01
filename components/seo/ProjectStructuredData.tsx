interface ProjectStructuredDataProps {
  project: {
    title: string;
    slug: string;
    description: string;
    domain: string;
    difficulty: string;
    techStack: string[];
    estimatedDuration: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}

export default function ProjectStructuredData({ project }: ProjectStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'https://devory.com';
  const projectUrl = `${baseUrl}/projects/${project.slug}`;

  // CreativeWork schema for project
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': projectUrl,
    name: project.title,
    description: project.description,
    url: projectUrl,
    creator: {
      '@type': 'Organization',
      name: 'Devory',
      url: baseUrl,
    },
    datePublished: new Date(project.createdAt).toISOString(),
    dateModified: new Date(project.updatedAt).toISOString(),
    inLanguage: 'en-US',
    keywords: [
      project.domain,
      project.difficulty,
      ...project.techStack,
      'project idea',
      'project roadmap',
      'implementation guide',
    ].join(', '),
    about: {
      '@type': 'Thing',
      name: project.domain,
      description: `${project.difficulty} level project in ${project.domain}`,
    },
    educationalLevel: project.difficulty,
    timeRequired: project.estimatedDuration,
    programmingLanguage: project.techStack,
  };

  // HowTo schema for implementation guide
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Build: ${project.title}`,
    description: project.description,
    url: projectUrl,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    totalTime: project.estimatedDuration,
    tool: project.techStack.map((tech) => ({
      '@type': 'HowToTool',
      name: tech,
    })),
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${baseUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      {/* CreativeWork Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
