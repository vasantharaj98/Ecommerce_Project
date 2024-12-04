import React from 'react';
import Dashboard from './pages/dashboard/Dashboard.js';
import Category from './pages/category/Category.js';
import Subcategory from './pages/subcategory/Subcategory.js';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/login/Login.js';
import ProtectedRoute from './utils/ProtectedRoute.js';
import Product from './pages/product/Product.js';
import Banner from './pages/banner/Banner.js';


const RouteRoute = ({setLoader}) => {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login setLoader={setLoader}/>}></Route> 
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<ProtectedRoute><Dashboard setLoader={setLoader}/></ProtectedRoute>}></Route>
        <Route path='/banner' element={<ProtectedRoute><Banner setLoader={setLoader}/></ProtectedRoute>}></Route>
        <Route path='/category' element={<ProtectedRoute><Category setLoader={setLoader}/></ProtectedRoute>}></Route>
        <Route path='/subcategory' element={<ProtectedRoute><Subcategory setLoader={setLoader}/></ProtectedRoute>}></Route>
        <Route path='/product' element={<ProtectedRoute><Product setLoader={setLoader}/></ProtectedRoute>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default RouteRoute;