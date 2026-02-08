import React from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import BackButton from '../../../components/navigation/BackButton';

const VerifyAccount = () => {
  const { user } = useAuth();

  if (user?.isEmailVerified) {
    return (
      <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
        <BackButton />
        <Alert severity="success" sx={{ mb: 2 }}>Your account is already verified.</Alert>
        <Button component={RouterLink} to="/marketplace" variant="contained">Go to Marketplace</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <BackButton />
      <Typography variant="h4" gutterBottom>Verify your account</Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        To request properties and participate in full deal workflows, your account must be verified.
      </Alert>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Please complete email and phone verification through support/admin invitation flow.
      </Typography>
      <Button component={RouterLink} to="/marketplace" variant="outlined">Back to Marketplace</Button>
    </Box>
  );
};

export default VerifyAccount;
