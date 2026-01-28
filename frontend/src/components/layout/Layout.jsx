import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => (
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
    <Box sx={{ width: { xs: 0, lg: 260 }, flexShrink: 0 }}>
      <Navigation />
    </Box>
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, mt: { xs: 8, lg: 0 } }}>
        {children}
      </Box>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
