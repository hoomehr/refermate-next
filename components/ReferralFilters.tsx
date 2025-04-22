import React from 'react';
import {
  Box,
  Typography,
  Chip,
} from '@mui/material';

interface Tag {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

interface ReferralFiltersProps {
  locations: Location[];
  tags: Tag[];
  selectedLocation: string | null;
  selectedTags: string[];
  selectedWorkType: string | null;
  onLocationChange: (locationId: string | null) => void;
  onTagToggle: (tagId: string) => void;
  onWorkTypeChange: (workType: string | null) => void;
}

const workTypes = [
  { id: 'Remote', name: 'Remote' },
  { id: 'On-site', name: 'On-site' },
  { id: 'Hybrid', name: 'Hybrid' },
];

const ReferralFilters = ({
  locations,
  tags,
  selectedLocation,
  selectedTags,
  selectedWorkType,
  onLocationChange,
  onTagToggle,
  onWorkTypeChange,
}: ReferralFiltersProps) => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Filter by location:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="All Locations"
            onClick={() => onLocationChange(null)}
            sx={{
              borderRadius: '16px',
              fontWeight: selectedLocation === null ? 'bold' : 'normal',
              bgcolor: selectedLocation === null ? 'black' : '#f0f0f0',
              color: selectedLocation === null ? 'white' : 'inherit',
              border: 'none',
              '&:hover': {
                bgcolor: selectedLocation === null ? 'black' : '#e0e0e0',
              },
            }}
          />
          {locations.map((location) => (
            <Chip
              key={location.id}
              label={location.name}
              onClick={() => onLocationChange(location.id)}
              sx={{
                borderRadius: '16px',
                fontWeight: selectedLocation === location.id ? 'bold' : 'normal',
                bgcolor: selectedLocation === location.id ? 'black' : '#f0f0f0',
                color: selectedLocation === location.id ? 'white' : 'inherit',
                border: 'none',
                '&:hover': {
                  bgcolor: selectedLocation === location.id ? 'black' : '#e0e0e0',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Filter by work type:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="All Types"
            onClick={() => onWorkTypeChange(null)}
            sx={{
              borderRadius: '16px',
              fontWeight: selectedWorkType === null ? 'bold' : 'normal',
              bgcolor: selectedWorkType === null ? 'black' : '#f0f0f0',
              color: selectedWorkType === null ? 'white' : 'inherit',
              border: 'none',
              '&:hover': {
                bgcolor: selectedWorkType === null ? 'black' : '#e0e0e0',
              },
            }}
          />
          {workTypes.map((type) => (
            <Chip
              key={type.id}
              label={type.name}
              onClick={() => onWorkTypeChange(type.id)}
              sx={{
                borderRadius: '16px',
                fontWeight: selectedWorkType === type.id ? 'bold' : 'normal',
                bgcolor: selectedWorkType === type.id ? 'black' : '#f0f0f0',
                color: selectedWorkType === type.id ? 'white' : 'inherit',
                border: 'none',
                '&:hover': {
                  bgcolor: selectedWorkType === type.id ? 'black' : '#e0e0e0',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Filter by tags:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              clickable
              onClick={() => onTagToggle(tag.id)}
              sx={{
                borderRadius: '16px',
                fontWeight: selectedTags.includes(tag.id) ? 'bold' : 'normal',
                bgcolor: selectedTags.includes(tag.id) ? 'black' : '#f0f0f0',
                color: selectedTags.includes(tag.id) ? 'white' : 'inherit',
                border: 'none',
                '&:hover': {
                  bgcolor: selectedTags.includes(tag.id) ? 'black' : '#e0e0e0',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ReferralFilters; 