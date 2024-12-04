import React, { useCallback, useEffect, useState} from 'react'
import {  BrowserRouter as Router } from 'react-router-dom';
import RouteRoute from './Routes';
import Loader from '../src/components/loader/Loader.js'
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { logout } from './slices/auth.js';
import { useDispatch } from 'react-redux';
import EventBus from './utils/EventBus.js';
import authService from './services/auth.service.js';

const font =  "'Work Sans', sans-serif";

const lighttheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      light: '#d9d9d9',
      dark: '#eff8fa'
    },
    text:{
      main:'#000000',
      light:'#4e5965'
    },
    secondary:{
      main:'#df1c22'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform:'none',
          fontSize: '18px',
          boxShadow: 'none'
        },
      },
    },
  },
  typography: {
    fontFamily: font,
    fontSize: 10,
  },
});

const darktheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#303030',
      dark: '#1c1c1e'
    },
    text:{
      main:'#ffffff',
      light:'#b3b3b3'
    },
    secondary:{
      main:'#f0a45c'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform:'none',
          fontSize: '16px',
          boxShadow: 'none'
        },
      },
    },
  },
  typography: {
    fontFamily: font,
    fontSize: 14,
  },
});

function App() {
  const [loader, setLoader] = useState (false);
  const [light, setLight] = useState(false);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      console.log("vasanth")
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <>
      <ThemeProvider theme={light ? lighttheme : darktheme}>
    <Router>
    {loader && <Loader></Loader>}
    <RouteRoute setLoader={setLoader} light={light} setLight={setLight}/>
    </Router>
    </ThemeProvider>
  </>
  );
}

export default App;
