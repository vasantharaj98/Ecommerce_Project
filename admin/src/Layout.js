import React from 'react'
import Header from '../src/layouts/header/Header.js';
import { Outlet } from 'react-router-dom';
import Sidebar from './layouts/sidebar/Sidebar.js';

const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Sidebar/>
    </div>
  )
}

export default Layout;