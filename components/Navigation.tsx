import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Container, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ReferralRequestForm, { ReferralRequestData } from './ReferralRequestForm';

// Sample tags for now - in production, these would come from API/database
const sampleTags = [
  { id: '1', name: 'Software Engineering' },
  { id: '2', name: 'Marketing' },
  { id: '3', name: 'Product Management' },
  { id: '4', name: 'Design' },
  { id: '5', name: 'Data Science' },
  { id: '6', name: 'Finance' },
];

const Navigation = () => {
  const pathname = usePathname();
  const [referralFormOpen, setReferralFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReferralSubmit = async (data: ReferralRequestData) => {
    setIsSubmitting(true);
    
    try {
      // Send the data to our API endpoint
      const response = await fetch('/api/referral-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }
      
      const result = await response.json();
      
      // Close form on successful submission
      setReferralFormOpen(false);
      
      // Show success message (in a real app, you might use a snackbar/toast)
      alert('Your referral request has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting referral request:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0} 
        sx={{ 
          borderBottom: '1px solid #eaeaea',
          backgroundColor: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" component="div" fontWeight="bold">
                Refer Mate
              </Typography>
            </Link>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '40%' }}>
              <Box sx={{ position: 'relative', width: '100%' }}>
                <TextField
                  fullWidth
                  placeholder="Search referrals..."
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <SearchIcon color="action" sx={{ ml: 1, mr: 1 }} />
                    ),
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '50px',
                    }
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link href="/profile" style={{ textDecoration: 'none' }}>
                <Button
                  color="inherit"
                  startIcon={<PersonIcon />}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: pathname === '/profile' ? 'bold' : 'normal',
                    borderBottom: pathname === '/profile' ? '2px solid black' : 'none',
                  }}
                >
                  Profile
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ReferralRequestForm
        open={referralFormOpen}
        onClose={() => setReferralFormOpen(false)}
        onSubmit={handleReferralSubmit}
        availableTags={sampleTags}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default Navigation; 