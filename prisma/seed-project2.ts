import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Read projects from project2.json
const projects = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'project2.json'), 'utf-8')
);

async function main() {
  console.log('🚀 Adding projects from project2.json...');
  console.log(`📊 Total projects to add: ${projects.length}`);
  console.log('');

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const project of projects) {
    try {
      // Check if project already exists
      const existing = await prisma.project.findUnique({
        where: { slug: project.slug }
      });

      if (existing) {
        console.log(`   ⏭️  Skipped "${project.slug}" (already exists)`);
        skippedCount++;
        continue;
      }

      await prisma.project.create({
        data: {
          slug: project.slug,
          title: project.title,
          shortDescription: project.shortDescription,
          fullDescription: project.fullDescription,
          domain: project.domain,
          difficulty: project.difficulty,
          estimatedDuration: project.estimatedDuration,
          recommendedYear: project.recommendedYear,
          primaryTechnology: project.primaryTechnology,
          techStack: project.techStack,
          architecture: project.architecture || 'Standard architecture',
          features: project.features,
          skillsRequired: project.skillsRequired,
          learningOutcomes: project.learningOutcomes,
          timeline: project.timeline,
          isPublished: true,
        },
      });
      
      successCount++;
      if (successCount % 5 === 0) {
        console.log(`   ✓ Added ${successCount} projects...`);
      }
    } catch (error: any) {
      errorCount++;
      console.error(`   ✗ Error adding project "${project.slug}":`, error.message);
    }
  }

  console.log('');
  console.log('✅ Migration completed!');
  console.log(`   - Successfully added: ${successCount} projects`);
  console.log(`   - Skipped (duplicates): ${skippedCount} projects`);
  console.log(`   - Errors: ${errorCount}`);
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
