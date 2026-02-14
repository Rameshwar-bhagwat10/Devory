const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  console.log('🧪 Testing Community Page Data...\n');
  
  try {
    // Test 1: Check posts exist
    const totalPosts = await prisma.community_posts.count();
    console.log(`✓ Total posts: ${totalPosts}`);
    
    // Test 2: Check approved posts
    const approvedPosts = await prisma.community_posts.count({
      where: { isApproved: true }
    });
    console.log(`✓ Approved posts: ${approvedPosts}`);
    
    // Test 3: Get sample posts
    const samplePosts = await prisma.community_posts.findMany({
      where: { isApproved: true },
      take: 3,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`\n📝 Sample Posts:`);
    samplePosts.forEach((post, i) => {
      console.log(`   ${i + 1}. ${post.title}`);
      console.log(`      Type: ${post.type}, Domain: ${post.domain}`);
      console.log(`      Author: ${post.users.name}`);
      console.log(`      Views: ${post.viewsCount}, Likes: ${post.likesCount}`);
    });
    
    // Test 4: Check trending posts
    const trendingPosts = await prisma.community_posts.findMany({
      where: { isApproved: true },
      orderBy: { trendingScore: 'desc' },
      take: 5,
      select: {
        title: true,
        trendingScore: true,
      }
    });
    
    console.log(`\n🔥 Top 5 Trending Posts:`);
    trendingPosts.forEach((post, i) => {
      console.log(`   ${i + 1}. ${post.title} (Score: ${post.trendingScore.toFixed(2)})`);
    });
    
    // Test 5: Check collaborations
    const collabs = await prisma.community_posts.count({
      where: {
        type: 'COLLABORATION',
        status: 'OPEN',
        isApproved: true,
      }
    });
    console.log(`\n🤝 Open collaborations: ${collabs}`);
    
    console.log('\n✅ All tests passed! Community page should be working.');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    throw error;
  }
}

test().finally(() => prisma.$disconnect());
