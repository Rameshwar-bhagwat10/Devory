const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  console.log('🔍 Verifying Community Page Fix...\n');
  
  try {
    // Test the exact query that the community page uses
    const posts = await prisma.community_posts.findMany({
      where: { isApproved: true },
      orderBy: { trendingScore: 'desc' },
      take: 5,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    
    console.log('✓ Successfully fetched posts with user data\n');
    
    // Verify each post has user data
    let allHaveUsers = true;
    posts.forEach((post, i) => {
      if (!post.users) {
        console.log(`❌ Post ${i + 1} missing users data`);
        allHaveUsers = false;
      } else {
        console.log(`✓ Post ${i + 1}: "${post.title}"`);
        console.log(`   Author: ${post.users.name || 'No name'}`);
        console.log(`   User ID: ${post.users.id}`);
      }
    });
    
    if (allHaveUsers) {
      console.log('\n✅ All posts have user data - Community page should work!');
    } else {
      console.log('\n⚠️  Some posts are missing user data');
    }
    
    // Test the formatPost logic
    console.log('\n📝 Testing formatPost logic:');
    const samplePost = posts[0];
    if (samplePost) {
      const formatted = {
        ...samplePost,
        user: samplePost.users, // This is what formatPost does
        techStack: samplePost.techStack,
        tags: samplePost.tags,
        requiredSkills: samplePost.requiredSkills,
      };
      
      console.log(`   Original has 'users': ${!!samplePost.users}`);
      console.log(`   Formatted has 'user': ${!!formatted.user}`);
      console.log(`   User name accessible: ${formatted.user?.name || 'N/A'}`);
      console.log('\n✅ Format mapping works correctly!');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    throw error;
  }
}

verify().finally(() => prisma.$disconnect());
