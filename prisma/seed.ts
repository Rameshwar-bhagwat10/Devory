// Prisma seed file - install @prisma/client to use

async function main() {
  console.log('Seeding database...');
  // Add seed data here
}

if (require.main === module) {
  main()
    .catch((e) => console.error(e))
    .finally(async () => {
      // await prisma.$disconnect();
    });
}
