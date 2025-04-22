import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button,
  CardActions,
  Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Tag {
  id: string;
  name: string;
}

interface ReferralCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  workType: string;
  postedAt: Date;
  tags: Tag[];
  onOpenDetails: (id: string) => void;
}

// Define a set of light pastel colors for tags
const tagColors = [
  { bg: '#E6F4EA', text: '#137333' }, // Green
  { bg: '#E8F0FE', text: '#1A73E8' }, // Blue
  { bg: '#FEF7E0', text: '#B06000' }, // Yellow
  { bg: '#FCE8E6', text: '#C5221F' }, // Red
  { bg: '#F3E8FD', text: '#8430CE' }, // Purple
  { bg: '#E6F4F1', text: '#137366' }, // Teal
];

const getTagColor = (tagId: string) => {
  // Use the tag ID to deterministically select a color
  const colorIndex = parseInt(tagId, 10) % tagColors.length;
  return tagColors[colorIndex];
};

// Format date function
const formatDate = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const ReferralCard = ({ 
  id,
  title, 
  description, 
  location, 
  workType,
  postedAt,
  tags,
  onOpenDetails
}: ReferralCardProps) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #eaeaea',
        boxShadow: 'none',
        transition: 'transform 0.2s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
        },
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="subtitle1" 
          component="div" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            lineHeight: 1.3,
            mb: 2
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">
            {location} • {workType}
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {description}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1 }}>
          {tags.map((tag) => {
            const colorScheme = getTagColor(tag.id);
            return (
              <Chip 
                key={tag.id} 
                label={tag.name} 
                size="small" 
                sx={{ 
                  borderRadius: '16px',
                  bgcolor: colorScheme.bg,
                  color: colorScheme.text,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                }} 
              />
            );
          })}
        </Box>
      </CardContent>
      
      <Divider />
      
      <CardActions sx={{ justifyContent: 'space-between', p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
          <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
          <Typography variant="caption">
            {formatDate(postedAt)}
          </Typography>
        </Box>
        <Button 
          size="small" 
          onClick={() => onOpenDetails(id)}
          sx={{ 
            color: 'black',
            fontWeight: 500,
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.05)',
            }
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReferralCard; 