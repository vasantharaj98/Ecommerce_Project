import React, { useState, useEffect } from "react";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import "./style.css";
import {Custcard, Detailcard} from "../../components/card/Custcard";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getnewsbyauthor, getnewsbydistrict, getnewsbytag, updatenewsbyauthor, updatenewsbydistrict } from "../../slices/news";
import ScrollToTop from "../../components/ScrollToTop";
import { getlivenewsbycity, updatelivenewsbycity } from "../../slices/livenews";
import { getproductbysubcategory, updateproductbysubcategory } from "../../slices/ecommerce";

const ln = localStorage.getItem("ln") || 'EN';

const ProductList = ({ setLoader }) => {

  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const {subProduct: productData} = useSelector((state) => state.ecommerce);

  const dispatch= useDispatch();

  console.log(productData);

  useEffect(()=>{

    const paramData = params.name;
    const pageData = page;

      setLoader(true);
      page === 1 ? dispatch(getproductbysubcategory({paramData: paramData, page : pageData}))
      .then(() => {
        setLoader(false);
        setLoading(false);
      })
      .catch(()=>{
        setLoader(false);
      })
      :
      dispatch(updateproductbysubcategory({paramData: paramData, page : pageData}))
      .then(() => {
        setLoader(false);
        setLoading(false);
      })
      .catch(()=>{
        setLoader(false);
      })
  }, [page, params.name])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (productData[0]?.subcategory !== Number(params.name)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <Box sx={{ bgcolor: "primary.main" }}>
      <ScrollToTop/>
      <Container maxWidth="xl">
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
          >{productData[0]?.subcategoryDetails?.name}
          </Typography>
            </Box>
            </Grid>
            {productData?.map((va, index) => (
    <Grid item xs={12} md={3} key={index}>
    <Custcard product={va} />
    </Grid>
  ))}
  <Grid item xs={12}>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', mt: 3}}>
            <Button onClick={()=> setPage(prevPage => prevPage + 1)} sx={{py: 2, px: 3}} color='secondary' variant='contained'>Load More</Button>
            </Box>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductList;
