
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
  border: '1px solid transparent', 
  transition: 'border-color 0.3s ease-in-out', 

  '&:hover': {
    textDecoration: 'underline',
    borderColor: 'white', 
  },
}));
export default function Navbar() {
  return (
    
    <Box sx={{ flexGrow: 1, width: '100%', position: 'fixed', zIndex: '100', top: 0 }}>
      <AppBar position="static" sx={{ bgcolor: 'primary' }}>
        <Toolbar sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>        
           
               <NavLink component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
               <i>Logout</i> 
              </NavLink>
             
            </Box>
            <Box>
              <NavLink component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>            
              </NavLink>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
