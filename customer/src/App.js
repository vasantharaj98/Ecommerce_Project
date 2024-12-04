import React, { useState} from 'react'
import {  BrowserRouter as Router } from 'react-router-dom';
import RouteRoute from './Routes';
import Loader from '../src/components/loader/Loader.js'
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


// const font =  '"Roboto", sans-serif;';
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
          fontSize: '14px',
          boxShadow: 'none'
        },
      },
    },
  },
  typography: {
    fontFamily: font,
    fontSize: 12,
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
          fontSize: '14px',
          boxShadow: 'none'
        },
      },
    },
  },
  typography: {
    fontFamily: font,
    fontSize: 12,
  },
});

function App() {
  const [loader, setLoader] = useState (false);
  const [light, setLight] = useState(false);

  const mode = localStorage.getItem('mode') || false;

  return (
    <>
      <ThemeProvider theme={mode === 'true' ? lighttheme : darktheme}>
    <Router>
    {loader && <Loader></Loader>}
    <RouteRoute setLoader={setLoader} light={light} setLight={setLight}/>
    </Router>
    </ThemeProvider>
  </>
  );
}

export default App;
