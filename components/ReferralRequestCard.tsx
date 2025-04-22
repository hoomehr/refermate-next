import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Button,
  CardActions,
  Divider,
  Avatar
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Tag {
  id: string;
  name: string;
}

interface ReferralRequestCardProps {
  id: string;
  status: string;
  message: string;
  createdAt: Date;
  resume?: string;
  referral: {
    id: string;
    title: string;
    description: string;
    location: string;
    workType: string;
    tags: Tag[];
    author: {
      name: string;
      image?: string;
    };
  };
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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'error';
    case 'pending':
    default:
      return 'warning';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return <CheckCircleIcon color="success" />;
    case 'rejected':
      return <CancelIcon color="error" />;
    case 'pending':
    default:
      return <PendingIcon color="warning" />;
  }
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

export default function ReferralRequestCard({
  id,
  status,
  message,
  createdAt,
  resume,
  referral
}: ReferralRequestCardProps) {
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
        borderLeft: `6px solid ${status === 'pending' ? '#FFB74D' : status === 'approved' ? '#66BB6A' : '#EF5350'}`,
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            component="div"
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              lineHeight: 1.3,
            }}
          >
            {referral.title}
          </Typography>
          <Chip 
            label={status.charAt(0).toUpperCase() + status.slice(1)} 
            color={getStatusColor(status) as any}
            icon={getStatusIcon(status)}
            size="small"
            sx={{ fontWeight: 'bold', ml: 1 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">
            {referral.location} • {referral.workType}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, color: 'text.secondary' }}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2">Referrer: {referral.author.name}</Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          Your message:
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {message}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1 }}>
          {referral.tags.map((tag) => {
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
            Requested {formatDate(createdAt)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<LinkedInIcon />}
            sx={{ 
              color: 'black',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.05)',
              }
            }}
          >
            Add LinkedIn
          </Button>
          
          {status === 'pending' && (
            <Button
              size="small"
              color="error"
              sx={{ 
                fontWeight: 500,
                '&:hover': {
                  bgcolor: 'rgba(211, 47, 47, 0.1)',
                },
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
} 