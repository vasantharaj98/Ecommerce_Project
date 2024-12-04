import React, { useState, useEffect } from "react";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import "./style.css";
import {Custcard, Detailcard} from "../../components/card/Custcard";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";

const tagB = ['cm', 'modi', 'india', 'isreal', 'war',]

const Tags = ({ setLoader, lang }) => {

  const ln = lang;

  return (
    <Box sx={{ bgcolor: "primary.main" }}>
      <ScrollToTop/>
      <Container maxWidth="xl">
        <Grid container spacing={5} sx={{py: 4}}>
            <Grid item xs={12}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Typography
           color="text.main"
              variant="h4"
              component="div"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontWeight: "bold",
                m: 0
              }}
          >Tags
          </Typography>
            </Box>
            </Grid>
            {tagB.map((va, index) => (
    <Grid item xs={12} md={4} key={index}>
    <Link to={`${va}`} style={{textDecoration:'none'}}>
    <Box sx={{bgcolor:'primary.dark', p: 3, borderLeft:'4px solid', borderColor:'secondary.main', borderRadius: 1}}>
      <Typography variant="h5" color='text.main' sx={{fontWeight:'bold'}}>#{va}</Typography>
    </Box>
    </Link>
    </Grid>
  ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tags;
