import { PrismaClient, ProjectDomain, ProjectDifficulty } from '@prisma/client';
import { projectsData } from './projects-data';
import { additionalProjects } from './additional-projects';
import { remainingProjects } from './remaining-projects';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting FINAL database seed with ALL projects...');

  // Clear existing projects
  await prisma.project.deleteMany({});
  console.log('Cleared existing projects');

  // Combine all projects
  const allProjects = [...projectsData, ...additionalProjects, ...remainingProjects];
  console.log(`Total projects to seed: ${allProjects.length}`);
  console.log(`  - Original projects: ${projectsData.length}`);
  console.log(`  - Additional projects: ${additionalProjects.length}`);
  console.log(`  - Remaining projects: ${remainingProjects.length}`);

  // Seed projects
  let count = 0;
  for (const project of allProjects) {
    try {
      await prisma.project.create({
        data: {
          slug: project.slug,
          title: project.title,
          shortDescription: project.shortDescription,
          fullDescription: project.fullDescription,
          domain: project.domain as ProjectDomain,
          difficulty: project.difficulty as ProjectDifficulty,
          estimatedDuration: project.estimatedDuration,
          recommendedYear: project.recommendedYear,
          primaryTechnology: project.primaryTechnology,
          techStack: project.techStack,
          architecture: project.architecture,
          features: project.features,
          skillsRequired: project.skillsRequired,
          learningOutcomes: project.learningOutcomes,
          timeline: project.timeline,
        },
      });
      count++;
      if (count % 10 === 0) {
        console.log(`Seeded ${count} projects...`);
      }
    } catch (error) {
      console.error(`Error seeding project ${project.slug}:`, error);
      throw error;
    }
  }

  console.log(`\n✅ Successfully seeded ${count} projects!`);
  console.log(`\nBreakdown:`);
  console.log(`  - Original projects: ${projectsData.length}`);
  console.log(`  - Additional projects: ${additionalProjects.length}`);
  console.log(`  - Remaining projects: ${remainingProjects.length}`);
  console.log(`  - TOTAL: ${count} projects`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
