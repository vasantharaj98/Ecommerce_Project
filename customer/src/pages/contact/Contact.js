import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from "@mui/material";
import "./style.css";
import {Custcard, Detailcard} from "../../components/card/Custcard";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const ln = localStorage.getItem("ln") || 'EN';

const Contact = ({ setLoader }) => {
  return (
    <Box sx={{ bgcolor: "primary.main" }}>
       <ScrollToTop/>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 0 }} sx={{py: 4, justifyContent:'center'}}>
        <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: "100%", boxShadow: "none", bgcolor: "transparent" }}>
        <CardContent sx={{ p: 0, pt: 2 }}>
        <Link style={{ textDecoration: "none" }}>
        </Link>
            <Typography
              color="text.main"
              variant="h5"
              component="div"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "34px",
                fontWeight: "medium",
              }}
            >
              Contact Us
            </Typography>
              <Box sx={{ mt: 2}}>
            <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "23px",
                py: 2,
                lineHeight: 1.7
              }}
            >
              Have a story tip, feedback, or just want to say hello? We'd love to hear from you! Reach out to us at 
               <a href="mailto:reach@Ecommerce.info" target="_blank"> reach@Ecommerce.info </a> or connect with us on our social media platforms.</Typography>
              <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "23px",
                py: 2,
                lineHeight: 1.7
              }}
            >
              Join us on the journey of staying informed and connected. Download the Ecommerce app today and be a part of your community's story!</Typography>
              </Box>
        </CardContent>
      </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
