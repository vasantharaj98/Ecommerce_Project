import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {Navigate, useNavigate } from 'react-router-dom';

import { login } from "../../slices/auth";
import logo from "../../assets/logo.png";
import Toast from '../../components/toast/Toast';

const Login = ({setLoader}) => {

    const navigate = useNavigate();

    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
      });
    
      const [showpassword, setShowpassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        dispatch(login(userCredentials))
        .unwrap()
        .then((response) => {
          navigate("/");
          window.location.reload();
        })
        .catch(()=>{
          setLoader(false);
        })
      };
    
      const handleClickShowPassword = () => {
        setShowpassword(!showpassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      if (isLoggedIn) {
        return <Navigate to="/" />;
      }

  return (
    <Grid container spacing={2} height={'100vh'}>
        <Grid item xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <img src='https://deerdesigner.com/wp-content/uploads/2024/05/Article-34-ecommerce-design-01.png' alt='login' style={{width:'100%'}}></img>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
    >
        <Paper sx={{width: 500, p: 5, boxShadow:'none', border:'1px solid #dcdcdc', borderRadius: 3, background:'#fafafa'}}>
            <img src={logo} alt='logo' width={250}></img>
            <Typography variant='h5' fontWeight={'600'} sx={{my: 3}}>Admin Sign In</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" 
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        username: e.target.value,
                      })
                    }
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showpassword ? "text" : "password"}
                      value={userCredentials.password}
                      onChange={(e) =>
                        setUserCredentials({
                          ...userCredentials,
                          password: e.target.value,
                        })
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showpassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth type='submit' variant='contained' size='large' sx={{py: 2, marginTop: 2}}>Login</Button>
                </Grid>
            </Grid>
            <Toast/>
        </Paper>
    </Box>
        </Grid>
    </Grid>
  )
}

export default Login