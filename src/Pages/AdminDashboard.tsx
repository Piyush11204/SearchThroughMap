import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Profile, ProfileFormData } from '../Pages/Types';

// Validation schema
const profileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  description: yup.string().required('Description is required'),
  profileImageUrl: yup.string().url('Invalid URL').required('Profile Image URL is required'),
  address: yup.object().shape({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().matches(/^\d{5}$/, 'Zip Code must be 5 digits').required('Zip Code is required'),
    country: yup.string().required('Country is required'),
  })
});

interface AdminDashboardProps {
  profiles: Profile[];
  onSaveProfile: (profile: ProfileFormData) => void;
  onDeleteProfile: (profileId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  profiles,
  onSaveProfile,
  onDeleteProfile
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ProfileFormData | null>(null);

  const { control, handleSubmit, reset } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      description: '',
      profileImageUrl: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    }
  });

  const handleEditProfile = (profile?: Profile) => {
    setEditingProfile(profile || {
      name: '',
      email: '',
      description: '',
      profileImageUrl: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    });
    setOpenDialog(true);
  };

  const onSubmit = (data: ProfileFormData) => {
    onSaveProfile(data);
    setOpenDialog(false);
    reset();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    reset();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Profile Management
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleEditProfile()}
        sx={{ mb: 3 }}
      >
        Add New Profile
      </Button>

      {/* Profile List */}
      <Grid container spacing={3}>
        {profiles.map(profile => (
          <Grid item xs={12} md={6} lg={4} key={profile.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => handleEditProfile(profile)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => onDeleteProfile(profile.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Profile Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingProfile?.id ? 'Edit Profile' : 'Add New Profile'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Name"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      label="Description"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="profileImageUrl"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Profile Image URL"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Address</Typography>
              </Grid>
              {(['street', 'city', 'state', 'zipCode', 'country'] as const).map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <Controller
                    name={`address.${field}`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  fullWidth
                >
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
