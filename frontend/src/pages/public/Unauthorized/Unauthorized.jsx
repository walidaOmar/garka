import React from 'react';
import { Alert, Box } from '@mui/material';
import BackButton from '../../../components/navigation/BackButton';

const Unauthorized = () => (
  <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
    <BackButton to="/marketplace" />
    <Alert severity="error">Unauthorized: you do not have permission to access this page.</Alert>
  </Box>
);

export default Unauthorized;
