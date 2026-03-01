import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaCalendar, FaClock } from 'react-icons/fa';

// Static generation configuration
export const revalidate = 86400; // 24 hours cache
export const dynamic = 'force-static'; // Force static generation at build time

export const metadata: Metadata = {
  title: 'Blog - Project Ideas, Guides & Tutorials | Devory',
  description: 'Learn about web development projects, machine learning projects, and coding tutorials. Expert guides for IT students and developers.',
  keywords: [
    'web development blog',
    'machine learning tutorials',
    'project ideas blog',
    'coding guides',
    'programming tutorials',
    'IT student resources',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog - Project Ideas, Guides & Tutorials | Devory',
    description: 'Learn about web development projects, machine learning projects, and coding tutorials.',
    images: ['/og-blog.png'],
  },
};

const blogPosts = [
  {
    slug: 'top-50-web-development-projects-2024',
    title: 'Top 50 Web Development Projects for Beginners in 2024',
    excerpt: 'Discover the best web development projects to build your portfolio and master modern frameworks like React, Next.js, and Node.js.',
    category: 'Web Development',
    readTime: '12 min read',
    publishedDate: '2024-01-15',
    featured: true,
  },
  {
    slug: 'machine-learning-projects-students-guide',
    title: 'Machine Learning Projects for Students: Complete Guide',
    excerpt: 'A comprehensive guide to ML projects for students, from beginner to advanced. Learn Python, TensorFlow, and build real-world AI applications.',
    category: 'Machine Learning',
    readTime: '15 min read',
    publishedDate: '2024-01-12',
    featured: true,
  },
  {
    slug: 'final-year-project-ideas-computer-science',
    title: 'Final Year Project Ideas for Computer Science Students',
    excerpt: 'Explore 100+ final year project ideas across web dev, ML, blockchain, and IoT. Complete with implementation guides and tech stacks.',
    category: 'Student Projects',
    readTime: '18 min read',
    publishedDate: '2024-01-10',
    featured: true,
  },
  {
    slug: 'react-project-ideas-2024',
    title: 'React Project Ideas for Beginners to Advanced',
    excerpt: 'Master React with 40+ project ideas from simple components to complex applications. Learn hooks, state management, and Next.js.',
    category: 'Web Development',
    readTime: '14 min read',
    publishedDate: '2024-01-18',
    featured: false,
  },
  {
    slug: 'python-projects-for-portfolio',
    title: 'Python Projects Every Developer Should Build',
    excerpt: 'Build an impressive portfolio with 35+ Python projects covering web development, data science, automation, and machine learning.',
    category: 'Python',
    readTime: '16 min read',
    publishedDate: '2024-01-16',
    featured: false,
  },
  {
    slug: 'full-stack-mern-projects',
    title: 'Full Stack Project Ideas with MERN Stack',
    excerpt: 'Master full stack development with 25+ MERN projects. Learn MongoDB, Express, React, and Node.js by building real applications.',
    category: 'Full Stack',
    readTime: '17 min read',
    publishedDate: '2024-01-14',
    featured: false,
  },
  {
    slug: 'how-to-choose-right-project-skill-level',
    title: 'How to Choose the Right Project for Your Skill Level',
    excerpt: 'Learn how to select projects that match your experience and help you grow as a developer. Decision framework included.',
    category: 'Career Guide',
    readTime: '8 min read',
    publishedDate: '2024-01-08',
    featured: false,
  },
  {
    slug: 'blockchain-projects-beginner-to-advanced',
    title: 'Blockchain Projects: From Beginner to Advanced',
    excerpt: 'Master blockchain development with projects ranging from simple smart contracts to complex DeFi applications.',
    category: 'Blockchain',
    readTime: '14 min read',
    publishedDate: '2024-01-05',
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Devory Blog
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Expert guides, tutorials, and project ideas for developers and IT students. 
            Learn web development, machine learning, blockchain, and more.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-white/50 text-xs flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs flex items-center gap-1">
                      <FaCalendar className="w-3 h-3" />
                      {new Date(post.publishedDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="text-purple-400 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read More <FaArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#0d0d0d] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-white/50 text-xs flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-white/60 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    {new Date(post.publishedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="text-purple-400 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More <FaArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-white/60 text-sm leading-relaxed space-y-4">
            <p>
              <strong className="text-white">Welcome to the Devory Blog</strong> - your go-to resource for 
              project ideas, coding tutorials, and career guidance. Whether you&apos;re looking for web development 
              projects, machine learning tutorials, or final year project ideas, our expert guides will help 
              you succeed.
            </p>
            <p>
              Our blog covers everything from beginner-friendly projects to advanced development techniques. 
              Learn about the latest technologies, best practices, and industry trends. Perfect for IT students, 
              developers, and tech enthusiasts looking to expand their skills and build impressive portfolios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
