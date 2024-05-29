import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { HashLink as RouterLink } from 'react-router-hash-link'; 

const NavLink = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1rem',
  padding: theme.spacing(1),
  textDecoration: 'none',
  border: '1px solid transparent', // border
  transition: 'border-color 0.3s ease-in-out', // hover effect

  '&:hover': {
    textDecoration: 'underline',
    borderColor: 'white', // Change border color on hover
  },
}));

const Navbar2 = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <NavLink component={RouterLink} to="/coordinator" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </NavLink>
            <NavLink component={RouterLink} to="/course" style={{ textDecoration: 'none', color: 'inherit' }}>
              Add Course
            </NavLink>
            <NavLink component={RouterLink} to="/alter" style={{ textDecoration: 'none', color: 'inherit' }}>
              Update/Delete
            </NavLink>
            <NavLink component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Logout
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
