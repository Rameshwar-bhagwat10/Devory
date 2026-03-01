import { Metadata } from 'next';
import Link from 'next/link';
import { FaCode, FaRobot, FaGraduationCap, FaMobileAlt, FaCube, FaDatabase } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Developer Resources & Guides | Devory',
  description: 'Comprehensive guides, tutorials, and resources for web development, machine learning, blockchain, and more. Perfect for students and developers.',
  keywords: [
    'developer resources',
    'programming guides',
    'web development tutorials',
    'machine learning resources',
    'coding guides',
    'student resources',
    'project tutorials',
  ],
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    type: 'website',
    url: '/resources',
    title: 'Developer Resources & Guides | Devory',
    description: 'Comprehensive guides, tutorials, and resources for developers and students.',
    images: ['/og-resources.png'],
  },
};

const resourceCategories = [
  {
    title: 'Web Development',
    description: 'Complete guides for React, Next.js, Node.js, and full-stack development',
    icon: FaCode,
    href: '/blog/top-50-web-development-projects-2024',
    color: 'from-purple-500 to-blue-500',
    topics: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Full Stack'],
  },
  {
    title: 'Machine Learning',
    description: 'ML project guides, tutorials, and learning paths for beginners to advanced',
    icon: FaRobot,
    href: '/blog/machine-learning-projects-students-guide',
    color: 'from-blue-500 to-cyan-500',
    topics: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP'],
  },
  {
    title: 'Student Projects',
    description: 'Final year project ideas and guides for computer science students',
    icon: FaGraduationCap,
    href: '/blog/final-year-project-ideas-computer-science',
    color: 'from-cyan-500 to-teal-500',
    topics: ['Final Year', 'Capstone', 'Portfolio', 'Academic', 'Research'],
  },
  {
    title: 'Mobile Development',
    description: 'React Native, Flutter, and mobile app development resources',
    icon: FaMobileAlt,
    href: '/projects',
    color: 'from-teal-500 to-green-500',
    topics: ['React Native', 'Flutter', 'iOS', 'Android', 'Cross-platform'],
  },
  {
    title: 'Blockchain & Web3',
    description: 'Smart contracts, DeFi, and blockchain development guides',
    icon: FaCube,
    href: '/blog/blockchain-projects-beginner-to-advanced',
    color: 'from-green-500 to-yellow-500',
    topics: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi', 'NFTs'],
  },
  {
    title: 'Data Science',
    description: 'Data analysis, visualization, and data science project resources',
    icon: FaDatabase,
    href: '/projects',
    color: 'from-yellow-500 to-orange-500',
    topics: ['Python', 'Pandas', 'Data Analysis', 'Visualization', 'SQL'],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050810] via-[#080b14] to-[#050810]">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Developer Resources & Guides
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive tutorials, guides, and resources to help you master web development, 
            machine learning, blockchain, and more. Perfect for students and developers at all levels.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {resourceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                href={category.href}
                className="group bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-white/60 mb-4">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {category.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Popular Guides */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Popular Guides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/top-50-web-development-projects-2024"
              className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Top 50 Web Development Projects for Beginners
              </h3>
              <p className="text-white/60 text-sm">
                Complete guide to web dev projects with React, Next.js, and Node.js
              </p>
            </Link>
            
            <Link
              href="/blog/machine-learning-projects-students-guide"
              className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Machine Learning Projects for Students
              </h3>
              <p className="text-white/60 text-sm">
                Comprehensive ML guide from beginner to advanced projects
              </p>
            </Link>
            
            <Link
              href="/blog/final-year-project-ideas-computer-science"
              className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Final Year Project Ideas for CS Students
              </h3>
              <p className="text-white/60 text-sm">
                100+ project ideas across web dev, ML, blockchain, and IoT
              </p>
            </Link>
            
            <Link
              href="/blog/how-to-choose-right-project-skill-level"
              className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                How to Choose the Right Project
              </h3>
              <p className="text-white/60 text-sm">
                Decision framework for selecting projects that match your skill level
              </p>
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Why Use Devory Resources?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-white/70 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">For Students</h3>
              <p className="mb-4">
                Our resources are specifically designed for IT students and computer science learners. 
                Whether you&apos;re working on your final year project or building your portfolio, we provide 
                detailed guides with implementation steps, tech stack recommendations, and difficulty ratings.
              </p>
              <p>
                Perfect for beginners learning web development, intermediate developers exploring machine 
                learning, or advanced students building complex blockchain applications.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">For Developers</h3>
              <p className="mb-4">
                Expand your skills with project-based learning. Our guides cover modern technologies like 
                React, Next.js, TensorFlow, PyTorch, Solidity, and more. Each resource includes practical 
                examples, best practices, and real-world applications.
              </p>
              <p>
                From web development projects to machine learning applications, find resources that help 
                you build production-ready projects and advance your career.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Explore All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
