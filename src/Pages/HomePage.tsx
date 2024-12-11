import React, { useState } from 'react';
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline
} from '@mui/material';
import ProfilesList from '../components/ProfilesList.tsx';
import MapComponent from '../components/MapComponent.tsx';
import { Profile } from './Types.tsx';
import {profiles} from '../components/DummyUsers.js';

const MOCK_PROFILES: Profile[] = profiles;

const HomePage: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>();

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Profile Mapper</Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Explore Profiles
      </Typography>

      <MapComponent
        profiles={MOCK_PROFILES}
        selectedProfile={selectedProfile}
      />

      <ProfilesList
        profiles={MOCK_PROFILES}
        onProfileSelect={setSelectedProfile}
      />
    </Container>
    </>
  );
};

export default HomePage;