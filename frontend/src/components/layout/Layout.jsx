import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9fafb' }}>
    <Navigation />
    <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, mt: '72px' }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Layout;
