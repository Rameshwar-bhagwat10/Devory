const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting quick seed...');
  
  // Check for existing user
  let user = await prisma.users.findFirst();
  
  if (!user) {
    console.log('Creating default user...');
    user = await prisma.users.create({
      data: {
        email: 'community@devmatch.com',
        name: 'DevMatch Community',
        username: 'devmatch',
        bio: 'Official DevMatch community account',
        skills: ['Full-stack', 'AI', 'Blockchain'],
        interests: ['Innovation', 'Open Source'],
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
  
  console.log('Creating sample posts...');
  
  // Create a few sample posts to test
  const sampleIdea = await prisma.community_posts.create({
    data: {
      type: 'IDEA',
      title: 'AI-Powered Code Review Assistant',
      slug: `ai-code-review-${Date.now()}`,
      shortDescription: 'An intelligent tool that analyzes code quality and suggests improvements.',
      fullDescription: 'This project aims to create an AI-powered code review assistant that integrates with GitHub and GitLab.',
      domain: 'AI_ML',
      difficulty: 'ADVANCED',
      tags: ['AI', 'Machine Learning', 'Code Quality'],
      techStack: ['Python', 'TensorFlow', 'FastAPI'],
      estimatedDuration: '4-6 months',
      userId: user.id,
      viewsCount: 150,
      status: 'OPEN',
    },
  });
  
  console.log(`✓ Created: ${sampleIdea.title}`);
  
  const sampleCollab = await prisma.community_posts.create({
    data: {
      type: 'COLLABORATION',
      title: 'Open Source Healthcare Management System',
      slug: `healthcare-system-${Date.now()}`,
      shortDescription: 'Building a comprehensive, HIPAA-compliant healthcare management system.',
      fullDescription: 'We are developing an open-source healthcare management system for clinics and hospitals.',
      domain: 'WEB_DEVELOPMENT',
      difficulty: 'ADVANCED',
      tags: ['Healthcare', 'Open Source', 'HIPAA'],
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      estimatedDuration: '8-12 months',
      requiredCollaborators: 5,
      requiredSkills: ['Full-stack', 'Healthcare IT', 'Security'],
      userId: user.id,
      viewsCount: 200,
      status: 'OPEN',
    },
  });
  
  console.log(`✓ Created: ${sampleCollab.title}`);
  console.log('✅ Quick seed completed!');
}

seed()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
