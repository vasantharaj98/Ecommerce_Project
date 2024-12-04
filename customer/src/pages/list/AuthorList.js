import React, { useState, useEffect } from "react";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import "./style.css";
import {Custcard, Detailcard} from "../../components/card/Custcard";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getnewsbyauthor, getnewsbytag, updatenewsbyauthor } from "../../slices/news";
import ScrollToTop from "../../components/ScrollToTop";

const AuthorList = ({ setLoader, lang }) => {

  const ln = lang;

  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const {authorNews: newsData} = useSelector((state) => state.news);

  const dispatch= useDispatch();

  console.log(newsData);

  useEffect(()=>{
      setLoader(true);
      page === 1 ? dispatch(getnewsbyauthor({lang: ln, paramData: params.name, page: page}))
      .then(() => {
        setLoader(false);
        setLoading(false);
      })
      .catch(()=>{
        setLoader(false);
      })
      :
      dispatch(updatenewsbyauthor({lang: ln, paramData: params.name, page: page}))
      .then(() => {
        setLoader(false);
        setLoading(false);
      })
      .catch(()=>{
        setLoader(false);
      })
  }, [page])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (newsData[0]?.author_name !== params.name) {
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
          >{params.name}
          </Typography>
            </Box>
            </Grid>
            {newsData?.map((va, index) => (
    <Grid item xs={12} md={3} key={index}>
    <Custcard
          url={va.url}
          img={va.summary_img}
          topic={va.categories}
          head={va.title}
          content={va.short_summary}
          author={va.author_name}
          publishdate={va.createdAt}
          detailContent={va?.content}
          subscri="Paid"
        />
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

export default AuthorList;
