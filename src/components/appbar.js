import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../authContext"
import { setAuthToken, getUserName, stringAvatar } from '../helpers/utils';

const pages = [
  { name: 'Home', to: '' },
  { name: 'Dog', to: '/dog/list' },
  { name: 'Booking', to: '/booking/list', auth: true },
  { name: 'My List', to: '/mylist', auth: true },
  { name: 'Messager', to: '/messager', auth: true }
];

const guestSettings = [
  { name: 'Sign in', to: 'signin' },
  { name: 'Sign up', to: 'signup' }
];
const userSettings = [];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAuthToken(null)
    setUser(null)

    setAnchorElUser(null);

    navigate("/")
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            The Canine Shelter
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                (!page.auth || (page.auth && user)) &&
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                >
                  <Typography>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              (!page.auth || (page.auth && user)) &&
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.to}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar {...user && stringAvatar(getUserName(user.firstName, user.lastName))} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(user ? userSettings : guestSettings).map((setting) => (
                <MenuItem
                  key={setting.name}
                  component={Link}
                  to={setting.to}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
              {(user &&
                <MenuItem
                  onClick={handleLogout}
                >
                  <Typography textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>)}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};