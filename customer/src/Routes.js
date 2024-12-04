import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout2 from './Layout2.js';
import Home from './pages/home/Home.js';
import Detail from './pages/details/Detail.js';
import About from './pages/about/About.js';
import Tags from './pages/tags/Tags.js';
import List from './pages/list/TagList.js';
import CategoryList from './pages/list/CategoryList.js';
import AuthorList from './pages/list/AuthorList.js';
import DistrictList from './pages/list/DistrictList.js';
import Contact from './pages/contact/Contact.js';
import NotFound from './pages/notfound/Notfound.js';
import ProductList from './pages/list/ProductList.js';
import Checkout from './pages/checkout/Checkout.js';



const RouteRoute = ({setLoader, setLight, light}) => {

  const [show, setShow] = useState(true);

  const [signopen, setsignOpen] = React.useState(false);
  const [cartopen, setCartOpen] = React.useState(false);


  return (
    <>
    <Routes>
        <Route path='/' element={<Layout2 cartopen={cartopen} setCartOpen={setCartOpen} signopen={signopen} setsignOpen={setsignOpen} setLoader={setLoader} lang="EN" light={light} setLight={setLight}/>}>
        <Route path='/' exact element={<Home lang="EN" setLoader={setLoader}/>}></Route> 
        <Route path='/product_detail/:title' exact element={<Detail signopen={signopen} setsignOpen={setsignOpen} lang="EN" setLoader={setLoader} light={light}/>}></Route> 
        <Route path='/about' exact element={<About lang="EN" setLoader={setLoader}/>}></Route> 
        <Route path='/checkout' exact element={<Checkout setCartOpen={setCartOpen} lang="EN" setLoader={setLoader}/>}></Route> 
        <Route path='/contact' exact element={<Contact lang="EN" setLoader={setLoader}/>}></Route> 
        <Route path='/subcategory'>
            <Route index={true} element={<Tags lang="EN" setLoader={setLoader}/>}></Route>
            <Route path=':name'>
                <Route index={true} element={<ProductList lang="EN" setLoader={setLoader}/>}></Route>
                <Route path='product_detail/:title' exact element={<Detail signopen={signopen} setsignOpen={setsignOpen} lang="EN" setLoader={setLoader} light={light}/>}></Route> 
            </Route>
        </Route> 
        <Route path='/tags'>
            <Route index={true} element={<Tags lang="EN" setLoader={setLoader}/>}></Route>
            <Route path=':tag'>
                <Route index={true} element={<List lang="EN" setLoader={setLoader}/>}></Route>
                <Route path='news_detail/:title' exact element={<Detail lang="EN" setLoader={setLoader} light={light}/>}></Route> 
            </Route>
        </Route> 
        <Route path='/categories'>
            <Route index={true} element={<Tags lang="EN" setLoader={setLoader}/>}></Route>
            <Route path=':name'>
                <Route index={true} element={<CategoryList lang="EN" setLoader={setLoader}/>}></Route>
                <Route path='news_detail/:title' exact element={<Detail lang="EN" setLoader={setLoader} light={light}/>}></Route> 
            </Route>
        </Route> 
        <Route path='/author'>
            <Route index={true} element={<Tags lang="EN" setLoader={setLoader}/>}></Route>
            <Route path=':name'>
                <Route index={true} element={<AuthorList lang="EN" setLoader={setLoader}/>}></Route>
                <Route path='news_detail/:title' exact element={<Detail lang="EN" setLoader={setLoader} light={light}/>}></Route> 
            </Route>
        </Route> 
        <Route path='*' Component={NotFound}></Route>
        </Route>
        <Route path='/tamil' element={<Layout2 setLoader={setLoader} lang="TA" light={light} setLight={setLight}/>}>
        <Route path='/tamil'>
        <Route index={true} element={<Home lang="TA" setLoader={setLoader}/>}></Route>
        <Route path='news_detail/:title' exact element={<Detail lang="TA" setLoader={setLoader} light={light}/>}></Route> 
        <Route path='news_detail/*' Component={NotFound}></Route>
        <Route path='about' exact element={<About lang="TA"  setLoader={setLoader}/>}></Route> 
        <Route path='contact' exact element={<Contact lang="TA"  setLoader={setLoader}/>}></Route> 
        <Route path='city'>
        <Route path=':name'>
                <Route index={true} element={<DistrictList lang="TA" setLoader={setLoader}/>}></Route>
                <Route path='news_detail/:title' exact element={<Detail lang="TA" setLoader={setLoader} light={light}/>}></Route> 
            </Route>
        </Route> 
        <Route path='tags'>
            <Route index={true} element={<Tags lang="TA"  setLoader={setLoader}/>}></Route>
            <Route path=':tag'>
                <Route index={true} element={<List lang="TA" setLoader={setLoader}/>}></Route>
                <Route path='news_detail/:title' exact element={<Detail lang="TA" setLoader={setLoader} light={light}/>}></Route> 
            </Route>
        </Route> 
        <Route path='categories'>
            <Route index={true} element={<Tags lang="TA"  setLoader={setLoader}/>}></Route>
            <Route path=':name'>
                <Route index={true} element={<CategoryList lang="TA" setLoader={setLoader}/>}></Route>
                <Route path='news_detail/:title' exact element={<Detail lang="TA" setLoader={setLoader} light={light}/>}></Route> 
            </Route>        </Route> 
        <Route path='author'>
            <Route index={true} element={<Tags lang="TA"  setLoader={setLoader}/>}></Route>
            <Route path=':name'>
                <Route index={true} element={<AuthorList lang="TA" setLoader={setLoader}/>}></Route>
                <Route path='news_detail/:title' exact element={<Detail lang="TA" setLoader={setLoader} light={light}/>}></Route> 
            </Route>        </Route> 
        </Route> 
        <Route path='*' Component={NotFound}></Route>
        </Route>
    </Routes>
    </>
  )
}

export default RouteRoute;