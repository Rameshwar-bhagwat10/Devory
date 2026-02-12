import { PrismaClient, ProjectDomain, ProjectDifficulty } from '@prisma/client';
import { projectsData } from './projects-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing projects
  await prisma.project.deleteMany({});
  console.log('Cleared existing projects');

  // Seed projects
  let count = 0;
  for (const project of projectsData) {
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
  }

  console.log(`✅ Successfully seeded ${count} projects`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
