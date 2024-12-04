import React from 'react'
import { Outlet } from 'react-router-dom';
import LandHeader from './layouts/landHeader/LandHeader';
import LandFooter from './layouts/landFooter/landFooter';

const Layout2 = ({setLight, light, lang, setLoader, signopen, setsignOpen, cartopen, setCartOpen}) => {
  return (
    <div>
        <LandHeader cartopen={cartopen} setCartOpen={setCartOpen} signopen={signopen} setsignOpen={setsignOpen} setLoader={setLoader} lang={lang} light={light} setLight={setLight}/>
        <Outlet/>
        <LandFooter lang={lang} light={light} setLight={setLight}/>
    </div>
  )
}

export default Layout2;