interface CommunityPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  type: string;
  domain: string;
  difficulty: string;
  techStack: string[];
  tags: string[];
  authorName?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  likesCount: number;
  commentsCount: number;
}

export default function CommunityPostSchema({
  title,
  description,
  slug,
  type,
  domain,
  difficulty,
  techStack,
  tags,
  authorName,
  createdAt,
  updatedAt,
  likesCount,
  commentsCount,
}: CommunityPostSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devory.com';
  const postUrl = `${baseUrl}/community/${slug}`;
  
  const postSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'COLLABORATION' ? 'JobPosting' : 'Article',
    '@id': postUrl,
    headline: title,
    description: description,
    url: postUrl,
    datePublished: typeof createdAt === 'string' ? createdAt : createdAt.toISOString(),
    dateModified: typeof updatedAt === 'string' ? updatedAt : updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: authorName || 'Anonymous',
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
    keywords: [domain, difficulty, ...techStack, ...tags].join(', '),
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: likesCount,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: commentsCount,
      },
    ],
    ...(type === 'COLLABORATION' && {
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Devory Community',
      },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'Worldwide',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
    />
  );
}
