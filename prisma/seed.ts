import prisma from "./../lib/prismadb";
import { userRoles } from "./enum";

async function main() {

  // Seed roles based on the UserRole enum
  const rolesData = (Object.keys(userRoles) as Array<keyof typeof userRoles>).map(roleName => ({ name: userRoles[roleName] }));

  // Create multiple roles at once
  await prisma.role.createMany({
    data: rolesData,
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Database seeded successfully.');
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
