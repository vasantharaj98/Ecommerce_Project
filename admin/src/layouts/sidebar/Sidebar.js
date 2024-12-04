import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {Home} from '@mui/icons-material';
import classNames from 'classnames';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import logo from "../../assets/logo.png";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const Sidebar = () => {

const [selectmenu, setSelectmenu] = useState('')

const side_menus = [
        {
        menuName: 'Dashboard',
        icon: Home,
        route: '/'
        },
        {
          menuName: 'ORDER MANAGEMENT'
        },
        {
          menuName: 'Orders',
          icon: ShoppingCartIcon,
          route: '/orders'
      },
      {
        menuName: 'PRODUCT MANAGEMENT'
      },
        {
            menuName: 'Category',
            icon: CategoryIcon,
            route: '/category'
        },
        {
            menuName: 'Subcategory',
            icon: CategoryIcon,
            route: '/subcategory'
        },
        {
          menuName: 'Product',
          icon: InventoryIcon,
          route: '/product'
      },
      {
        menuName: 'SETTING MANAGEMENT'
      },
        {
            menuName: 'Banners',
            icon: ViewCarouselIcon,
            route: '/banner'
        }
]

const handleMenu = (val) =>{
    setSelectmenu(val);
}

useEffect(()=>{
   const val = window.location.pathname;
   for(let i=0; i<side_menus.length; i++){
    if(val === side_menus[i].route){
        setSelectmenu(side_menus[i].menuName)
    }
   }
}, [])

  return (
    <div className='sidebar'>
        <Box>
            <img src={logo} alt='logo' width={200} style={{padding: 20}}></img>
            <div>
                {
                    side_menus.map((val, index)=>{
                        return (
                          <>
                          {val.icon ?
                          <Link key={index} to={val.route} onClick={()=> handleMenu(val.menuName)}>
                            <Box className={classNames("sidemenu", `${selectmenu === val.menuName && "active"}`)} sx={{ py: 2, px: 3 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <val.icon sx={{ marginRight: 1, color: "#fff" }} />
                                <Typography sx={{ color: "#fff" }}>
                                  {val.menuName}
                                </Typography>
                              </div>
                            </Box>
                          </Link>
                          :
                          <Box sx={{ py: 2, px: 3}}>
                          <Typography variant='p' sx={{color:'#fff' }}>{val.menuName}</Typography>
                          </Box>
                    }
                    </>
                        );
                    })
                }
            </div>
        </Box>
    </div>
  )
}

export default Sidebar