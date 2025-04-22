'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  Paper,
} from '@mui/material';
import Layout from '../../components/Layout';

// Mock tags data
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

const workTypes = ['Remote', 'On-site', 'Hybrid'];

export default function CreateReferralPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    workType: '',
    tags: [] as string[],
    contactEmail: '',
    linkedinUrl: '',
    cvUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkTypeChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({ ...prev, workType: e.target.value }));
  };

  const handleTagsChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tags: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would send the data to your backend
    
    // For demo, just redirect back to home
    router.push('/');
  };

  return (
    <Layout>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: '1px solid #eaeaea', borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create a Referral
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Share an opportunity and help someone advance their career
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Position Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Frontend Developer"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the referral opportunity in detail..."
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State, Country"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="work-type-label">Work Type</InputLabel>
            <Select
              labelId="work-type-label"
              id="workType"
              name="workType"
              value={formData.workType}
              onChange={handleWorkTypeChange}
              label="Work Type"
            >
              {workTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              id="tags"
              multiple
              value={formData.tags}
              onChange={handleTagsChange}
              input={<OutlinedInput id="select-multiple-tags" label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((tagId) => {
                    const tag = mockTags.find((t) => t.id === tagId);
                    return (
                      <Chip 
                        key={tagId} 
                        label={tag?.name} 
                        size="small"
                        sx={{ borderRadius: '4px' }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {mockTags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Contact Information
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="contactEmail"
            label="Email Address"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="The email where candidates can reach you"
          />

          <TextField
            margin="normal"
            fullWidth
            id="linkedinUrl"
            label="LinkedIn Profile URL (Optional)"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
          />

          <TextField
            margin="normal"
            fullWidth
            id="cvUrl"
            label="CV/Resume URL (Optional)"
            name="cvUrl"
            value={formData.cvUrl}
            onChange={handleChange}
            placeholder="https://..."
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 2, fontWeight: 'bold', borderRadius: '50px', py: 1.5 }}
          >
            Save Referral
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
} 