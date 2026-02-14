const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting to seed 50 community posts...\n');
  
  // Get or create user
  let user = await prisma.users.findFirst();
  
  if (!user) {
    console.log('Creating default user...');
    user = await prisma.users.create({
      data: {
        email: 'community@devmatch.com',
        name: 'DevMatch Community',
        username: 'devmatch_community',
        bio: 'Official DevMatch community account for seeding projects',
        skills: ['Full-stack', 'AI', 'Blockchain', 'IoT', 'Cloud'],
        interests: ['Innovation', 'Open Source', 'Collaboration'],
        onboardingCompleted: true,
      },
    });
  }
  
  console.log(`✓ Using user: ${user.name} (${user.email})\n`);
  
  // Check existing posts
  const existingCount = await prisma.community_posts.count();
  console.log(`Current posts in database: ${existingCount}`);
  
  if (existingCount >= 50) {
    console.log('✅ Already have 50+ posts. Skipping seed.\n');
    return;
  }
  
  // Read and parse the TypeScript file
  console.log('Reading seed data from TypeScript file...');
  const tsContent = fs.readFileSync('scripts/seed-community-posts.ts', 'utf8');
  
  // Extract IDEAS array
  const ideasMatch = tsContent.match(/const IDEAS = \[([\s\S]*?)\];[\s\S]*?const COLLABORATIONS/);
  const collabsMatch = tsContent.match(/const COLLABORATIONS = \[([\s\S]*?)\];[\s\S]*?async function main/);
  
  if (!ideasMatch || !collabsMatch) {
    throw new Error('Could not parse seed data from TypeScript file');
  }
  
  // Convert TypeScript to JavaScript by removing type annotations
  const ideasStr = ideasMatch[1]
    .replace(/as ProjectDomain/g, '')
    .replace(/as ProjectDifficulty/g, '')
    .replace(/as PostType/g, '');
    
  const collabsStr = collabsMatch[1]
    .replace(/as ProjectDomain/g, '')
    .replace(/as ProjectDifficulty/g, '')
    .replace(/as PostType/g, '');
  
  // Evaluate the arrays
  const IDEAS = eval(`[${ideasStr}]`);
  const COLLABORATIONS = eval(`[${collabsStr}]`);
  
  console.log(`✓ Parsed ${IDEAS.length} ideas and ${COLLABORATIONS.length} collaborations\n`);
  
  // Create IDEA posts
  console.log('Creating 25 IDEA posts...');
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
      console.log(`  ✓ ${i + 1}/25: ${post.title}`);
    } catch (error) {
      console.error(`  ✗ Failed: ${idea.title} - ${error.message}`);
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
      console.log(`  ✓ ${i + 1}/25: ${post.title}`);
    } catch (error) {
      console.error(`  ✗ Failed: ${collab.title} - ${error.message}`);
    }
  }
  
  const finalCount = await prisma.community_posts.count();
  console.log(`\n✅ Seeding completed successfully!`);
  console.log(`📊 Total posts in database: ${finalCount}`);
}

seed()
  .catch(e => {
    console.error('\n❌ Error during seeding:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
