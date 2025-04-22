import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create tags
  const tags = [
    'Frontend', 'Backend', 'React', 'TypeScript', 'UI/UX', 'Healthcare', 
    'Fintech', 'Figma', 'Go', 'Distributed Systems', 'Infrastructure'
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag },
      update: {},
      create: { name: tag },
    });
  }

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'alex@example.com' },
    update: {},
    create: {
      email: 'alex@example.com',
      name: 'Alex Johnson',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      email: 'sarah@example.com',
      name: 'Sarah Lee',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  });

  // Create referrals
  // Frontend Developer position
  const frontendTags = await prisma.tag.findMany({
    where: { name: { in: ['Frontend', 'React', 'TypeScript'] } },
  });
  
  await prisma.referral.create({
    data: {
      title: 'Senior Frontend Developer at a growing fintech startup',
      description: 'Looking for someone with 4+ years of React experience.',
      location: 'San Francisco, CA',
      workType: 'Remote',
      authorId: user1.id,
      tags: {
        connect: frontendTags.map((tag) => ({ id: tag.id })),
      },
    },
  });

  // Product Designer position
  const designTags = await prisma.tag.findMany({
    where: { name: { in: ['UI/UX', 'Figma'] } },
  });
  
  await prisma.referral.create({
    data: {
      title: 'Product Designer role at healthcare tech company',
      description: 'Must have experience with design systems and user research.',
      location: 'Boston, MA',
      workType: 'On-site',
      authorId: user1.id,
      tags: {
        connect: designTags.map((tag) => ({ id: tag.id })),
      },
    },
  });

  // Backend Engineer position
  const backendTags = await prisma.tag.findMany({
    where: { name: { in: ['Backend', 'Go', 'Distributed Systems'] } },
  });
  
  await prisma.referral.create({
    data: {
      title: 'Backend Engineer needed for scaling our infrastructure',
      description: 'Experience with Go and distributed systems required.',
      location: 'New York, NY',
      workType: 'Hybrid',
      authorId: user2.id,
      tags: {
        connect: backendTags.map((tag) => ({ id: tag.id })),
      },
    },
  });

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 