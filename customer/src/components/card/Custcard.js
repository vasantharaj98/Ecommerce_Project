import React, { Suspense, useEffect, useRef, useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import livegif from '../../assets/gif/live.gif';
import CommentSection from "./Comment";
import LazyImage from "../image/Lazyload";
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './StickyGrid.css'; 
import _, { update } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addcart, updatecart } from '../../slices/ecommerce';

const mode = localStorage.getItem('mode') || false;
const ln = localStorage.getItem("ln") || 'EN';

export function Custcard({product}) {

  const [fav, setFav] = useState(false);

  return (
    <SkeletonTheme baseColor={mode === 'true' ? "#cacaca": "#202020"} highlightColor={mode ? "#cacaca": "#444"}>
    <Card sx={{ width: "100%", boxShadow: "none", bgcolor: "transparent", border:'1px solid', borderColor:'primary.light', p: 1, textAlign:'center' }}>
    <Box sx={{position:'absolute', right: 20, top: 20}}>
      {fav ? <FavoriteIcon onClick={() => setFav(!fav)} sx={{color:'secondary.main', cursor:'pointer', fontSize: 26}}/> : <FavoriteBorderIcon onClick={() => setFav(!fav)}  sx={{color:'primary.light', cursor:'pointer', fontSize: 26}}/>}
    </Box>
    <Link to={`product_detail/${product.id}`}>
       {product.image ? <LazyImage height={220} src={product.image} alt="image" /> : <Skeleton height={220} /> }
    {/* <CardMedia sx={{ height: 220 }} image={img} title={topic} /> */}
    </Link>
      <CardContent sx={{ p: 0, pt: 1 }}>
      {/* {topic.length> 0 && topic?.map(va => 
      <Link to={`/categories/${va}`} style={{ textDecoration: "none" }}>
        <Typography
          color="secondary.main"
          variant="p"
          sx={{
            mr: 2,
            fontWeight: "medium",
            textTransform: "uppercase",
            fontSize: "15px",
            letterSpacing: 2,
            '&:hover' :{
                textDecoration:'underline'
              },
          }}
        >{va}
        </Typography>
        </Link>
      )} */}
        <Link to={`product_detail/${product.id}`} style={{ textDecoration: "none" }}>
          <Typography
            color="text.main"
            variant="h5"
            component="h4"
            sx={{
              fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
              fontSize: "22px",
              fontWeight: ln === "EN" ? "500" : "900",
            }}
          >
            {product.name ? product.name?.slice(0, 55) : <Skeleton count={2} />}
          </Typography>
        </Link>
        <Typography
          color="text.main"
          variant="body1"
          sx={{
            fontWeight: "medium",
            textTransform: "uppercase",
            fontSize: "14px"
          }}
        >{product.capacity} {product.unit}
        </Typography>
        {product.price && (
          <Typography
            variant="body1"
            color="text.main"
            sx={{
              fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
              fontSize: "20px",
              fontWeight: '600'
            }}
          >
            {product.price ? `₹ ${product.discounttype === "Percent" ? product.price - (product.price * product.discount)/100 : (product.price - product.discount)} ` : <Skeleton count={4} />}
          </Typography>
        )}
        <Typography
          color="secondary.main"
          variant="body1"
          sx={{
            fontWeight: "medium",
            textTransform: "uppercase",
            fontSize: "14px",
            textDecoration:'line-through',
          }}
        >₹ {product.price}
        </Typography>
      </CardContent>
    </Card>
    </SkeletonTheme>
  );
}

export function Custcard1({product}) {

  const [fav, setFav] = useState(false);

  return (
    <SkeletonTheme baseColor={mode === 'true' ? "#cacaca": "#202020"} highlightColor={mode ? "#cacaca": "#444"}>
    <Card sx={{ width: "100%", boxShadow: "none", bgcolor: "transparent", border:'1px solid', borderColor:'primary.light', p: 1, textAlign:'center' }}>
    <Box sx={{position:'absolute', right: 20, top: 20}}>
      {fav ? <FavoriteIcon onClick={() => setFav(!fav)} sx={{color:'secondary.main', cursor:'pointer', fontSize: 26}}/> : <FavoriteBorderIcon onClick={() => setFav(!fav)}  sx={{color:'primary.light', cursor:'pointer', fontSize: 26}}/>}
    </Box>
    <Link to={`/product_detail/${product.id}`}>
       {product.image ? <LazyImage height={220} src={product.image} alt="image" /> : <Skeleton height={220} /> }
    {/* <CardMedia sx={{ height: 220 }} image={img} title={topic} /> */}
    </Link>
      <CardContent sx={{ p: 0, pt: 1 }}>
      {/* {topic.length> 0 && topic?.map(va => 
      <Link to={`/categories/${va}`} style={{ textDecoration: "none" }}>
        <Typography
          color="secondary.main"
          variant="p"
          sx={{
            mr: 2,
            fontWeight: "medium",
            textTransform: "uppercase",
            fontSize: "15px",
            letterSpacing: 2,
            '&:hover' :{
                textDecoration:'underline'
              },
          }}
        >{va}
        </Typography>
        </Link>
      )} */}
        <Link to={`/product_detail/${product.id}`} style={{ textDecoration: "none" }}>
          <Typography
            color="text.main"
            variant="h5"
            component="h4"
            sx={{
              fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
              fontSize: "22px",
              fontWeight: ln === "EN" ? "500" : "900",
            }}
          >
            {product.name ? product.name?.slice(0, 55) : <Skeleton count={2} />}
          </Typography>
        </Link>
        <Typography
          color="text.main"
          variant="body1"
          sx={{
            fontWeight: "medium",
            textTransform: "uppercase",
            fontSize: "14px"
          }}
        >{product.capacity} {product.unit}
        </Typography>
        {product.price && (
          <Typography
            variant="body1"
            color="text.main"
            sx={{
              fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
              fontSize: "20px",
              fontWeight: '600'
            }}
          >
            {product.price ? `₹ ${product.discounttype === "Percent" ? product.price - (product.price * product.discount)/100 : (product.price - product.discount)} ` : <Skeleton count={4} />}
          </Typography>
        )}
        <Typography
          color="secondary.main"
          variant="body1"
          sx={{
            fontWeight: "medium",
            textTransform: "uppercase",
            fontSize: "14px",
            textDecoration:'line-through',
          }}
        >₹ {product.price}
        </Typography>
      </CardContent>
    </Card>
    </SkeletonTheme>
  );
}

  export function Detailcard({
    id,
    img,
    topic,
    head,
    content,
    price,
    discounttype,
    discount,
    unit,
    capacity,
    signopen,
    setsignOpen,
    isLoggedIn
  }) {

    const [isFixed, setIsFixed] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const [translateY, setTranslateY] = useState(0);
    const gridRef = useRef(null);
    const sectionRef = useRef(null);
    const animationFrameRef = useRef(null);

    const { user } = useSelector((state) => state.auth);

    const { cart } = useSelector((state) => state.ecommerce);

    console.log(cart);

    const dispatch = useDispatch();

     // Calculate section height on load and resize
  useEffect(() => {
    const updateTranslateY = () => {
      if (gridRef.current) {
        const sectionHeight = gridRef.current.getBoundingClientRect().height;
        setTranslateY(sectionHeight - 600); // Update the translateY value
      }
    };

    // Update on load
    updateTranslateY();

    // Update on window resize
    window.addEventListener('resize', updateTranslateY);
    return () => window.removeEventListener('resize', updateTranslateY);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current || !sectionRef.current) return;

      // Use requestAnimationFrame for smoother updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const gridTop = gridRef.current.getBoundingClientRect().top;
        const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;

        // Update position state
        if (gridTop <= 0 && sectionBottom > 575) {
          setIsFixed(true);
          setIsBottom(false);
        } else if (sectionBottom <= 575) {
          setIsFixed(false);
          setIsBottom(true);
        } else {
          setIsFixed(false);
          setIsBottom(false);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleAddcart = () =>{
    if(isLoggedIn){
      const paydata = {
        customer_id: user?.customer_id,
        product_id: id,
        price: price,
        qty: 1,
        total_price: price
      }
      const cart_item = cart.filter((ab)=> ab.product_id === id);
      if(cart_item.length>0){
        dispatch(updatecart({c_id: cart_item[0].id, paydata: {...paydata, qty: cart_item[0].qty+1, total_price: cart_item[0].total_price+price}}))
      }
      else{
        dispatch(addcart(paydata))
      }
    }
    else{
      setsignOpen(true);
    }
  }

  const handleCheckout = () =>{
    if(isLoggedIn){
      console.log("checkout")
    }
    else{
      setsignOpen(true);
    }
  }

    return (
      <>
      <Grid item xs={12}>
        <Grid container spacing={10} >
      <Grid item xs={12} md={6}>
      <Card 
        className={`sticky-grid ${isFixed ? 'fixed' : ''} ${
          isBottom ? 'relative' : ''
        }`} style={{
          transform: isBottom ? `translateY(${translateY}px)` : 'translateY(0)',
        }} sx={{boxShadow:'none', bgcolor: 'transparent'}}>
        <CardMedia sx={{ height:{md: 500, xs: 280}}} image={img} title={topic} />
      </Card>
        </Grid>
        <Grid item ref={gridRef} xs={12} md={6}>
      <Card sx={{ maxWidth: "100%", boxShadow: "none", bgcolor: "transparent" }}>
        <CardContent sx={{ p: 0, pt: 2 }}>
        <Link style={{ textDecoration: "none" }}>
        <Typography
          color="secondary.main"
          variant="p"
          component="div"
          sx={{
            fontWeight: "medium",
            textTransform: "uppercase",
            fontSize: "15px",
          }}
        >
          <span style={{marginRight: 10}}>{topic}</span>
        </Typography>
        </Link>
            <Typography
              color="text.main"
              variant="h5"
              component="h1"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "34px",
                fontWeight: ln === "EN" ? "600" : "900",
                mt: 1
              }}
            >
              {head}
            </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent:'space-between' }}>
          <div>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, justifyContent:'start'}}>
          <Typography
            color="text.main"
            variant="p"
            component="div"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "40px",
              py: 1,
            }}
          >
            {price ? `₹ ${discounttype === "Percent" ? price - (price * discount)/100 : (price - discount)} ` : <Skeleton count={4} />}
          </Typography>
            <Typography
              color="secondary.main"
              variant="p"
              component="div"
              sx={{ fontWeight: "medium", fontSize: "24px",  textDecoration:'line-through'
              }}
            >
              ₹ {price}
            </Typography>
          </Box>            
          </div>
          <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap: 3, flexWrap:'wrap',  mt: 2}}>
          <a href={`https://wa.me/?text=Check out this Ecommerce feed: ${window.location}`} target='_blank'>
       <Box sx={{width:'50px', height:'50px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <WhatsAppIcon sx={{color:'text.light', fontSize: 26}}/>
       </Box>
       </a>
       <a href={`https://t.me/share/url?url=${window.location}`} target='_blank'>
       <Box sx={{width:'50px', height:'50px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <TelegramIcon sx={{color:'text.light', fontSize: 26}}/>
       </Box>
       </a>
       <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location}`}>
       <Box sx={{width:'50px', height:'50px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FacebookOutlinedIcon sx={{color:'text.light', fontSize: 26}}/>
       </Box>
       </a>
       <a href={`https://twitter.com/intent/tweet?url=${window.location}`}>
       <Box sx={{width:'50px', height:'50px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <TwitterIcon sx={{color:'text.light', fontSize: 26}}/>
       </Box>
       </a>
       </Box>
          </Box>
        </CardContent>
      </Card>
      <Grid item xs={12}>
                <Typography color="text.main" sx={{mr: 2, fontSize: 24}} variant="p">{capacity} {unit}</Typography>
      </Grid>
      <Grid item xs={12}>
      {content && (
            <Typography
              variant="body1"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontSize: "22px",
                py: 0.5,
              }}
            >
              {content}
            </Typography>
          )}
      </Grid>
      <Grid item xs={12} md={12} sx={{my: 3}}>
      <Grid container spacing={2}>
          <Grid  item xs={6}>
          <Button onClick={handleAddcart} variant="outlined" color="secondary" fullWidth sx={{py: 2, fontSize: 20}}>Add to Cart</Button>
          </Grid>
          <Grid  item xs={6}>
          <Button  onClick={handleCheckout} variant="contained" color="secondary" fullWidth sx={{py: 2, fontSize: 20}}>Buy It Now</Button>
          </Grid>
      </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid ref={sectionRef} container spacing={2} sx={{justifyContent:'center'}}>
      <Grid  item xs={12} md={12}>
      <Typography
              variant="h3"
              color="text.main"
              sx={{
                fontFamily: ln === "EN" ? "'Work Sans', sans-serif" : '"Noto Sans Tamil", sans-serif',
                fontWeight:'bold'
              }}
            >
          Comments
            </Typography>     
            <Divider sx={{bgcolor:'primary.light', mt: 3}} />    
            <CommentSection/>
            </Grid>
      </Grid>
      </Grid>
        </Grid>
        </Grid>
      </Grid> 
        </>
    );
  }
