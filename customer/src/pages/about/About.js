import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from "@mui/material";
import "./style.css";
import {Custcard, Detailcard} from "../../components/card/Custcard";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";

const About = ({ setLoader, lang }) => {

  const ln = lang;

  return (
    <Box sx={{ bgcolor: "primary.main" }}>
       <ScrollToTop/>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 0 }} sx={{py: 4, justifyContent:'center'}}>
        {ln === "EN" ?
        <Grid item xs={12} md={6}>
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
              About Us
            </Typography>
            <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "23px",
                py: 2,
                lineHeight: 1.5
              }}
            >
Welcome to Ecommerce, your go-to source for hyperlocal news and information. At Ecommerce, we believe in empowering communities by delivering real-time, relevant, and reliable news through our cutting-edge mobile application.            
</Typography>
        </CardContent>
        {/* <Divider sx={{bgcolor:'primary.light', my: 3}} /> 
        <CardMedia sx={{ height:{md: 450, xs: 280}}} image='https://tripoli.aspirethemes.com/content/images/size/w1304/format/webp/2022/04/history-in-hd-cTz5-T7voqQ-unsplash.jpg' /> */}
      </Card>
      <Card sx={{ maxWidth: "100%", boxShadow: "none", bgcolor: "transparent" }}>
        <CardContent sx={{ p: 0, pt: 2 }}>
        <Typography
              color="text.main"
              variant="h5"
              component="div"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "34px",
                fontWeight: "medium",
                lineHeight: 1.5
              }}
            >
              Our Mission
            </Typography>
        <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily:"'Work Sans', sans-serif",
                fontSize: "22px",
                py: 1.5,
              }}
            >
             At Ecommerce, our mission is to connect communities through news and information. We strive to provide a platform that not only keeps you informed about local events, developments, and stories but also fosters a sense of unity and engagement among our users.
            </Typography>
        </CardContent>
        <Typography
              color="text.main"
              variant="h5"
              component="div"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "34px",
                fontWeight: "medium",
                mt: 1
              }}
            >
              What Sets Us Apart:
            </Typography>
        <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "22px",
                py: 1.5,
                lineHeight: 1.5
              }}
            >
             1) Hyperlocal Focus: We understand the importance of hyperlocal news. Ecommerce is designed to bring you stories that matter most to your community, ensuring you stay informed about what's happening in your neighborhood.
            </Typography>
            <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "22px",
                py: 1.5,
                lineHeight: 1.5
              }}
            >
             2) User-Centric Approach: Your experience is our priority. The Ecommerce app is crafted with user-friendly features, allowing you to navigate seamlessly and access the news that matters to you with ease.
            </Typography>
            <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "22px",
                py: 1.5,
                lineHeight: 1.5
              }}
            >
             3) Diverse Content: From breaking news to community events, we cover a wide range of topics. Ecommerce is not just a news platform; it's a hub for local happenings, culture, and stories that make your community unique.
            </Typography>
            <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "22px",
                py: 1.5,
                lineHeight: 1.5
              }}
            >
             4) Community Engagement: We believe in the power of community. Through interactive features, user-generated content, and community events coverage, Ecommerce aims to foster a sense of connection and engagement among our users.
            </Typography>
            <Typography
              color="text.main"
              variant="h5"
              component="div"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "34px",
                fontWeight: "medium",
                lineHeight: 1.5
              }}
            >
              Our Team
            </Typography>
        <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily:"'Work Sans', sans-serif",
                fontSize: "22px",
                py: 1.5,
              }}
            >
             Behind Ecommerce is a dedicated team of journalists, tech enthusiasts, and community advocates. We are passionate about creating a space where communities can stay informed, connected, and engaged.
            </Typography>
      </Card>
          </Grid>
          :
          <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: "100%", boxShadow: "none", bgcolor: "transparent" }}>
        <CardContent sx={{ p: 0, pt: 2 }}>
            <Typography
              color="text.main"
              component="div"
              sx={{
                fontFamily: ln === '"Noto Sans Tamil", sans-serif',
                fontSize: "34px",
                fontWeight: "medium",
              }}
            >
              எங்களைப் பற்றி
            </Typography>
            <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily:'"Noto Sans Tamil", sans-serif',
                fontSize: "25px",
                py: 2,
              }}
            >
              பத்திரிக்கை துரையின் ஒரு புதிய அத்தியாயம்- நியூஸிட் செயலிக்கு  உங்களை வரவேற்கிறோம்! நியூஸிட்- ல்  நாங்கள் செய்திகளை மட்டும்  மறுவரையறை செய்யவில்லை; செய்தி துறையையே   மாபெரும்
புரட்சிக்குளாகியுள்ளோம் .  செய்திகளுக்கு , மனிதர்களின்  வாழ்வுகளை மாற்றியமைக்கவும், சமுதாய மாற்றத்தினை ஊக்குவிக்கவும், வலுவான எதிர்காலத்தை  உருவாக்கவும்  சக்தி உள்ளது என்பதை நாங்கள் உறுதியாக நம்புகிறோம்.  ஹைபேரலோக்கள் செய்திகளை  மக்கள் விரும்பும் வகையில், அதனை விரைவாக பகிரும்  புரட்சியினை ஏற்படுத்தி,  தங்கள் சுற்றம் மற்றும்  சமூதாயத்தில்  தனிநபர்கள் விரைந்து செயல்படும் பங்காளர்களாய் மாற்றம் பெற்றிட அதிகாரமளிக்கிறோம்.
            </Typography>
        </CardContent>
        {/* <Divider sx={{bgcolor:'primary.light', my: 3}} /> 
        <CardMedia sx={{ height:{md: 450, xs: 280}}} image='https://tripoli.aspirethemes.com/content/images/size/w1304/format/webp/2022/04/history-in-hd-cTz5-T7voqQ-unsplash.jpg' /> */}
      </Card>
      <Card sx={{ maxWidth: "100%", boxShadow: "none", bgcolor: "transparent" }}>
        <CardContent sx={{ p: 0, pt: 2 }}>
        <Typography
              color="text.main"
              variant="h5"
              component="div"
              sx={{
                fontFamily:'"Noto Sans Tamil", sans-serif',
                fontSize: "34px",
                fontWeight: "medium",
              }}
            >
              தரிசனம்
            </Typography>
        <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily:'"Noto Sans Tamil", sans-serif',
                fontSize: "25px",
                py: 1.5,
              }}
            >
             தனிமனித உரிமைக்குரல்களை வலுமைமிக்க ஒலியாக்கவும், சமூகம் சார்ந்த செய்திகள் மக்களை விரிவாக சென்றடையும் வகைகளையும் நியூஸிட்  செயல்படுவததே  எங்கள் நோக்கம். எதிர்காலத்தில் ஒவ்வொரு சமூகமும் வலுமிக்கதாகவும், சரியான தகவல்கள் சரியான நேரத்தில் அனைவரையும் சென்று சேரவும்,  அனைவரின் உரிமைக்குரல்கள் சரியான இடத்தினை சென்றடையவும் நாங்கள் உழைப்பதே எண்களின் நோக்கம்.
சராசரியான செய்தித்தளமாக மட்டும் இல்லாமல், ஒரு நம்பகமான, மாற்றத்தினை விரும்பும் ஒரு உண்மைக்கான கலங்கரை விளக்காக, இந்த வளர்ந்து வரும் ஊடக  உலகில் திகழ்வதே எங்கள் நோக்கம்.
            </Typography>
        </CardContent>
      </Card>
          </Grid>
        }
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
