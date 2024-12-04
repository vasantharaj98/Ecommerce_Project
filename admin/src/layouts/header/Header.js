import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import { logout } from '../../slices/auth';
import { useDispatch } from "react-redux";


function DrawerAppBar(props) {

  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout());
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" sx={{background: '#fff', color: '#000', py: 0.5, boxShadow:'0px 2px 10px #f1f1f1'}}>
      <Box sx={{display:'flex', justifyContent:'end'}} >
        <Toolbar>
          <Button size='large' variant='outlined' onClick={handleLogout}>Log Out</Button>
        </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}

export default DrawerAppBar;