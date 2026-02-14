import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Read new projects from project1.json
const newProjects = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'project1.json'), 'utf-8')
);

async function main() {
  console.log('🚀 Adding new projects to database...');
  console.log(`📊 Total new projects to add: ${newProjects.length}`);
  console.log('');

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const project of newProjects) {
    try {
      // Check if project already exists
      const existing = await prisma.projects.findUnique({
        where: { slug: project.slug }
      });

      if (existing) {
        console.log(`   ⏭️  Skipped "${project.slug}" (already exists)`);
        skippedCount++;
        continue;
      }

      await prisma.projects.create({
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
        console.log(`   ✓ Added ${successCount} new projects...`);
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
