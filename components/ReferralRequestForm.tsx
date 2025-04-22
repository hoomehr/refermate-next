import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Autocomplete,
  Chip,
  CircularProgress,
} from '@mui/material';

interface Tag {
  id: string;
  name: string;
}

interface ReferralRequestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReferralRequestData) => void;
  availableTags: Tag[];
  isSubmitting?: boolean;
}

export interface ReferralRequestData {
  linkedinUrl: string;
  tags: Tag[];
  email: string;
  cvUrl?: string;
}

const ReferralRequestForm = ({
  open,
  onClose,
  onSubmit,
  availableTags,
  isSubmitting = false,
}: ReferralRequestFormProps) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [email, setEmail] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!linkedinUrl) {
      newErrors.linkedinUrl = 'LinkedIn URL is required';
    } else if (!linkedinUrl.includes('linkedin.com/')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (selectedTags.length === 0) {
      newErrors.tags = 'Please select at least one tag';
    }
    
    if (cvUrl && !cvUrl.startsWith('http')) {
      newErrors.cvUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        linkedinUrl,
        tags: selectedTags,
        email,
        cvUrl: cvUrl || undefined,
      });
    }
  };

  const handleClose = () => {
    setLinkedinUrl('');
    setSelectedTags([]);
    setEmail('');
    setCvUrl('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Request a Referral
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            label="LinkedIn Profile URL"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="https://www.linkedin.com/in/your-profile"
            required
            error={!!errors.linkedinUrl}
            helperText={errors.linkedinUrl}
          />
          
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="your.email@example.com"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <Autocomplete
            multiple
            options={availableTags}
            getOptionLabel={(option) => option.name}
            value={selectedTags}
            onChange={(_, newValue) => setSelectedTags(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  sx={{ borderRadius: '16px' }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skills & Interests"
                placeholder="Select relevant tags"
                margin="normal"
                error={!!errors.tags}
                helperText={errors.tags}
                required
              />
            )}
          />
          
          <TextField
            label="Resume/CV URL (Optional)"
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="https://drive.google.com/your-resume"
            error={!!errors.cvUrl}
            helperText={errors.cvUrl}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ 
              minWidth: '120px',
              bgcolor: 'black',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              }
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReferralRequestForm; 