import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  Chip,
  TextField,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Tag {
  id: string;
  name: string;
}

interface ReferralDetailsProps {
  open: boolean;
  onClose: () => void;
  referral: {
    id: string;
    title: string;
    description: string;
    location: string;
    workType: string;
    postedAt: Date;
    tags: Tag[];
    author: {
      id: string;
      name: string;
      email: string;
    };
  } | null;
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

const ReferralDetails = ({ open, onClose, referral }: ReferralDetailsProps) => {
  const [email, setEmail] = React.useState('');
  const [linkedinUrl, setLinkedinUrl] = React.useState('');
  const [cvUrl, setCvUrl] = React.useState('');

  if (!referral) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to the backend
    alert('Request submitted!');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <Box sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Referral Details
        </Typography>
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {referral.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              {referral.location} • {referral.workType}
            </Typography>
          </Box>
          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            {referral.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 2 }}>
            {referral.tags.map((tag) => {
              const colorScheme = getTagColor(tag.id);
              return (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{
                    borderRadius: '4px',
                    bgcolor: colorScheme.bg,
                    color: colorScheme.text,
                    fontWeight: 500,
                  }}
                />
              );
            })}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Request Referral
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            size="small"
          />
          <TextField
            margin="normal"
            fullWidth
            id="linkedin"
            label="LinkedIn Profile URL (Optional)"
            name="linkedin"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/..."
            size="small"
          />
          <TextField
            margin="normal"
            fullWidth
            id="cv"
            label="CV/Resume URL (Optional)"
            name="cv"
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            placeholder="https://..."
            size="small"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
          >
            Submit Request
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDetails; 