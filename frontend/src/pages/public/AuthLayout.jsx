import React from 'react';
import { Box, Paper, Container } from '@mui/material';

const AuthLayout = ({ children, title }) => (
  <Container maxWidth="sm" sx={{ mt: 6 }}>
    <Paper sx={{ p: 3 }} elevation={1} component="section">
      {title && <Box sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Box>}
      {children}
    </Paper>
  </Container>
);

export default AuthLayout;
