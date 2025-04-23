import {
  getAllReferrals,
  getTagsByIds,
  getUserById,
  getAllTags,
  Referral,
  Tag,
  User
} from './index';

// Transform data for use in ReferralCard component
export interface CardReferral {
  id: string;
  title: string;
  description: string;
  location: string;
  workType: string;
  postedAt: Date;
  tags: { id: string; name: string }[];
  author: {
    id: string;
    name: string;
    email: string;
  };
}

// Transform our JSON data structure to the format expected by components
export function transformReferralsForCards(): CardReferral[] {
  const referrals = getAllReferrals();
  
  // Log for debugging
  console.log(`Transforming ${referrals.length} referrals from JSON data`);
  
  return referrals.map(referral => {
    const user = getUserById(referral.userId);
    const tags = getTagsByIds(referral.tags);
    
    return {
      id: referral.id,
      title: referral.title,
      description: referral.description,
      location: referral.location,
      workType: capitalizeFirstLetter(referral.workType),
      postedAt: new Date(referral.createdAt),
      tags: tags.map(tag => ({
        id: tag.id,
        name: tag.name
      })),
      author: {
        id: user?.id || '',
        name: user?.name || 'Unknown',
        email: user?.email || ''
      }
    };
  });
}

// Get all locations from referrals for filtering
export function getAllLocations() {
  const referrals = getAllReferrals();
  const uniqueLocations = new Set(referrals.map(referral => referral.location));
  
  // Log for debugging
  console.log(`Found ${uniqueLocations.size} unique locations in data`);
  
  return Array.from(uniqueLocations).map((location, index) => ({
    id: (index + 1).toString(),
    name: location
  }));
}

// Get all tags for filtering
export function getTagsForFiltering() {
  const tags = getAllTags();
  
  // Log for debugging
  console.log(`Found ${tags.length} tags in data`);
  
  return tags.map(tag => ({
    id: tag.id,
    name: tag.name
  }));
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 