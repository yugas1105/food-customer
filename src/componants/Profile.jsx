import { Box, Button, Typography, Paper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './reduxwork/UserSlice';

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 3, width: 500, borderRadius: 3 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: 'primary.main',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            mb: 3,
          }}
        >
          Profile
        </Typography>

        <Box sx={{ml:3}}>
          <Typography variant="caption" color="text.secondary">
            Name 
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
            {userData.name}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
            {userData.email}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Address
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
            {userData.address?.street}, {userData.address?.city} - {userData.address?.postalCode}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Mobile No
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
            {userData.Phone}
          </Typography>
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            color="error"
            sx={{
              mt: 3,
              fontFamily: 'Poppins, sans-serif',
              px: 4,
              py: 1,
              fontWeight: 600,
              fontSize: '15px',
              textTransform: 'capitalize'
            }}
            onClick={() => {
              dispatch(logoutUser());
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
