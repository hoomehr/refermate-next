import React from 'react';
import { Container, Box } from '@mui/material';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(240,240,255,0.7) 0%, rgba(255,255,255,1) 50%, rgba(240,255,245,0.7) 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navigation />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout; 