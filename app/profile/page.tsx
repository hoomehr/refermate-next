'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  Divider, 
  Tabs, 
  Tab, 
  Card, 
  CardContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/Layout';
import ReferralCard from '../../components/ReferralCard';
import ReferralDetails from '../../components/ReferralDetails';

// Mock user data
const mockUser = {
  id: '101',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  image: 'https://randomuser.me/api/portraits/men/1.jpg',
};

// Mock referrals data (same as in home page but filtered to this user)
const mockReferrals = [
  {
    id: '1',
    title: 'Senior Frontend Developer at a growing e-commerce platform',
    description: '4+ years of experience with modern JavaScript frameworks (React, Vue, Angular).',
    location: 'Austin, TX',
    workType: 'Remote',
    postedAt: new Date('2023-06-24'),
    tags: [
      { id: '1', name: 'Frontend' },
      { id: '2', name: 'React' },
      { id: '3', name: 'JavaScript' }
    ],
    author: {
      id: '101',
      name: 'Alex Johnson',
      email: 'alex@example.com',
    },
  },
  {
    id: '2',
    title: 'Project Manager with agile experience needed for a media company',
    description: 'PMP certification is a plus but not required.',
    location: 'New York, NY',
    workType: 'On-site',
    postedAt: new Date('2023-07-04'),
    tags: [
      { id: '5', name: 'Project Management' },
      { id: '6', name: 'Agile' },
      { id: '7', name: 'Media' }
    ],
    author: {
      id: '101',
      name: 'Alex Johnson',
      email: 'alex@example.com',
    },
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<typeof mockReferrals[0] | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDetails = (id: string) => {
    const referral = mockReferrals.find((r) => r.id === id);
    if (referral) {
      setSelectedReferral(referral);
      setDetailsOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={mockUser.image}
            alt={mockUser.name}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {mockUser.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {mockUser.email}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href="/create-referral"
              sx={{ borderRadius: '50px', px: 3 }}
            >
              Create Referral
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="profile tabs">
            <Tab label="Your Referrals" id="profile-tab-0" aria-controls="profile-tabpanel-0" />
            <Tab label="Requested Referrals" id="profile-tab-1" aria-controls="profile-tabpanel-1" />
            <Tab label="Settings" id="profile-tab-2" aria-controls="profile-tabpanel-2" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {mockReferrals.length === 0 ? (
            <Card sx={{ textAlign: 'center', p: 4, bgcolor: '#f9f9f9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  You haven't created any referrals yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Share opportunities and help others advance their careers
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  href="/create-referral"
                  sx={{ borderRadius: '50px', px: 3 }}
                >
                  Create Your First Referral
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Box>
              {mockReferrals.map((referral) => (
                <ReferralCard
                  key={referral.id}
                  id={referral.id}
                  title={referral.title}
                  description={referral.description}
                  location={referral.location}
                  workType={referral.workType}
                  postedAt={referral.postedAt}
                  tags={referral.tags}
                  onOpenDetails={handleOpenDetails}
                />
              ))}
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Card sx={{ textAlign: 'center', p: 4, bgcolor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                You haven't requested any referrals yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Browse opportunities on the home page and request referrals
              </Typography>
              <Button
                variant="contained"
                href="/"
                sx={{ borderRadius: '50px', px: 3 }}
              >
                Browse Opportunities
              </Button>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Account settings will be implemented in future versions.
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>

      <ReferralDetails
        open={detailsOpen}
        onClose={handleCloseDetails}
        referral={selectedReferral}
      />
    </Layout>
  );
} 