```js
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Initialize Prisma client using the DATABASE_URL environment variable
const prisma = new PrismaClient();

async function main() {
  // Optionally create a couple of providers to reference in appointments
  await prisma.providers.createMany({
    data: [
      { id: 'prov-1', name: 'John Smith' },
      { id: 'prov-2', name: 'Emily Clark' },
    ],
    skipDuplicates: true,
  });

  const sampleAppointments = [];

  // Generate 5 realistic appointment entries
  for (let i = 0; i < 5; i++) {
    const start = faker.date.soon({ unit: 'hour', quantity: 2 });
    const startIso = new Date(start).toISOString();
    const end = new Date(start.getTime() + 15 * 60 * 1000); // 15 minutes
    const endIso = end.toISOString();

    sampleAppointments.push({
      start_time: startIso,
      end_time: endIso,
      provider_id: 'prov-1',
      client_name: faker.name.fullName(),
      status: 'open',
    });
  }

  // Insert the sample appointments into the database
  await prisma.appointment.createMany({
    data: sampleAppointments,
    skipDuplicates: true,
  });

  console.log('Seed script completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```