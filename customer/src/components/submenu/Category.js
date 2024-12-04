import React, { useEffect, useState } from "react";
import "./Menu.css";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import classNames from "classnames";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import logo from "../../assets/images/white_logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Category = ({ show, setShow }) => {
  const [selectmenu, setSelectmenu] = useState("");
  const [subnav, setSubnav] = useState('');

  const side_menus = [
    {
      menuName: "Breaking",
      icon: HomeOutlinedIcon,
      route: "/Breaking",
    },
    {
      menuName: "Education",
      icon: ShoppingCartOutlinedIcon,
      route: "/Education",
    },
    {
      menuName: "Environment",
      icon: ShoppingCartOutlinedIcon,
      route: "/Environment",
    },
    {
      menuName: "Science",
      icon: ShoppingCartOutlinedIcon,
      route: "/Science",
    },
    {
      menuName: "Economics",
      icon: ShoppingCartOutlinedIcon,
      route: "/Economics",
    },
    {
      menuName: "Lifestyle",
      icon: ShoppingCartOutlinedIcon,
      route: "/Lifestyle",
    },
    {
      menuName: "Entertainment",
      icon: ShoppingCartOutlinedIcon,
      route: "/Entertainment",
    },
    {
      menuName: "Business",
      icon: ShoppingCartOutlinedIcon,
      route: "/Business",
    },
    {
      menuName: "Travel",
      icon: ShoppingCartOutlinedIcon,
      route: "/Travel",
    },
    {
      menuName: "Cinema",
      icon: ShoppingCartOutlinedIcon,
      route: "/Cinema",
    },
    {
      menuName: "Sports",
      icon: ShoppingCartOutlinedIcon,
      route: "/Sports",
    },
    {
      menuName: "Politics",
      icon: ShoppingCartOutlinedIcon,
      route: "/Politics",
    }

  ];


  const handleMenu = (val) => {
    if(val.subNav && subnav !== val.menuName){
      setSubnav(val.menuName);
    }
    else{
      setSelectmenu(val.menuName);
      setSubnav("");
    }
  };

  const handleSubMenu = (val) => {
      setSelectmenu(val);
  };

  useEffect(() => {
    const val = window.location.pathname;
    for (let i = 0; i < side_menus.length; i++) {
      if(side_menus[i].subNav){
        for (let j = 0; j < side_menus[i].subNav.length; j++) {
          if (val === side_menus[i].subNav[j].route) {
            setSubnav(side_menus[i].menuName);
            setSelectmenu(side_menus[i].subNav[j].menuName);
          }  
        }
      }
      else if (val === side_menus[i].route) {
        setSelectmenu(side_menus[i].menuName);
      }
    }
  }, []);

  return (
    <Box className="sidemenubar" sx={{bgcolor:'primary.main', boxShadow:'0px 0px 10px #cacaca', borderRadius: 2}}>
      <Box>
        <div>
          {side_menus.map((val, index) => {
            return (
              <>
                <Link
                  key={index}
                  to={`categories${val.route}`}                  
                  onClick={() => handleMenu(val)}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    className={classNames(
                      "sidemenu",
                      `${selectmenu === val.menuName && "active"}`
                    )}
                    sx={{ py: 1, px: 2 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:'space-between'
                      }}
                    >
                      <div
                       style={{
                        display: "flex",
                        alignItems: "center"
                       }}
                      >
                      <Typography sx={{ color: 'text.main', fontSize:'14px' }}>
                        {val.menuName}
                      </Typography>
                      </div>
                      {val.subNav &&
                        (subnav === val.menuName ? (
                          <KeyboardArrowUpIcon sx={{ color: 'text.main', textAlign:'end', }} />
                        ) : (
                          <KeyboardArrowDownIcon sx={{ color: 'text.main',  textAlign:'end', }} />
                        ))}{" "}
                    </div>
                  </Box>
                </Link>
                {subnav === val.menuName &&
                  val?.subNav?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        to={item.route}
                        onClick={() => handleSubMenu(item.menuName)}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          className={classNames(
                            "sidemenu",
                            `${selectmenu === item.menuName && "active"}`
                          )}
                          sx={{ py: 1, px: 2, marginLeft: 4 }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography sx={{ color: 'text.main', fontSize:'14px' }}>
                              {item.menuName}
                            </Typography>
                          </div>
                        </Box>
                      </Link>
                    );
                  })}
              </>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};

export default Category;