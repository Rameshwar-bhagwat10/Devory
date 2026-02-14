const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const total = await prisma.community_posts.count();
  const ideas = await prisma.community_posts.count({ where: { type: 'IDEA' } });
  const collabs = await prisma.community_posts.count({ where: { type: 'COLLABORATION' } });
  
  console.log('📊 Database Statistics:');
  console.log(`   Total posts: ${total}`);
  console.log(`   Ideas: ${ideas}`);
  console.log(`   Collaborations: ${collabs}`);
}

check().finally(() => prisma.$disconnect());
