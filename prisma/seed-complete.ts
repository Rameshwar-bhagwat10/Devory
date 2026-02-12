import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Import TypeScript project data
async function loadTypeScriptProjects() {
  const projectsData = await import('./projects-data');
  const additionalProjects = await import('./additional-projects');
  const remainingProjects = await import('./remaining-projects');
  
  return [
    ...(projectsData.projectsData || []),
    ...(additionalProjects.additionalProjects || []),
    ...(remainingProjects.remainingProjects || [])
  ];
}

// Read new projects from JSON file
const newProjectsJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf-8')
);

async function main() {
  console.log('🌱 Starting complete database seed...');
  
  // Load TypeScript projects
  const tsProjects = await loadTypeScriptProjects();
  
  console.log('📊 Total projects to seed:');
  console.log(`   - TypeScript projects: ${tsProjects.length}`);
  console.log(`   - New JSON projects: ${newProjectsJson.length}`);
  console.log(`   - TOTAL: ${tsProjects.length + newProjectsJson.length}`);
  console.log('');

  // Combine all projects
  const allProjects = [
    ...tsProjects,
    ...newProjectsJson
  ];

  console.log(`🚀 Seeding ${allProjects.length} projects...`);

  let successCount = 0;
  let errorCount = 0;

  for (const project of allProjects) {
    try {
      await prisma.project.upsert({
        where: { slug: project.slug },
        update: {
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
        create: {
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
      if (successCount % 10 === 0) {
        console.log(`   ✓ Seeded ${successCount} projects...`);
      }
    } catch (error: any) {
      errorCount++;
      console.error(`   ✗ Error seeding project "${project.slug}":`, error.message);
    }
  }

  console.log('');
  console.log('✅ Seed completed!');
  console.log(`   - Successfully seeded: ${successCount} projects`);
  console.log(`   - Errors: ${errorCount}`);
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
