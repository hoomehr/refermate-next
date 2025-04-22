'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Grid, Paper, Container } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../components/Layout';
import ReferralCard from '../components/ReferralCard';
import ReferralFilters from '../components/ReferralFilters';
import ReferralDetails from '../components/ReferralDetails';

// Mock data (replace with API call in real app)
const mockLocations = [
  { id: '1', name: 'San Francisco, CA' },
  { id: '2', name: 'Boston, MA' },
  { id: '3', name: 'New York, NY' },
];

const mockTags = [
  { id: '1', name: 'Frontend' },
  { id: '2', name: 'React' },
  { id: '3', name: 'TypeScript' },
  { id: '4', name: 'Fintech' },
  { id: '5', name: 'UI/UX' },
  { id: '6', name: 'Healthcare' },
  { id: '7', name: 'Figma' },
  { id: '8', name: 'Backend' },
  { id: '9', name: 'Go' },
  { id: '10', name: 'Distributed Systems' },
  { id: '11', name: 'Infrastructure' },
];

// Mock referrals data
const mockReferrals = [
  {
    id: '1',
    title: 'Senior Frontend Developer at a growing fintech startup',
    description: 'Looking for someone with 4+ years of React experience.',
    location: 'San Francisco, CA',
    workType: 'Remote',
    postedAt: new Date(),
    tags: [
      { id: '1', name: 'Frontend' },
      { id: '2', name: 'React' },
      { id: '3', name: 'TypeScript' },
      { id: '4', name: 'Fintech' }
    ],
    author: {
      id: '101',
      name: 'Alex Johnson',
      email: 'alex@example.com',
    },
  },
  {
    id: '2',
    title: 'Product Designer role at healthcare tech company',
    description: 'Must have experience with design systems and user research.',
    location: 'Boston, MA',
    workType: 'On-site',
    postedAt: new Date(),
    tags: [
      { id: '5', name: 'UI/UX' },
      { id: '6', name: 'Healthcare' },
      { id: '7', name: 'Figma' }
    ],
    author: {
      id: '101',
      name: 'Alex Johnson',
      email: 'alex@example.com',
    },
  },
  {
    id: '3',
    title: 'Backend Engineer needed for scaling our infrastructure',
    description: 'Experience with Go and distributed systems required.',
    location: 'New York, NY',
    workType: 'Hybrid',
    postedAt: new Date(),
    tags: [
      { id: '8', name: 'Backend' },
      { id: '9', name: 'Go' },
      { id: '10', name: 'Distributed Systems' },
      { id: '11', name: 'Infrastructure' }
    ],
    author: {
      id: '102',
      name: 'Sarah Lee',
      email: 'sarah@example.com',
    },
  },
];

// Generate additional mock referrals to have at least 12
const extendedMockReferrals = [...mockReferrals];

// Generate 9 more referrals to have a total of 12
for (let i = 4; i <= 12; i++) {
  const originalReferral = mockReferrals[Math.floor(Math.random() * mockReferrals.length)];
  
  extendedMockReferrals.push({
    ...originalReferral,
    id: String(i),
    title: `${originalReferral.title} - ${i}`,
  });
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState(extendedMockReferrals);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedWorkType, setSelectedWorkType] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<typeof mockReferrals[0] | null>(null);

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleLocationChange = (locationId: string | null) => {
    setSelectedLocation(locationId);
  };

  const handleWorkTypeChange = (workType: string | null) => {
    setSelectedWorkType(workType);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleOpenDetails = (id: string) => {
    const referral = referrals.find((r) => r.id === id);
    if (referral) {
      setSelectedReferral(referral);
      setDetailsOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  // Filter referrals based on selected filters
  const filteredReferrals = referrals.filter((referral) => {
    // Filter by location
    if (selectedLocation && !referral.location.includes(mockLocations.find(loc => loc.id === selectedLocation)?.name || '')) {
      return false;
    }

    // Filter by work type
    if (selectedWorkType && referral.workType !== selectedWorkType) {
      return false;
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      const referralTagIds = referral.tags.map((tag) => tag.id);
      const hasAllSelectedTags = selectedTags.every((tagId) => referralTagIds.includes(tagId));
      if (!hasAllSelectedTags) {
        return false;
      }
    }

    return true;
  });

  return (
    <Layout>
      {/* Header section with title and buttons */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
            Find Your Next Opportunity
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Connect with professionals offering referrals
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<SearchIcon />}
            sx={{ 
              borderRadius: '50px', 
              px: 3,
              fontWeight: 'bold',
              backgroundColor: 'white',
              color: 'black',
              boxShadow: '0 0 10px rgba(0, 100, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'white',
              }
            }}
            onClick={(e) => e.preventDefault()}
          >
            Find Referrals
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            href="/create-referral"
            sx={{ 
              borderRadius: '50px', 
              px: 3,
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              }
            }}
          >
            I Can Refer
          </Button>
        </Box>
      </Box>

      {/* Filter section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          border: '1px solid #eaeaea', 
          borderRadius: 2,
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        <ReferralFilters
          locations={mockLocations}
          tags={mockTags}
          selectedLocation={selectedLocation}
          selectedTags={selectedTags}
          selectedWorkType={selectedWorkType}
          onLocationChange={handleLocationChange}
          onTagToggle={handleTagToggle}
          onWorkTypeChange={handleWorkTypeChange}
        />
      </Paper>

      {/* Referrals grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredReferrals.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 8, p: 4, bgcolor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            No referrals match your filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filter criteria or create a new referral
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {filteredReferrals.map((referral) => (
            <Box key={referral.id}>
              <ReferralCard
                id={referral.id}
                title={referral.title}
                description={referral.description}
                location={referral.location}
                workType={referral.workType}
                postedAt={referral.postedAt}
                tags={referral.tags}
                onOpenDetails={handleOpenDetails}
              />
            </Box>
          ))}
        </Box>
      )}

      <ReferralDetails
        open={detailsOpen}
        onClose={handleCloseDetails}
        referral={selectedReferral}
      />
    </Layout>
  );
} 