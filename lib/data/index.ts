import usersData from './users.json';
import referralsData from './referrals.json';
import tagsData from './tags.json';

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  referralsPosted: string[];
  bio: string;
  company: string;
  title: string;
  location: string;
  linkedin: string;
};

export type WorkType = 'remote' | 'onsite' | 'hybrid';

export type Referral = {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: WorkType;
  description: string;
  requirements: string;
  salary: string;
  userId: string;
  tags: string[];
  createdAt: string;
  status: 'active' | 'closed';
  department: string;
  benefits: string[];
  applicationProcess: string;
};

export type Tag = {
  id: string;
  name: string;
  color: string;
};

// Type assertions for imported JSON data
const users = usersData as { users: User[] };
const referrals = referralsData as { referrals: Referral[] };
const tags = tagsData as { tags: Tag[] };

// User-related functions
export const getAllUsers = (): User[] => {
  return users.users;
};

export const getUserById = (id: string): User | undefined => {
  return users.users.find(user => user.id === id);
};

export const getUsersByCompany = (company: string): User[] => {
  return users.users.filter(user => user.company.toLowerCase() === company.toLowerCase());
};

// Referral-related functions
export const getAllReferrals = (): Referral[] => {
  return referrals.referrals;
};

export const getReferralById = (id: string): Referral | undefined => {
  return referrals.referrals.find(referral => referral.id === id);
};

export const getReferralsByUserId = (userId: string): Referral[] => {
  return referrals.referrals.filter(referral => referral.userId === userId);
};

export const getReferralsByCompany = (company: string): Referral[] => {
  return referrals.referrals.filter(
    referral => referral.company.toLowerCase() === company.toLowerCase()
  );
};

export const getReferralsByWorkType = (workType: WorkType): Referral[] => {
  return referrals.referrals.filter(referral => referral.workType === workType);
};

export const getReferralsByTags = (tagIds: string[]): Referral[] => {
  return referrals.referrals.filter(
    referral => referral.tags.some(tag => tagIds.includes(tag))
  );
};

export const getActiveReferrals = (): Referral[] => {
  return referrals.referrals.filter(referral => referral.status === 'active');
};

// Tag-related functions
export const getAllTags = (): Tag[] => {
  return tags.tags;
};

export const getTagById = (id: string): Tag | undefined => {
  return tags.tags.find(tag => tag.id === id);
};

export const getTagsByIds = (ids: string[]): Tag[] => {
  return tags.tags.filter(tag => ids.includes(tag.id));
};

// Helper functions
export const getPopularTags = (limit: number = 5): Tag[] => {
  const tagCounts = new Map<string, number>();
  referrals.referrals.forEach(referral => {
    referral.tags.forEach(tagId => {
      tagCounts.set(tagId, (tagCounts.get(tagId) || 0) + 1);
    });
  });
  
  const sortedTagIds = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tagId]) => tagId);
  
  return getTagsByIds(sortedTagIds);
};

export const getTopCompanies = (limit: number = 5): string[] => {
  const companyCounts = new Map<string, number>();
  referrals.referrals.forEach(referral => {
    companyCounts.set(referral.company, (companyCounts.get(referral.company) || 0) + 1);
  });
  
  return Array.from(companyCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([company]) => company);
}; 