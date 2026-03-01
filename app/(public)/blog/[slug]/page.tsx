import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCalendar, FaClock, FaTag } from 'react-icons/fa';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

// Blog post data
const blogPosts: Record<string, {
  title: string;
  description: string;
  content: React.ReactNode;
  category: string;
  readTime: string;
  publishedDate: string;
  modifiedDate: string;
  tags: string[];
  author: string;
}> = {
  'top-50-web-development-projects-2024': {
    title: 'Top 50 Web Development Projects for Beginners in 2024',
    description: 'Discover the best web development projects to build your portfolio and master modern frameworks like React, Next.js, and Node.js. Complete guide with implementation tips.',
    category: 'Web Development',
    readTime: '12 min read',
    publishedDate: '2024-01-15',
    modifiedDate: '2024-01-15',
    tags: ['web development', 'react', 'nextjs', 'beginner projects', 'portfolio'],
    author: 'Devory Team',
    content: null, // Will be imported from separate component
  },
  'machine-learning-projects-students-guide': {
    title: 'Machine Learning Projects for Students: Complete Guide',
    description: 'A comprehensive guide to ML projects for students, from beginner to advanced. Learn Python, TensorFlow, and build real-world AI applications.',
    category: 'Machine Learning',
    readTime: '15 min read',
    publishedDate: '2024-01-12',
    modifiedDate: '2024-01-12',
    tags: ['machine learning', 'python', 'tensorflow', 'AI', 'student projects'],
    author: 'Devory Team',
    content: null,
  },
  'final-year-project-ideas-computer-science': {
    title: 'Final Year Project Ideas for Computer Science Students',
    description: 'Explore 100+ final year project ideas across web dev, ML, blockchain, and IoT. Complete with implementation guides and tech stacks.',
    category: 'Student Projects',
    readTime: '18 min read',
    publishedDate: '2024-01-10',
    modifiedDate: '2024-01-10',
    tags: ['final year projects', 'computer science', 'project ideas', 'student guide'],
    author: 'Devory Team',
    content: null,
  },
  'how-to-choose-right-project-skill-level': {
    title: 'How to Choose the Right Project for Your Skill Level',
    description: 'Learn how to select projects that match your experience and help you grow as a developer. Decision framework included.',
    category: 'Career Guide',
    readTime: '8 min read',
    publishedDate: '2024-01-08',
    modifiedDate: '2024-01-08',
    tags: ['career advice', 'project selection', 'skill development', 'beginner guide'],
    author: 'Devory Team',
    content: null,
  },
  'blockchain-projects-beginner-to-advanced': {
    title: 'Blockchain Projects: From Beginner to Advanced',
    description: 'Master blockchain development with projects ranging from simple smart contracts to complex DeFi applications.',
    category: 'Blockchain',
    readTime: '14 min read',
    publishedDate: '2024-01-05',
    modifiedDate: '2024-01-05',
    tags: ['blockchain', 'web3', 'solidity', 'smart contracts', 'DeFi'],
    author: 'Devory Team',
    content: null,
  },
  'react-project-ideas-2024': {
    title: 'React Project Ideas for Beginners to Advanced Developers',
    description: 'Build your React skills with 30+ project ideas, from simple components to complex applications with hooks, context, and state management.',
    category: 'Web Development',
    readTime: '10 min read',
    publishedDate: '2024-01-03',
    modifiedDate: '2024-01-03',
    tags: ['react', 'javascript', 'frontend', 'hooks', 'project ideas'],
    author: 'Devory Team',
    content: null,
  },
  'python-projects-for-portfolio': {
    title: 'Python Projects Every Developer Should Build',
    description: 'Master Python with practical projects covering automation, web scraping, data analysis, and more. Perfect for your portfolio.',
    category: 'Programming',
    readTime: '12 min read',
    publishedDate: '2024-01-01',
    modifiedDate: '2024-01-01',
    tags: ['python', 'automation', 'web scraping', 'data analysis', 'portfolio'],
    author: 'Devory Team',
    content: null,
  },
  'full-stack-mern-projects': {
    title: 'Full Stack Project Ideas with MERN Stack',
    description: 'Build complete web applications with MongoDB, Express, React, and Node.js. Learn full-stack development with real-world projects.',
    category: 'Web Development',
    readTime: '16 min read',
    publishedDate: '2023-12-28',
    modifiedDate: '2023-12-28',
    tags: ['mern stack', 'full stack', 'mongodb', 'express', 'react', 'nodejs'],
    author: 'Devory Team',
    content: null,
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Devory Blog`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${params.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      tags: post.tags,
      images: [`/og-blog-${params.slug}.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/og-blog-${params.slug}.png`],
    },
  };
}

// Import all blog content components
import Top50WebDevProjects from '@/components/blog/top-50-web-development-projects-2024';
import MLProjectsGuide from '@/components/blog/machine-learning-projects-students-guide';
import FinalYearProjectIdeas from '@/components/blog/final-year-project-ideas-computer-science';
import HowToChooseProject from '@/components/blog/how-to-choose-right-project-skill-level';
import BlockchainProjects from '@/components/blog/blockchain-projects-beginner-to-advanced';
import ReactProjectIdeas from '@/components/blog/react-project-ideas-2024';
import PythonProjects from '@/components/blog/python-projects-for-portfolio';
import MERNProjects from '@/components/blog/full-stack-mern-projects';

// Map slugs to components
const contentComponents: Record<string, React.ComponentType> = {
  'top-50-web-development-projects-2024': Top50WebDevProjects,
  'machine-learning-projects-students-guide': MLProjectsGuide,
  'final-year-project-ideas-computer-science': FinalYearProjectIdeas,
  'how-to-choose-right-project-skill-level': HowToChooseProject,
  'blockchain-projects-beginner-to-advanced': BlockchainProjects,
  'react-project-ideas-2024': ReactProjectIdeas,
  'python-projects-for-portfolio': PythonProjects,
  'full-stack-mern-projects': MERNProjects,
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  const ContentComponent = contentComponents[params.slug];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${params.slug}` },
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]">
        <article className="max-w-4xl mx-auto px-4 py-24">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium">
                {post.category}
              </span>
              <span className="text-white/50 text-sm flex items-center gap-1">
                <FaClock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <FaCalendar className="w-4 h-4" />
                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs flex items-center gap-1"
                >
                  <FaTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ContentComponent />
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-white/70 mb-6">
                Explore 300+ curated project ideas with complete roadmaps and implementation guides.
              </p>
              <Link
                href="/projects"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
