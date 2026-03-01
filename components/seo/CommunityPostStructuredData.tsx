interface CommunityPostStructuredDataProps {
  post: {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    type: string;
    domain: string;
    difficulty: string;
    techStack: string[];
    tags: string[];
    createdAt: Date | string;
    updatedAt: Date | string;
    user?: {
      name: string | null;
      image: string | null;
    };
    likesCount: number;
    commentsCount: number;
    viewsCount: number;
  };
}

export default function CommunityPostStructuredData({ post }: CommunityPostStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'https://devory.com';
  const postUrl = `${baseUrl}/community/${post.slug}`;

  // Article schema for community posts
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': post.type === 'COLLABORATION' ? 'SocialMediaPosting' : 'Article',
    '@id': postUrl,
    headline: post.title,
    description: post.shortDescription,
    articleBody: post.fullDescription,
    url: postUrl,
    datePublished: new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.user?.name || 'Anonymous',
      ...(post.user?.image && { image: post.user.image }),
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: [
      post.domain,
      post.difficulty,
      ...post.techStack,
      ...post.tags,
    ].join(', '),
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: post.likesCount,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: post.commentsCount,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ViewAction',
        userInteractionCount: post.viewsCount,
      },
    ],
  };

  // DiscussionForumPosting schema for collaboration posts
  const discussionSchema = post.type === 'COLLABORATION' ? {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    '@id': postUrl,
    headline: post.title,
    text: post.fullDescription,
    url: postUrl,
    datePublished: new Date(post.createdAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.user?.name || 'Anonymous',
    },
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/CommentAction',
      userInteractionCount: post.commentsCount,
    },
  } : null;

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
        name: 'Community',
        item: `${baseUrl}/community`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      {/* Article/SocialMediaPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* DiscussionForumPosting Schema (for collaborations) */}
      {discussionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(discussionSchema) }}
        />
      )}
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
