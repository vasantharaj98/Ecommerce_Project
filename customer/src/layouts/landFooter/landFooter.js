import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../../assets/images/logo.png';
import whitelogo from '../../assets/images/white_logo.png';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';

const LandFooter = ({light}) => {
  return (
    <>
        <Box sx={{bgcolor:'primary.dark', py: 5}}>
    <Container maxWidth='xl'>
        <Grid container spacing={4} sx={{justifyContent:'center'}}>
  <Grid item xs={12} md={12}>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      {light ? <img src={logo} alt='logo' width={200}></img> : <img src={whitelogo} alt='logo' width={200}></img>}
      </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box sx={{display:'flex', justifyContent:'start', alignItems:{xs:'start', md:'center'}, flexDirection:'column'}}>
        <Box>
        <Typography color='text.light'sx={{fontSize: '22px', letterSpacing: 1, fontWeight:'600', mb: 2}}>Quick Links</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Brand</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>About</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Contact Us</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Career</Typography>
        </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:{xs:'start', md:'center'}, flexDirection:'column'}}>
        <Box>
        <Typography color='text.light'sx={{fontSize: '22px', letterSpacing: 1, fontWeight:'600', mb: 2}}>Info</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Contact us</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Term of services</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Return and Refund Policy</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Shipping Policy</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Privacy Policy</Typography>
        </Box>
        </Box>      
        </Grid>
        <Grid item xs={12} md={3}>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:{xs:'start', md:'center'}, flexDirection:'column'}}>
        <Box>
        <Typography color='text.light'sx={{fontSize: '22px', letterSpacing: 1, fontWeight:'600', mb: 2}}>Categories</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Grocery</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Electronics</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Appliances</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Baby Care</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2}}>Furniture</Typography>
        </Box>
        </Box>      
        </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:{xs:'start', md:'center'}, flexDirection:'column'}}>
        <Box>
        <Typography color='text.light'sx={{fontSize: '22px', letterSpacing: 1, fontWeight:'600', mb: 2}}>Our Mission</Typography>
        <Typography color='text.main'sx={{fontSize: '18px', mb: 2, lineHeight: 2}}>We are passionate and enthusiastic about making sure you have the right product for your needs.</Typography>
        </Box>
        </Box>
              </Grid>
      <Grid item xs={12} md={12}>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap: 3, mt: 1, flexWrap:'wrap'}}>
      <a href='https://www.facebook.com/profile.php?id=61555167770627' target='_blank'>
       <Box sx={{width:'50px', height:'50px', bgcolor:'primary.main', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FacebookOutlinedIcon sx={{color:'text.light', fontSize: 22}}/>
       </Box>
       </a>
       <a href='https://twitter.com/Newsit_TNadu' target='_blank'>
       <Box sx={{width:'50px', height:'50px', bgcolor:'primary.main', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <TwitterIcon sx={{color:'text.light', fontSize: 22}}/>
       </Box>
       </a>
       </Box>
       <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap: 3, mt: 3}}>
            <Typography sx={{fontSize:'16px'}} color='text.light'>&copy; 2024 Ecommerce – All Rights Reserved </Typography>
       </Box>
  </Grid>
</Grid>

    </Container>
    </Box>
    </>
  )
}

export default LandFooter;