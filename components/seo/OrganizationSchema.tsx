export default function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devory.com';
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Devory',
    description: 'AI-powered project ideas platform for developers, students, and entrepreneurs',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/devory',
      'https://github.com/devory',
      'https://linkedin.com/company/devory',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@devory.com',
      availableLanguage: ['English'],
    },
    founder: {
      '@type': 'Person',
      name: 'Devory Team',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
