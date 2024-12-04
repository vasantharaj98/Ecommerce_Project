// NotFound.js
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '300px',
  border:'1px solid #000',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NotFound = () => {
  return (
    <Box sx={{p: 5}}>
        <Typography variant='h3' sx={{textAlign:'center', fontWeight:'bold', color:'#cc0000'}}>The page you were looking for doesn't  exist.</Typography>
        <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', mt: 2}}>404 Page Not Found</Typography>
        <Typography variant='h5' sx={{textAlign:'center', mt: 5, fontWeight:'500'}}>The link you have followed may be broken, or the page may have been removed.</Typography>
        <Box display='flex' justifyContent='center' alignItems='center' marginTop='50px'>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' marginTop='50px'>
        <Button size='large' variant='contained'>Return to Home</Button>
        </Box>
        <Typography variant='h6' sx={{textAlign:'center', my: 3, fontWeight:'500'}}>OR</Typography>
        <Box display='flex' justifyContent='center' alignItems='center'>
        <Button size='large' sx={{color:'#cc0000'}}>REPORT THIS PAGE</Button>
        </Box>
    </Box>
  );
};

export default NotFound;
