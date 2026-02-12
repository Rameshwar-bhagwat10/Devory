// Structured data for SEO
export default function ProjectsStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Project Ideas for Students',
    description: 'Curated final year and innovative project ideas tailored for students across various domains including Web Development, Machine Learning, Blockchain, and more.',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://devory.com'}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Student Project Ideas',
      description: 'A comprehensive collection of project ideas for computer science and engineering students',
      numberOfItems: 100,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_APP_URL || 'https://devory.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://devory.com'}/projects`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
