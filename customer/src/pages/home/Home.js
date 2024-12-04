import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import "./style.css";
import {Custcard} from "../../components/card/Custcard";
import { useDispatch, useSelector } from "react-redux";
import { getnews, getnewsbycity } from "../../slices/news";
import ScrollToTop from "../../components/ScrollToTop";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getcities, getlivenews } from "../../slices/livenews";
import { getbanner, getproduct } from "../../slices/ecommerce";
import { SwiperMultiCarousal, SwiperCarousel } from "../../components/swiper";


const Home = ({ setLoader, lang }) => {

  const { i18n } = useTranslation();

  const ln = lang;

  const { product } = useSelector((state) => state.ecommerce);

  const { banner } = useSelector((state) => state.ecommerce);

  console.log(product);

  const groupedProducts = product.reduce((acc, product) => {
    const categoryName = product.categoryDetails.name; // Get category name
    if (!acc[categoryName]) {
      acc[categoryName] = []; // Initialize array for this category
    }
    acc[categoryName].push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit,
      capacity: product.capacity,
      discounttype: product.discounttype,
      discount: product.discount
    }); // Add product to the category group
    return acc;
  }, {});

  console.log(groupedProducts);

  const modBanner = banner;

  const [pageq, setPageq] = useState(1);

  const dispatch = useDispatch();

  useEffect(()=>{
      localStorage.setItem("ln", ln);
      i18n.changeLanguage(ln);
  }, [])

  useEffect(()=>{
    setLoader(false)
    dispatch(getproduct())
    dispatch(getbanner())
    .then(() => {
      setLoader(false);
    })
    .catch(()=>{
      setLoader(false);
    })
  },[])


  return (
    <Box sx={{ bgcolor: "primary.main" }}>
          <ScrollToTop/>
      <Container maxWidth="xl">
      <SwiperCarousel banner={modBanner}/>
      {Object.keys(groupedProducts).map((category)=>{
        return(
          <Grid key={category} container spacing={3} sx={{py: 4}}>
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
          >{category}
          </Typography>
          {/* <Link to='/city/Vellore'>
          <Button color='text' sx={{fontSize: '14px', textTransform:'uppercase', letterSpacing: 1}}>See All</Button>
          </Link> */}
            </Box>
          {/* <Divider sx={{bgcolor:'primary.light', mt: 2}} />  */}
            </Grid>
            <Grid item xs={12}>
            <Grid container spacing={{ xs: 2, md: 0 }}>
            <SwiperMultiCarousal groupedProducts={groupedProducts} category={category}/>
      </Grid>
            </Grid>
        </Grid>
        )
      })}
      </Container>
    </Box>
  );
};

export default Home;
