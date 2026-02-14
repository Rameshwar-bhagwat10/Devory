const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting to seed 50 community posts...');
  
  // Get or create user
  let user = await prisma.users.findFirst();
  
  if (!user) {
    console.log('Creating default user...');
    user = await prisma.users.create({
      data: {
        email: 'community@devmatch.com',
        name: 'DevMatch Community',
        username: 'devmatch',
        bio: 'Official DevMatch community account for seeding projects',
        skills: ['Full-stack', 'AI', 'Blockchain', 'IoT', 'Cloud'],
        interests: ['Innovation', 'Open Source', 'Collaboration'],
        onboardingCompleted: true,
      },
    });
  }
  
  console.log(`Using user: ${user.name}`);
  
  // Check existing posts
  const existingCount = await prisma.community_posts.count();
  console.log(`Existing posts: ${existingCount}`);
  
  if (existingCount >= 50) {
    console.log('✅ Already have 50+ posts. Skipping seed.');
    return;
  }
  
  // Delete existing posts if less than 50
  if (existingCount > 0 && existingCount < 50) {
    console.log(`Deleting ${existingCount} existing posts...`);
    await prisma.community_posts.deleteMany({});
  }
  
  console.log('\nCreating 25 IDEA posts...');
  
  const ideas = [
    { title: 'AI-Powered Code Review Assistant', short: 'An intelligent tool that analyzes code quality, suggests improvements, and detects potential bugs using machine learning algorithms.', full: 'This project aims to create an AI-powered code review assistant that integrates with popular version control systems like GitHub and GitLab. The tool will use advanced machine learning models to analyze code patterns, identify potential bugs, suggest performance optimizations, and ensure adherence to coding standards.', domain: 'AI_ML', difficulty: 'ADVANCED', tags: ['AI', 'Machine Learning', 'Code Quality', 'DevOps'], techStack: ['Python', 'TensorFlow', 'FastAPI', 'Docker'], duration: '4-6 months' },
    { title: 'Decentralized Social Media Platform', short: 'A blockchain-based social network where users own their data and content, with built-in monetization through cryptocurrency.', full: 'Build a revolutionary social media platform on blockchain technology that gives users complete control over their data and content. The platform will use smart contracts for content ownership, implement a token-based economy for content monetization, and provide decentralized storage using IPFS.', domain: 'BLOCKCHAIN', difficulty: 'EXPERT', tags: ['Blockchain', 'Web3', 'Cryptocurrency', 'Decentralization'], techStack: ['Solidity', 'Ethereum', 'React', 'IPFS', 'Web3.js'], duration: '8-12 months' },
    { title: 'Real-Time Collaborative Whiteboard', short: 'An interactive online whiteboard with real-time collaboration, perfect for remote teams and online education.', full: 'Create a feature-rich collaborative whiteboard application that enables teams to brainstorm, design, and plan together in real-time. The platform will support unlimited canvas size, various drawing tools, sticky notes, shapes, and image uploads.', domain: 'WEB_DEVELOPMENT', difficulty: 'INTERMEDIATE', tags: ['Real-time', 'Collaboration', 'WebSocket', 'Canvas'], techStack: ['React', 'Node.js', 'Socket.io', 'Canvas API', 'MongoDB'], duration: '3-4 months' },
    { title: 'Smart Home Energy Management System', short: 'IoT-based system that optimizes home energy consumption using AI to reduce electricity bills and carbon footprint.', full: 'Develop an intelligent energy management system for smart homes that monitors, analyzes, and optimizes energy consumption. The system will use IoT sensors to track energy usage of individual appliances, predict consumption patterns using machine learning.', domain: 'IOT', difficulty: 'ADVANCED', tags: ['IoT', 'Smart Home', 'Energy', 'Sustainability', 'AI'], techStack: ['Python', 'Raspberry Pi', 'MQTT', 'React Native', 'InfluxDB'], duration: '5-7 months' },
    { title: 'Automated Penetration Testing Framework', short: 'A comprehensive security testing tool that automatically identifies vulnerabilities in web applications and networks.', full: 'Create an advanced penetration testing framework that automates the discovery and exploitation of security vulnerabilities. The tool will perform comprehensive scans including SQL injection, XSS, CSRF, authentication bypass, and configuration issues.', domain: 'CYBERSECURITY', difficulty: 'EXPERT', tags: ['Security', 'Penetration Testing', 'Vulnerability', 'Automation'], techStack: ['Python', 'Metasploit', 'Nmap', 'Burp Suite API', 'Django'], duration: '6-9 months' },
  ];
  
  // Create first 5 ideas
  for (let i = 0; i < ideas.length; i++) {
    const idea = ideas[i];
    try {
      const post = await prisma.community_posts.create({
        data: {
          type: 'IDEA',
          title: idea.title,
          slug: idea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${Date.now()}-${i}`,
          shortDescription: idea.short,
          fullDescription: idea.full,
          domain: idea.domain,
          difficulty: idea.difficulty,
          tags: idea.tags,
          techStack: idea.techStack,
          estimatedDuration: idea.duration,
          userId: user.id,
          viewsCount: Math.floor(Math.random() * 500) + 50,
          status: 'OPEN',
        },
      });
      console.log(`✓ Created IDEA ${i+1}/25: ${post.title}`);
    } catch (error) {
      console.error(`✗ Failed: ${idea.title}`, error.message);
    }
  }
  
  console.log('\n✅ Created 5 sample posts. Run the full seed script for all 50 posts.');
}

seed()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
