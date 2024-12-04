import { Box, Button, Container, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputBase, Modal, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import './LandHeader.css'
import { Link, useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/images/logo.png';
import whitelogo from '../../assets/images/white_logo.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TranslateIcon from '@mui/icons-material/Translate';
import Menu from '../../components/submenu/Menu';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu2 from '../../components/submenu/Menu2';
import Category from '../../components/submenu/Category';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import google from '../../assets/images/google.png';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register } from '../../slices/auth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { deletecart, getcart, getcategory, updatecart } from '../../slices/ecommerce';
import product from '../../assets/images/google.png';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const style = {
  position: 'absolute',
  top: '16%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {md: 600, xs: 400},
  bgcolor: 'background.paper',
  borderRadius: 2,
};

const style1 = {
  position: 'absolute',
  top: '0%',
  right: '0%',
  width: 400,
  height:'100%',
  bgcolor: 'primary.main',
  boxShadow: 24,
  p: 4,
};

const LandHeader = ({cartopen, setCartOpen, setLight, light, lang, setLoader, signopen, setsignOpen}) => {

  const { t } = useTranslation();

  const [getotp, setGetOtp] = useState("6757")

  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const menuRef = useRef();

  const { isLoggedIn, user} = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.ecommerce);

  const { category } = useSelector((state) => state.ecommerce);

  const [userCredentials, setUserCredentials] = useState({
   mobile_number: "",
  });

  const [verify, setVerify] = useState(false);

  const [verifyCredentials, setVerifyCredentials] = useState({
    mobile_number: "",
    otp:""
   });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handlesignOpen = () => setsignOpen(true);
  const handlesignClose = () => setsignOpen(false);

  const handlecartOpen = () => {
    if(isLoggedIn){
      setCartOpen(true);
    }
    else{
      setsignOpen(true);
    }
  }
  const handlecartClose = () => setCartOpen(false);

  const [subshow, setSubshow] = useState(false);
  const [newsmenu, setNewsmenu] = useState(false);

  const handleLang = () =>{
    setSubshow(!subshow);
  }

  const handleNews = (val) => {
    setNewsmenu(val);
    if(newsmenu === val){
      setNewsmenu(null);
    }
  }

  const handleMode = () => {
    setLight(!light);
    localStorage.setItem('mode', !light);
  }

  const ln = lang;

  useEffect(()=>{
    localStorage.setItem("ln", ln);
    i18n.changeLanguage(ln);
    dispatch(getcategory())
    dispatch(getcart({c_id: user?.customer_id, page: 1}))
    .then(() => {
      setLoader(false);
    })
    .catch(()=>{
      setLoader(false);
    })
  }, [])

  const menuData = [
    {
    'name':'home',
    'route':ln === "EN" ? '/' : '/tamil',
    'divider': true
  },
  {
    'name':'district',
    'route': "",
    'divider': true
  },
  {
    'name':'Tamil Nadu',
    'route': 'city/Tamil Nadu',
    'divider': true
  },
  {
    'name':'India',
    'route':`city/India`,
    'divider': true
  },
  {
    'name':'World',
    'route':`city/World`,
    'divider': true
  },
  {
    'name':'All Category',
    'route':'',
    'divider': true
  },
  {
    'name':'Tags',
    'route':'tags',
    'divider': true
  },
  {
    'name':'About Us',
    'route':'about',
    'divider': true
  },
  {
    'name':'Contact',
    'route':'contact',
    'divider': false
  }
  ]

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if(mode === 'true'){
      setLight(true);
    }
    else{
      localStorage.setItem('mode', false)
      setLight(false)
    }

    if(!ln){
      localStorage.setItem('ln',"EN")
    }
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSubshow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegisterChange = (event) => {

    const newValue = event.target.value;
    if (newValue.length <= 10) {
        setUserCredentials({
        ...userCredentials,
        mobile_number: newValue,
      })
      setVerifyCredentials({
        ...verifyCredentials,
        mobile_number: newValue,
      })
    }
  }

  const handleLoginChange = (event) => {

    const newValue = event.target.value;
    if (newValue.length <= 6) {
        setVerifyCredentials({
        ...verifyCredentials,
        otp: newValue,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true)
    dispatch(register(userCredentials))
    .then((response) => {
      setGetOtp(response.payload.data.phoneOtp)
      setLoader(false);
      setVerify(true);
    })
    .catch(()=>{
      setLoader(false);
      setVerify(false);
    })
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    setLoader(true)
    dispatch(login(verifyCredentials))
    .then((response) => {
      handlesignClose();
      setLoader(false);
      setVerify(false)
    })
    .catch(()=>{
      setLoader(false);
      setVerify(false)
    })
  };

  const handleLogout = () => {
    setLoader(true)
    dispatch(logout())
    .then(() => {
      setLoader(false);
      setVerify(false)
    })
    .catch(()=>{
      setLoader(false);
      setVerify(false)
    })
  }

  const handleAdd = (va) => {
    dispatch(updatecart({c_id: va?.id, paydata: {qty: va?.qty+1, total_price: va?.total_price+va?.price}}))
  }
  const handleRemove = (va) => {
    if (va.qty > 0) {
      dispatch(updatecart({c_id: va?.id, paydata: {qty: va?.qty-1, total_price: va?.total_price-va?.price}}))
    }
  };

  const handleDeleteCart = (id) =>{
    dispatch(deletecart({c_id: id}))
  }

  const totalPrice = cart.reduce((total, item) => total + item.total_price, 0);

  return (
    <div style={{position:'relative', zIndex: 11}}>
    <Box sx={{bgcolor:'primary.main', borderBottom:'1px solid', borderColor:'primary.light'}}>
    <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1, py: 2 }}>
      <Grid container spacing={2} sx={{alignItems:'center', display:{md:'flex', xs:'none'}}}>
        <Grid item xs={4} sx={{display:'flex', justifyContent:'flex-start', alignItems:'center', gap: 2}}>
        <Box sx={{width:'35px', height:'35px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}}>
            <CallIcon sx={{color:'text.main'}}/>
          </Box>
          <Typography color='text.main' variant='h4' sx={{cursor:'pointer', fontSize: '18px'}}>+91 65655 66565</Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign:'center'}}>
        {ln === "EN" ?
        <Link to='/'>
             { light ? <img src={logo} alt='logo' width={180}></img> : <img src={whitelogo} alt='logo' width={180}></img>}
             </Link>
             :
             <Link to='/tamil'>
             { light ? <img src={logo} alt='logo' width={180}></img> : <img src={whitelogo} alt='logo' width={180}></img>}
             </Link>
        }
        </Grid>
        <Grid item xs={4} sx={{display:'flex', justifyContent:'flex-end', alignItems:'center', gap: 2}}>
            <Box onClick={handleOpen} sx={{width:'40px', height:'40px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}}>
            <SearchIcon sx={{color:'text.main'}}/>
            </Box>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backdropFilter: "blur(2px)"}}
      >
        <Box sx={style}>
        <Paper
      component="form"
      sx={{ p: '8px 10px', display: 'flex', alignItems: 'center', width: {md:600, xs:400} }}
    >
          <IconButton type="button" sx={{ p: '8px' }} aria-label="search">
        <SearchIcon sx={{fontSize: 30}}/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: 18 }}
        placeholder="Search posts, tags, authors"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
        </Box>
      </Modal>
      <Box onClick={handlecartOpen} sx={{width:'40px', height:'40px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', position:'relative', zIndex: 1111}}>
      <Badge badgeContent={cart?.length} color="success">
  <ShoppingCartIcon  sx={{color:'text.main'}} />
</Badge>
            </Box>
            <Modal
        open={cartopen}
        onClose={handlecartClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backdropFilter: "blur(2px)"}}
      >
        <Box sx={style1}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', mb: 2}}>
        <Typography variant='h4' sx={{ color: "text.main" }}>Your Cart</Typography>
        <CloseIcon onClick={handlecartClose} sx={{color: 'text.main', cursor:'pointer'}}/>
        </Box>
          <Divider sx={{bgcolor:'primary.light', my: 2}} /> 
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
              <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="start" 
      gap={2}
      sx={{width:'fit-content', mt: 1}}
    >
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={()=>handleRemove(va)} 
        disabled={va.qty <= 0} 
        sx={{p: 1, minWidth: 0}}
      >
        <RemoveIcon/>
      </Button>
      <Typography  sx={{ color: "text.main" }} variant="h6" component="span">
        {va?.qty}
      </Typography>
      <Button variant="outlined" color="secondary" onClick={()=>handleAdd(va)} sx={{p: 1, minWidth: 0}}
>
        <AddIcon/>
      </Button>
    </Box>
              </Box>
              <Typography variant='h5' sx={{ color: "text.main" }}>₹ {va?.total_price}</Typography>
              <DeleteIcon onClick={()=>handleDeleteCart(va?.id)}  sx={{color:'secondary.main', fontSize: 26}}/>
            </Box>
            )
          })}
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', position: 'fixed', bottom: 0, gap: 8}}>
        <Box>
        <Typography variant='p' sx={{ color: "text.main" }}>Total Amount</Typography>
        <Typography variant='h4' sx={{ color: "text.main" }}>₹ {totalPrice}</Typography>
        </Box>
        <Link to="/checkout">
        <Button color='secondary' size='large' variant='contained'>Continue to Payment</Button>
        </Link>
        </Box>
        </Box>
      </Modal>
            {/* <Box onClick={handleLang} sx={{width:'40px', height:'40px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', position:'relative', zIndex: 1111}}>
            <TranslateIcon sx={{color:'text.main'}}/>
            { subshow && <Box  ref={menuRef} sx={{position:'absolute', bgcolor:'primary.dark', top: '50px', left: '50%', transform:'translateX(-50%)', borderRadius: 2, p: 2}}>
          <Link style={{textDecoration:'none'}}>
                            <Box sx={{ p: 1 }} onClick={()=>{
                              localStorage.setItem("ln", 'EN');
                              i18n.changeLanguage("EN");
                              navigate('/');
                              window.location.href = '/';
                            }}>
                              <div 
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography variant='h6' sx={{ color: "text.main" }}>
                                  English
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          <Link style={{textDecoration:'none'}}>
                            <Box sx={{ p:1 }} onClick={()=>{
                              localStorage.setItem("ln", 'TA');
                              i18n.changeLanguage("TA");
                              navigate('/tamil');
                              window.location.href = '/tamil';
                            }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography variant='h6' sx={{ color: "text.main" }}>
                                தமிழ்
                                </Typography>
                              </div>
                            </Box>
                          </Link>
          </Box>}
            </Box> */}
            <Box sx={{bgcolor:'primary.dark', borderRadius: '30px'}} className="toggle-container" onClick={handleMode}>
        <div className={`dialog-button ${light ? "" : "disabled"}`}>
          {light ? <DarkModeIcon sx={{color:'text.main'}}/>:<LightModeIcon sx={{color:'text.main'}}/>}
        </div>
      </Box>
            {/* <Box sx={{width:'40px', height:'40px', bgcolor:'primary.dark', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}} onClick={()=> setLight(!light)}>
            {light ? <DarkModeIcon sx={{color:'text.main'}}/>:<LightModeIcon sx={{color:'text.main'}}/>}
            </Box> */}
            {/* <Link to='/register'>
            <Button color='text' variant='text'>SIGN IN</Button>
            </Link> */}
            {isLoggedIn ? 
            <Button color='secondary' variant='outlined' onClick={handleLogout}>LOG OUT</Button>
            :
            <Button color='secondary' variant='contained' onClick={handlesignOpen}>SIGN IN</Button>
            }
            <Modal
        open={signopen}
        onClose={handlesignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backdropFilter: "blur(2px)"}}
      >
        <Box sx={style1}>
        <Box sx={{textAlign:'end', mb: 2}}>
        <CloseIcon onClick={handlesignClose} sx={{color: 'text.main', cursor:'pointer'}}/>
        </Box>
        <Box sx={{border: '1px solid', borderColor:'primary.light', borderRadius: 1, position:'relative'}}>
        <AccountCircleOutlinedIcon sx={{position:'absolute', color:'primary.light', fontSize: 60, left: '50%', transform: "translate(-50%, -50%)", bgcolor:'primary.main' }}/>
        {!verify ?
        <Box sx={{mt: 4, p: 3}}>
          <Button fullWidth sx={{bgcolor:'text.main', color:'primary.main', py: 1}} variant='contained'><img src={google} alt='icon' width={30} style={{marginRight:10}}></img>Sign In With Google</Button>
          <Divider sx={{my: 2, color: 'text.main'}}>Or</Divider>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <CallIcon sx={{ color: 'primary.light', mr: 1, my: 0.5, fontSize: 25 }} />
        <TextField
        type="number" 
        value={userCredentials.mobile_number}
                    onChange={handleRegisterChange}
         color='text'
         fullWidth id="input-with-sx" label="Enter Phone Number" variant="standard"
        inputProps={{
          maxLength: 10,
          sx:{
            fontSize: 18,
            color:'text.main'
          }
        }}
         sx={{
        "& .MuiInput-root": {
          color: "text.light",
          // Bottom border
          "&:before": {
            borderColor: "#2e2e2e",
            borderWidth: "2px",
          },
          // Border on focus
          "&:after": {
            borderColor: "secondary.main",
            borderWidth: "3px",
          },
          ":hover:not(.Mui-focused)": {
            "&:before": {
              borderColor: "#e7e7e7",
              borderWidth: "2px",
            },
          },
        },
        // Label
        "& .MuiInputLabel-standard": {
          color: "#2e2e2e",
          fontWeight: "bold",
          "&.Mui-focused": {
            color: "secondary.main",
          },
        },
      }}/>
      </Box>
      <Typography variant='h6' sx={{mt: 2, color:'text.light'}}>By signing in or creating an account, you agree with our Terms & Conditions and Privacy Policy</Typography>
      {/* <FormGroup>
      <FormControlLabel sx={{color:'text.main', fontSize: 24, my: 2}} control={<Checkbox defaultChecked color="secondary" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>} label={<Typography variant='h6'>Yes Subscribe to Newsletter</Typography>} />
      </FormGroup> */}
      <Button onClick={handleSubmit} disabled={userCredentials?.mobile_number?.length === 10 ? false : true} fullWidth color='secondary' variant='contained' sx={{py: 1.5, mt: 3}}>Continue</Button>
        </Box>
        :
        <Box sx={{mt: 4, p: 3}}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField
        type="number" 
        value={verifyCredentials.otp}
                    onChange={handleLoginChange}
         color='text'
         fullWidth id="input-with-sx" label="Enter OTP" 
         variant="standard"
        inputProps={{
          maxLength: 4,
          sx:{
            fontSize: 18,
            color:'text.main'
          }
        }}
         sx={{
        "& .MuiInput-root": {
          color: "text.light",
          // Bottom border
          "&:before": {
            borderColor: "#2e2e2e",
            borderWidth: "2px",
          },
          // Border on focus
          "&:after": {
            borderColor: "secondary.main",
            borderWidth: "3px",
          },
          ":hover:not(.Mui-focused)": {
            "&:before": {
              borderColor: "#e7e7e7",
              borderWidth: "2px",
            },
          },
        },
        // Label
        "& .MuiInputLabel-standard": {
          color: "#2e2e2e",
          fontWeight: "bold",
          "&.Mui-focused": {
            color: "secondary.main",
          },
        },
      }}/>
      </Box>
      <Typography variant='h6' sx={{mt: 2, color:'text.light'}}>{getotp}</Typography>
      <Button onClick={handleVerifySubmit} disabled={verifyCredentials?.otp?.length === 4 ? false : true} fullWidth color='secondary' variant='contained' sx={{py: 1.5, mt: 3}}>Submit</Button>
        </Box>
        }
        </Box>
        </Box>
      </Modal>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{alignItems:'center', display:{md:'none', xs:'flex'}}}>
      <Grid item xs={4} sx={{textAlign:'center'}}>
              <Typography color='text.main' variant='h4' sx={{fontWeight:'medium'}}>NEWSIT</Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign:'center'}}>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Button color='text' sx={{fontSize: '14px', p: 0, minWidth: 0}} onClick={()=> setLight(!light)}>{light ? <DarkModeIcon sx={{mr: 1}}/>:<LightModeIcon sx={{mr: 1}}/>}</Button>
            <Button color='text' sx={{fontSize: '14px', p:0, minWidth: 0}}><SearchIcon/></Button>
            </Box>
        </Grid>
        <Grid item xs={4} sx={{textAlign: 'end'}}>
            <Link to='/register'>
            <Button color='secondary' variant='contained'>Subscribe</Button>
            </Link>
        </Grid>
      </Grid>
    </Box>
    </Container>
    </Box>
    <Box sx={{bgcolor:'primary.main', borderBottom:'1px solid', borderColor:'primary.light'}}>
    <Container maxWidth="lg" sx={{display:{xs:'block', md:'none'}, position:'relative'}}>
            <Box className="menuList" sx={{py: 0.7, display:'flex', justifyContent:'space-between', alignItems:'center', overflow:'scroll'}}>
            {menuData.map((va, index)=>{
              return(
                <>
                <Box key={index} className={va.name === 'district' && 'newsNav'}>
                <Link to={va.route}>
                <Button onClick={() => handleNews(va.name)} color='text' sx={{fontSize: '12px', textTransform:'uppercase', letterSpacing: 1, fontWeight:'bold', flex:'none'}}>{t(va.name)}{va.name === newsmenu ? <KeyboardArrowUpIcon sx={{ml: 0.5, color: 'text.main', textAlign:'end', }} /> : <KeyboardArrowDownIcon sx={{ml: 0.5, color: 'text.main', textAlign:'end', }} />
                  }
                  </Button>
                  </Link>
                {va.name === 'District' && newsmenu &&
                <div ref={menuRef} className='newsMenu'>
                <Menu2/>
                </div>
                }
                </Box>
                {va.divider && <Divider sx={{bgcolor:'secondary.main'}} variant='middle' orientation="vertical" flexItem />}
                </>
              )
            })}
    </Box>
    </Container>
    <Container maxWidth="lg" sx={{display:{xs:'none', md:'block'},}}>
            <Box className="menuList" sx={{py: 0.7, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            {category?.map((va, index)=>{
              return(
                <>
                <Link to={va.subcategories.length === 0 ? `category/${va?.id}` : ''} onMouseEnter={() => handleNews(va.name)} onMouseLeave={() => handleNews(va.name)} className={(va.name === newsmenu) && 'newsNav'} style={{position:'relative', textDecoration: 'none'}}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <img src={va?.image} alt='category' width={50}></img>
                <Button color='text' sx={{fontSize: '14px', letterSpacing: 1, fontWeight:'500'}}>{t(va.name)}{va.name === newsmenu ? <KeyboardArrowUpIcon sx={{ml: 0.5, color: 'text.main', textAlign:'end', }} /> : <KeyboardArrowDownIcon sx={{ml: 0.5, color: 'text.main', textAlign:'end', }} />
                  }
                  </Button>
                  </Box>
                {va.name === newsmenu &&
                <div className='newsMenu'>
                <Menu lang={lang} sideMenu = {va?.subcategories}/>
                </div>
                }
                </Link>
                {va.divider && <Divider sx={{bgcolor:'secondary.main'}} variant='middle' orientation="vertical" flexItem />}
                </>
              )
            })}
    </Box>
    </Container>
    </Box>
    </div>
  )
}

export default LandHeader;