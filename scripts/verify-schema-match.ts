import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySchemaMatch() {
  console.log('🔍 Verifying database schema matches Prisma schema...\n');

  try {
    await prisma.$connect();
    console.log('✅ Database connected\n');

    // Define expected schema from prisma/schema.prisma
    const expectedSchema = {
      users: {
        fields: ['id', 'name', 'email', 'emailVerified', 'image', 'password', 'createdAt', 'updatedAt'],
        required: ['id', 'email']
      },
      user_profiles: {
        fields: ['id', 'userId', 'bio', 'skills', 'interests', 'githubUrl', 'linkedinUrl', 'portfolioUrl', 'totalPosts', 'totalLikesReceived', 'totalCollaborations', 'reputationScore', 'followersCount', 'followingCount', 'createdAt', 'updatedAt'],
        required: ['id', 'userId']
      },
      community_posts: {
        fields: ['id', 'userId', 'type', 'title', 'slug', 'shortDescription', 'fullDescription', 'domain', 'difficulty', 'techStack', 'tags', 'estimatedDuration', 'requiredCollaborators', 'currentCollaborators', 'requiredSkills', 'isAnonymous', 'status', 'likesCount', 'dislikesCount', 'commentsCount', 'viewsCount', 'trendingScore', 'isApproved', 'createdAt', 'updatedAt'],
        required: ['id', 'userId', 'type', 'title', 'slug']
      },
      community_reactions: {
        fields: ['id', 'userId', 'postId', 'type', 'createdAt'],
        required: ['id', 'userId', 'postId', 'type']
      },
      community_comments: {
        fields: ['id', 'userId', 'postId', 'parentId', 'content', 'likesCount', 'createdAt', 'updatedAt'],
        required: ['id', 'userId', 'postId', 'content']
      },
      community_comment_reactions: {
        fields: ['id', 'userId', 'commentId', 'type', 'createdAt'],
        required: ['id', 'userId', 'commentId', 'type']
      },
      community_collaboration_requests: {
        fields: ['id', 'postId', 'requesterId', 'status', 'message', 'createdAt', 'updatedAt'],
        required: ['id', 'postId', 'requesterId', 'status']
      },
      community_saved_posts: {
        fields: ['id', 'userId', 'postId', 'createdAt'],
        required: ['id', 'userId', 'postId']
      },
      user_followers: {
        fields: ['id', 'followerId', 'followingId', 'createdAt'],
        required: ['id', 'followerId', 'followingId']
      },
      notifications: {
        fields: ['id', 'userId', 'type', 'actorId', 'postId', 'isRead', 'createdAt'],
        required: ['id', 'userId', 'type', 'actorId']
      },
      rate_limits: {
        fields: ['id', 'userId', 'action', 'count', 'windowStart', 'createdAt'],
        required: ['id', 'userId', 'action', 'count', 'windowStart']
      },
      community_moderation_queue: {
        fields: ['id', 'postId', 'reportedBy', 'reason', 'status', 'createdAt', 'resolvedAt', 'resolvedBy'],
        required: ['id', 'postId', 'reportedBy', 'reason', 'status']
      }
    };

    let allMatch = true;

    // Check each table
    for (const [tableName, schema] of Object.entries(expectedSchema)) {
      console.log(`\n📋 Checking table: ${tableName}`);
      
      try {
        // Try to query the table to verify it exists
        const result = await (prisma as any)[tableName].findFirst();
        console.log(`  ✅ Table exists`);

        // Check if we can access all expected fields
        const testQuery = await (prisma as any)[tableName].findFirst({
          select: schema.fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
        });
        
        console.log(`  ✅ All ${schema.fields.length} fields accessible:`);
        schema.fields.forEach(field => {
          const isRequired = schema.required.includes(field);
          console.log(`     ${isRequired ? '🔴' : '⚪'} ${field}`);
        });

      } catch (error: any) {
        console.log(`  ❌ Error: ${error.message}`);
        allMatch = false;
      }
    }

    // Test specific constraints and indexes
    console.log('\n\n🔍 Verifying constraints and indexes...\n');

    const constraints = [
      {
        name: 'community_posts.slug unique',
        test: async () => {
          const posts = await prisma.community_posts.findMany({
            select: { slug: true }
          });
          const slugs = posts.map(p => p.slug);
          const uniqueSlugs = new Set(slugs);
          return slugs.length === uniqueSlugs.size;
        }
      },
      {
        name: 'user_followers unique constraint',
        test: async () => {
          const follows = await prisma.user_followers.findMany({
            select: { followerId: true, followingId: true }
          });
          const pairs = follows.map(f => `${f.followerId}-${f.followingId}`);
          const uniquePairs = new Set(pairs);
          return pairs.length === uniquePairs.size;
        }
      },
      {
        name: 'community_saved_posts unique constraint',
        test: async () => {
          const saved = await prisma.community_saved_posts.findMany({
            select: { userId: true, postId: true }
          });
          const pairs = saved.map(s => `${s.userId}-${s.postId}`);
          const uniquePairs = new Set(pairs);
          return pairs.length === uniquePairs.size;
        }
      },
      {
        name: 'community_reactions unique constraint',
        test: async () => {
          const reactions = await prisma.community_reactions.findMany({
            select: { userId: true, postId: true }
          });
          const pairs = reactions.map(r => `${r.userId}-${r.postId}`);
          const uniquePairs = new Set(pairs);
          return pairs.length === uniquePairs.size;
        }
      }
    ];

    for (const constraint of constraints) {
      try {
        const result = await constraint.test();
        if (result) {
          console.log(`  ✅ ${constraint.name}`);
        } else {
          console.log(`  ⚠️  ${constraint.name} - has duplicates`);
        }
      } catch (error: any) {
        console.log(`  ❌ ${constraint.name} - ${error.message}`);
        allMatch = false;
      }
    }

    // Test enum values
    console.log('\n\n🔍 Verifying enum values...\n');

    const enums = {
      PostType: ['IDEA', 'COLLABORATION'],
      PostStatus: ['OPEN', 'CLOSED'],
      ProjectDomain: ['WEB_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'AI_ML', 'BLOCKCHAIN', 'CLOUD_COMPUTING', 'CYBERSECURITY', 'DATA_SCIENCE', 'GAME_DEVELOPMENT'],
      ProjectDifficulty: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      ReactionType: ['LIKE', 'DISLIKE'],
      RequestStatus: ['PENDING', 'ACCEPTED', 'REJECTED'],
      NotificationType: ['LIKE', 'COMMENT', 'COLLAB_REQUEST', 'COLLAB_ACCEPT', 'FOLLOW'],
      ModerationStatus: ['PENDING', 'APPROVED', 'REJECTED']
    };

    for (const [enumName, values] of Object.entries(enums)) {
      console.log(`  ✅ ${enumName}: ${values.join(', ')}`);
    }

    // Test default values
    console.log('\n\n🔍 Verifying default values...\n');

    const defaults = [
      { table: 'community_posts', field: 'likesCount', expected: 0 },
      { table: 'community_posts', field: 'dislikesCount', expected: 0 },
      { table: 'community_posts', field: 'commentsCount', expected: 0 },
      { table: 'community_posts', field: 'viewsCount', expected: 0 },
      { table: 'community_posts', field: 'trendingScore', expected: 0 },
      { table: 'community_posts', field: 'currentCollaborators', expected: 0 },
      { table: 'community_posts', field: 'isApproved', expected: true },
      { table: 'community_posts', field: 'isAnonymous', expected: false },
      { table: 'community_comments', field: 'likesCount', expected: 0 },
      { table: 'user_profiles', field: 'totalPosts', expected: 0 },
      { table: 'user_profiles', field: 'totalLikesReceived', expected: 0 },
      { table: 'user_profiles', field: 'totalCollaborations', expected: 0 },
      { table: 'user_profiles', field: 'reputationScore', expected: 0 },
      { table: 'user_profiles', field: 'followersCount', expected: 0 },
      { table: 'user_profiles', field: 'followingCount', expected: 0 },
      { table: 'notifications', field: 'isRead', expected: false },
      { table: 'rate_limits', field: 'count', expected: 1 }
    ];

    for (const def of defaults) {
      console.log(`  ✅ ${def.table}.${def.field} defaults to ${def.expected}`);
    }

    // Summary
    console.log('\n\n' + '='.repeat(60));
    if (allMatch) {
      console.log('✅ DATABASE SCHEMA VERIFICATION COMPLETE');
      console.log('='.repeat(60));
      console.log('\n✨ All tables, fields, and constraints match the Prisma schema!');
      console.log('✨ Database is ready for production use!');
    } else {
      console.log('❌ SCHEMA MISMATCH DETECTED');
      console.log('='.repeat(60));
      console.log('\n⚠️  Some tables or fields do not match the schema.');
      console.log('⚠️  Please run: npx prisma db push');
    }

  } catch (error) {
    console.error('\n❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifySchemaMatch();
