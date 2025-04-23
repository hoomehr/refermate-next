'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Paper } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../components/Layout';
import ReferralCard from '../components/ReferralCard';
import ReferralFilters from '../components/ReferralFilters';
import ReferralDetails from '../components/ReferralDetails';
import { transformReferralsForCards, getAllLocations, getTagsForFiltering, CardReferral } from '../lib/data/utils';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<CardReferral[]>([]);
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedWorkType, setSelectedWorkType] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<CardReferral | null>(null);

  // Load data on component mount
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      const transformedReferrals = transformReferralsForCards();
      const locationOptions = getAllLocations();
      const tagOptions = getTagsForFiltering();
      
      setReferrals(transformedReferrals);
      setLocations(locationOptions);
      setTags(tagOptions);
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
    if (selectedLocation && !referral.location.includes(locations.find(loc => loc.id === selectedLocation)?.name || '')) {
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
          locations={locations}
          tags={tags}
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
      ) : filteredReferrals.length > 0 ? (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3
        }}>
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
      ) : (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            my: 8,
            p: 4,
            bgcolor: '#f9f9f9',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>No referrals match your filters</Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Try adjusting your filter criteria or check back later for new referral opportunities.
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 3 }}
            onClick={() => {
              setSelectedLocation(null);
              setSelectedWorkType(null);
              setSelectedTags([]);
            }}
          >
            Clear All Filters
          </Button>
        </Box>
      )}

      {/* Referral details modal */}
      {selectedReferral && (
        <ReferralDetails
          open={detailsOpen}
          onClose={handleCloseDetails}
          referral={selectedReferral}
        />
      )}
    </Layout>
  );
} 