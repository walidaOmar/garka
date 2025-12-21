import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  VerifiedUser,
  AccountCircle,
  Dashboard,
  ExitToApp,
  Settings,
  BusinessCenter,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleDashboard = () => {
    if (user.userType === 'agent') {
      navigate('/agent-dashboard');
    } else if (user.userType === 'admin') {
      navigate('/founder-dashboard');
    }
    handleClose();
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }} aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}

        <VerifiedUser sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          DigiAGIS
        </Typography>

        {!isMobile && (
          user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                icon={<BusinessCenter />} 
                label={`${user.name} (${user.userType})`} 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
              />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar}>
                  {user?.name?.charAt(0) ?? ''}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {(user.userType === 'admin' || user.userType === 'agent') && (
                  <MenuItem onClick={handleDashboard}>
                    <Dashboard sx={{ mr: 1 }} />
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                  <AccountCircle sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Settings sx={{ mr: 1 }} />
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </Box>
          )
        )}

        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
            <List>
              <ListItem button onClick={() => navigate('/')}> 
                <ListItemIcon><VerifiedUser /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              {user && (user.userType === 'admin' || user.userType === 'agent') && (
                <ListItem button onClick={handleDashboard}>
                  <ListItemIcon><Dashboard /></ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              )}
            </List>
            <Divider />
            <List>
              {user ? (
                <>
                  <ListItem>
                    <ListItemIcon><Avatar sx={{ width: 32, height: 32 }} src={user?.avatar}>{user?.name?.charAt(0)}</Avatar></ListItemIcon>
                    <ListItemText primary={`${user.name} (${user.userType})`} />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/profile')}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/settings')}>
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem button onClick={() => navigate('/login')}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/register')}>
                    <ListItemIcon><BusinessCenter /></ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;