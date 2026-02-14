const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import the data
const IDEAS = require('./data/ideas.json');
const COLLABORATIONS = require('./data/collaborations.json');

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
  
  // Create IDEA posts
  console.log('\nCreating 25 IDEA posts...');
  for (let i = 0; i < IDEAS.length; i++) {
    const idea = IDEAS[i];
    try {
      const post = await prisma.community_posts.create({
        data: {
          type: 'IDEA',
          title: idea.title,
          slug: idea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${Date.now()}-${i}`,
          shortDescription: idea.shortDescription,
          fullDescription: idea.fullDescription,
          domain: idea.domain,
          difficulty: idea.difficulty,
          tags: idea.tags,
          techStack: idea.techStack,
          estimatedDuration: idea.estimatedDuration,
          userId: user.id,
          viewsCount: Math.floor(Math.random() * 500) + 50,
          status: 'OPEN',
        },
      });
      console.log(`✓ Created IDEA: ${post.title}`);
    } catch (error) {
      console.error(`✗ Failed to create IDEA: ${idea.title}`, error.message);
    }
  }
  
  // Create COLLABORATION posts
  console.log('\nCreating 25 COLLABORATION posts...');
  for (let i = 0; i < COLLABORATIONS.length; i++) {
    const collab = COLLABORATIONS[i];
    try {
      const post = await prisma.community_posts.create({
        data: {
          type: 'COLLABORATION',
          title: collab.title,
          slug: collab.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${Date.now()}-${i}`,
          shortDescription: collab.shortDescription,
          fullDescription: collab.fullDescription,
          domain: collab.domain,
          difficulty: collab.difficulty,
          tags: collab.tags,
          techStack: collab.techStack,
          estimatedDuration: collab.estimatedDuration,
          requiredCollaborators: collab.requiredCollaborators,
          requiredSkills: collab.requiredSkills,
          userId: user.id,
          viewsCount: Math.floor(Math.random() * 500) + 50,
          status: 'OPEN',
        },
      });
      console.log(`✓ Created COLLABORATION: ${post.title}`);
    } catch (error) {
      console.error(`✗ Failed to create COLLABORATION: ${collab.title}`, error.message);
    }
  }
  
  console.log('\n✅ Seeding completed successfully!');
  console.log(`Total posts created: ${IDEAS.length + COLLABORATIONS.length}`);
}

seed()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
