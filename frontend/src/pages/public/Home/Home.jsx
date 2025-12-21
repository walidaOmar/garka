import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  VerifiedUser,
  Search,
  Security,
  TrendingUp,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      {/* Hero Section - Fixed for all devices */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          py: { xs: 6, sm: 8, md: 10, lg: 12 },
          px: { xs: 2, sm: 3 },
          textAlign: 'center',
          minHeight: { xs: '70vh', md: '80vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant={isMobile ? "h4" : isTablet ? "h3" : "h2"} 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: '1.75rem',
                sm: '2.25rem',
                md: '3rem',
                lg: '3.5rem'
              },
              lineHeight: {
                xs: 1.2,
                sm: 1.3,
                md: 1.4
              }
            }}
          >
            Find Your Perfect Plot, Verified & Secure
          </Typography>
          
          <Typography 
            variant={isMobile ? "subtitle1" : "h5"} 
            gutterBottom 
            sx={{ 
              mb: { xs: 3, sm: 4 }, 
              opacity: 0.9,
              fontSize: {
                xs: '1rem',
                sm: '1.25rem',
                md: '1.5rem'
              },
              px: { xs: 1, sm: 0 }
            }}
          >
            Nigeria's Trusted Digital Marketplace for AGIS-Verified Property Deals
          </Typography>
          
          {/* Responsive Search Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              maxWidth: { xs: '100%', sm: 500, md: 600, lg: 700 },
              margin: '0 auto',
              backgroundColor: 'white',
              borderRadius: { xs: 1, sm: 2 },
              overflow: 'hidden',
              boxShadow: { xs: 1, sm: 3 },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Box
              component="input"
              type="text"
              placeholder="Search by location, budget, or property type..."
              sx={{
                flex: 1,
                border: 'none',
                px: { xs: '10px', sm: '12px' },
                py: { xs: '10px', sm: '12px' },
                fontSize: { xs: '14px', sm: '16px' },
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: { xs: 1, sm: 0 },
                px: { xs: 2, sm: 4 },
                py: { xs: 1, sm: 1 },
                backgroundColor: '#FF6F00',
                '&:hover': { backgroundColor: '#E65100' },
                whiteSpace: 'nowrap',
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              <Search sx={{ 
                mr: { xs: 0.5, sm: 1 },
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }} />
              {!isMobile && 'Search'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Trust Indicators - Responsive */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 1, sm: 2, md: 3 }} 
          justifyContent="center"
          alignItems="center"
          sx={{
            flexWrap: { xs: 'wrap', sm: 'nowrap' }
          }}
        >
          {['✅ AGIS-Verified Agents', '🔒 Secure Document Handling', '📈 500+ Successful Verifications'].map((item, index) => (
            <Grid 
              item 
              key={index}
              xs={12}
              sm="auto"
              sx={{
                textAlign: 'center',
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 }
              }}
            >
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { 
                    xs: '0.75rem', 
                    sm: '0.875rem', 
                    md: '1rem' 
                  },
                  whiteSpace: { xs: 'nowrap', sm: 'normal' }
                }}
              >
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section - Responsive Grid */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 4, sm: 6, md: 8, lg: 10 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Typography 
          variant={isMobile ? "h5" : isTablet ? "h4" : "h3"} 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
              lg: '3rem'
            },
            mb: { xs: 3, sm: 4, md: 5 }
          }}
        >
          Why Choose DigiAGIS?
        </Typography>
        
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          sx={{ 
            mt: { xs: 1, sm: 2 },
            px: { xs: 0, sm: 1 }
          }}
        >
          {[
            { 
              icon: <VerifiedUser />, 
              title: 'Verified Agents', 
              desc: 'All agents are AGIS-certified with verified credentials and trust scores' 
            },
            { 
              icon: <Security />, 
              title: 'Document Security', 
              desc: 'Confidential document handling with secure verification status' 
            },
            { 
              icon: <Search />, 
              title: 'Instant Verification', 
              desc: 'Request property verification and get matched with expert agents' 
            },
            { 
              icon: <TrendingUp />, 
              title: 'Smart Matching', 
              desc: 'AI-powered matchmaking between buyers, sellers, and agents' 
            }
          ].map((feature, index) => (
            <Grid 
              item 
              key={index}
              xs={12}
              sm={6}
              md={3}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Card 
                sx={{ 
                  textAlign: 'center', 
                  p: { xs: 1.5, sm: 2, md: 3 },
                  height: '100%',
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 320 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ mb: { xs: 1, sm: 2 } }}>
                  {React.cloneElement(feature.icon, {
                    sx: { 
                      fontSize: { xs: 36, sm: 42, md: 48 },
                      color: '#2E7D32',
                      mb: { xs: 1, sm: 2 }
                    }
                  })}
                </Box>
                
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1rem',
                      sm: '1.1rem',
                      md: '1.25rem'
                    },
                    fontWeight: 600,
                    mb: { xs: 1, sm: 1.5 }
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: '0.8rem',
                      sm: '0.875rem',
                      md: '0.95rem'
                    },
                    lineHeight: 1.5
                  }}
                >
                  {feature.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section - Responsive */}
      <Box 
        sx={{ 
          backgroundColor: '#f5f5f5', 
          py: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3 }
        }}
      >
        <Container 
          maxWidth="md" 
          sx={{ 
            textAlign: 'center',
            px: { xs: 1, sm: 2, md: 3 }
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
            gutterBottom
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
                lg: '3rem'
              },
              mb: { xs: 2, sm: 3 }
            }}
          >
            Ready to Start Your Verified Property Journey?
          </Typography>
          
          <Typography 
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary" 
            gutterBottom 
            sx={{ 
              mb: { xs: 4, sm: 5 },
              fontSize: {
                xs: '0.9rem',
                sm: '1.1rem',
                md: '1.25rem'
              },
              lineHeight: 1.5
            }}
          >
            Join thousands of trusted users and agents in Nigeria's first digital AGIS marketplace
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: { xs: 2, sm: 3 },
              alignItems: 'center',
              '& > button': {
                width: { xs: '100%', sm: 'auto' },
                minWidth: { xs: '100%', sm: 180, md: 200 }
              }
            }}
          >
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              sx={{ 
                mr: { xs: 0, sm: 2 },
                px: { xs: 3, sm: 4, md: 5 }
              }}
              component={RouterLink}
              to="/register"
              state={{ userType: 'buyer' }}
            >
              Join as User
            </Button>
            <Button
              variant="outlined"
              size={isMobile ? "medium" : "large"}
              sx={{ 
                px: { xs: 3, sm: 4, md: 5 }
              }}
              component={RouterLink}
              to="/register"
              state={{ userType: 'agent' }}
            >
              Join as Agent
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;