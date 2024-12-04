import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, CardMedia, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import "./style.css";
import ScrollToTop from "../../components/ScrollToTop";
import { useSelector } from "react-redux";

const Checkout = ({ setLoader, lang, setCartOpen }) => {

  const ln = lang;

  const { cart } = useSelector((state) => state.ecommerce);

  const initialState = {
    country: null
  }

  const [formData, setFormdata] = useState(initialState)

  useEffect(()=>{
    setCartOpen(false);
  }, []);

  const handleChange = (event, name) => {
    setFormdata({...formData, [name]: event.target.value});
  };

  return (
    <Box sx={{ bgcolor: "primary.main" }}>
       <ScrollToTop/>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 0 }} sx={{py: 4, justifyContent:'center'}}>
        <Grid item xs={12} md={5}>
        <Card sx={{ maxWidth: "100%", boxShadow: "none", bgcolor: "transparent" }}>
        <CardContent sx={{ p: 0, pt: 2 }}>
            <Typography
              color="text.main"
              variant="h5"
              component="div"
              sx={{
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "34px",
                fontWeight: "medium",
              }}
            >
              Delivery
            </Typography>
            <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formData?.country}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value="India">India</MenuItem>
  </Select>
</FormControl>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
        </CardContent>
      </Card>
          </Grid>
          <Grid item xs={12} md={1}>

          </Grid>
          <Grid item xs={12} md={5}>
        <Card sx={{ maxWidth: "100%", boxShadow: "none", bgcolor: "transparent"}}>
        <CardContent sx={{ p: 0, pt: 2 }}>
            <Typography
              color="text.main"
              variant="h5"
              component="div"
              sx={{
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "34px",
                fontWeight: "medium",
              }}
            >
              Items
            </Typography>
            <Box>
          {cart?.map((va, index)=>{
            return(
              <Box 
            display="flex" 
      alignItems="center" 
      justifyContent="space-between" 
      sx={{mt: 3}}
      >
              <img src={va?.productDetails?.image} width={70}></img>
              <Box>
              <Typography variant='h5' sx={{ color: "text.main" }}>{va?.productDetails?.name}</Typography>
              </Box>
              <Typography variant='h5' sx={{ color: "text.main" }}>₹ {va?.total_price}</Typography>
            </Box>
            )
          })}
        </Box>
            </CardContent>
            </Card>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
