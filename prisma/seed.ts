import { PrismaClient } from '../src/generated/prisma';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

interface Tag {
  id: string;
  name: string;
}

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

  // Create a third user to request referrals
  const user3 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Smith',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  });

  // Create referrals
  // Frontend Developer position
  const frontendTags = await prisma.tag.findMany({
    where: { name: { in: ['Frontend', 'React', 'TypeScript'] } },
  });
  
  const referral1 = await prisma.referral.upsert({
    where: { id: 'frontend-referral-id' },
    update: {
      title: 'Senior Frontend Developer at a growing fintech startup',
      description: 'Looking for someone with 4+ years of React experience.',
      location: 'San Francisco, CA',
      workType: 'Remote',
      authorId: user1.id,
      tags: {
        connect: frontendTags.map((tag: Tag) => ({ id: tag.id })),
      },
    },
    create: {
      id: 'frontend-referral-id',
      title: 'Senior Frontend Developer at a growing fintech startup',
      description: 'Looking for someone with 4+ years of React experience.',
      location: 'San Francisco, CA',
      workType: 'Remote',
      authorId: user1.id,
      tags: {
        connect: frontendTags.map((tag: Tag) => ({ id: tag.id })),
      },
    },
  });

  // Product Designer position
  const designTags = await prisma.tag.findMany({
    where: { name: { in: ['UI/UX', 'Figma'] } },
  });
  
  const referral2 = await prisma.referral.upsert({
    where: { id: 'design-referral-id' },
    update: {
      title: 'Product Designer role at healthcare tech company',
      description: 'Must have experience with design systems and user research.',
      location: 'Boston, MA',
      workType: 'On-site',
      authorId: user1.id,
      tags: {
        connect: designTags.map((tag: Tag) => ({ id: tag.id })),
      },
    },
    create: {
      id: 'design-referral-id',
      title: 'Product Designer role at healthcare tech company',
      description: 'Must have experience with design systems and user research.',
      location: 'Boston, MA',
      workType: 'On-site',
      authorId: user1.id,
      tags: {
        connect: designTags.map((tag: Tag) => ({ id: tag.id })),
      },
    },
  });

  // Backend Engineer position
  const backendTags = await prisma.tag.findMany({
    where: { name: { in: ['Backend', 'Go', 'Distributed Systems'] } },
  });
  
  const referral3 = await prisma.referral.upsert({
    where: { id: 'backend-referral-id' },
    update: {
      title: 'Backend Engineer needed for scaling our infrastructure',
      description: 'Experience with Go and distributed systems required.',
      location: 'New York, NY',
      workType: 'Hybrid',
      authorId: user2.id,
      tags: {
        connect: backendTags.map((tag: Tag) => ({ id: tag.id })),
      },
    },
    create: {
      id: 'backend-referral-id',
      title: 'Backend Engineer needed for scaling our infrastructure',
      description: 'Experience with Go and distributed systems required.',
      location: 'New York, NY',
      workType: 'Hybrid',
      authorId: user2.id,
      tags: {
        connect: backendTags.map((tag: Tag) => ({ id: tag.id })),
      },
    },
  });

  // Create referral requests
  // Request 1: Pending
  await prisma.referralRequest.upsert({
    where: { id: 'request-1' },
    update: {
      status: 'pending',
      message: 'I have 5 years of experience with React and would love to be considered for this role!',
      referralId: referral1.id,
      requestedById: user3.id,
      resume: 'https://example.com/resumes/john_smith_resume.pdf',
    },
    create: {
      id: 'request-1',
      status: 'pending',
      message: 'I have 5 years of experience with React and would love to be considered for this role!',
      referralId: referral1.id,
      requestedById: user3.id,
      resume: 'https://example.com/resumes/john_smith_resume.pdf',
    },
  });

  // Request 2: Approved
  await prisma.referralRequest.upsert({
    where: { id: 'request-2' },
    update: {
      status: 'approved',
      message: 'I recently completed a UX certification and have been working as a product designer for 3 years.',
      referralId: referral2.id,
      requestedById: user3.id,
      resume: 'https://example.com/resumes/john_smith_resume.pdf',
    },
    create: {
      id: 'request-2',
      status: 'approved',
      message: 'I recently completed a UX certification and have been working as a product designer for 3 years.',
      referralId: referral2.id,
      requestedById: user3.id,
      resume: 'https://example.com/resumes/john_smith_resume.pdf',
    },
  });

  // Request 3: Rejected
  await prisma.referralRequest.upsert({
    where: { id: 'request-3' },
    update: {
      status: 'rejected',
      message: 'I have 2 years experience with microservices and am eager to learn more about distributed systems.',
      referralId: referral3.id,
      requestedById: user3.id,
      resume: 'https://example.com/resumes/john_smith_resume.pdf',
    },
    create: {
      id: 'request-3',
      status: 'rejected',
      message: 'I have 2 years experience with microservices and am eager to learn more about distributed systems.',
      referralId: referral3.id,
      requestedById: user3.id,
      resume: 'https://example.com/resumes/john_smith_resume.pdf',
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