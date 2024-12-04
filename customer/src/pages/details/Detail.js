import React, { useState, useEffect } from "react";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import "./style.css";
import {Custcard1, Detailcard} from "../../components/card/Custcard";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getnewsbyid } from "../../slices/news";
import ScrollToTop from "../../components/ScrollToTop";
import { Helmet } from 'react-helmet';
import { getlivenewsbyid } from "../../slices/livenews";
import { getproduct, getproductbyid } from "../../slices/ecommerce";

const Detail = ({ setLoader, light, lang, signopen, setsignOpen }) => {

  const [loading, setLoading] = useState(true); 

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [pro, setPro] = useState([]);
  
  const params = useParams();

  const ln = lang;

  const {detailProduct: productData} = useSelector((state) => state.ecommerce);

  const { product } = useSelector((state) => state.ecommerce);

  const dispatch= useDispatch();

  useEffect(()=>{
      setPro(productData);
  }, [dispatch])

  useEffect(()=>{
      setLoader(true);
      dispatch(getproduct())
      dispatch(getproductbyid({p_id: params.title}))
      .then(() => {
        setLoader(false);
        setLoading(false);
      })
      .catch(()=>{
        setLoader(false);
      })
  }, [params])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (window.location.pathname.split('/')[1] !== "product_detail" && (productData?.id !== Number(params.title))) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
    <Helmet>
{ /* Standard metadata tags */ }
<title>{productData?.name}</title>
<meta name='description' content={productData?.description} />
{ /* End standard metadata tags */ }
{ /* Facebook tags */ }
<meta property="og:title" content={productData?.name} />
<meta property="og:description" content={productData?.description} />
<meta property="og:image" content={productData?.image} />
<meta property="og:url" content={window.location} />
<meta property="og:type" content={productData?.categoryDetails?.name} />
{ /* End Facebook tags */ }
{ /* Twitter tags */ }
<meta name="twitter:creator" content={productData?.name} />
<meta name="twitter:card" content={productData?.categoryDetails?.name} />
<meta name="twitter:title" content={productData?.name} />
<meta name="twitter:description" content={productData?.description} />
{ /* End Twitter tags */ }
</Helmet>
    <Box sx={{ bgcolor: "primary.main" }}>
      <ScrollToTop/>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{py: 4, justifyContent:'center'}}>
          <Detailcard
          id={productData?.id}
          signopen={signopen}
          setsignOpen={setsignOpen}
          isLoggedIn={isLoggedIn}
          img={lang === "EN" ? productData?.image : productData?.image}
          topic={productData?.categoryDetails?.name}
          head={lang === "EN" ? productData?.name : productData?.name}
          content={lang === "EN" ? productData?.description : productData?.description}
          price={productData?.price}
          discountType={productData?.discountType}
          discount={productData?.discount}
          unit={productData?.unit}
          capacity={productData?.capacity}
          detailContent={lang === "EN" ? productData?.description : productData?.description}
          tags={productData?.tags}
          light={light}
          />
        </Grid>
        <Grid container spacing={3} sx={{py: 4}}>
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
          >Related
          </Typography>
            </Box>
          <Divider sx={{bgcolor:'primary.light', my: 2}} /> 
            </Grid>
            {product.slice(4, 8).map((va, index) => (
    <Grid item xs={12} md={3} key={index}>
    <Custcard1  product={va}/>
    </Grid>
  ))}
        </Grid>
        <Grid container spacing={3} sx={{py: 4}}>
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
          >Latest
          </Typography>
            </Box>
          <Divider sx={{bgcolor:'primary.light', my: 2}} /> 
            </Grid>
            {product.slice(0, 4).map((va, index) => (
    <Grid item xs={12} md={3} key={index}>
    <Custcard1 product={va}/>
    </Grid>
  ))}
        </Grid>
      </Container>
    </Box>
    </>
  );
};

export default Detail;
