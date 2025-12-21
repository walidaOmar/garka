import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => (
  <>
    <Header />
    <Box component="main" sx={{ mt: 4, minHeight: '60vh', width: '100%', px: { xs: 1, sm: 2, md: 4 } }}>{children}</Box>
    <Footer />
  </>
);

export default Layout;
