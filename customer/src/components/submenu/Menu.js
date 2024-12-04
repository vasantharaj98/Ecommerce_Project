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
import { useSelector } from "react-redux";

const Menu = ({ show, setShow, lang, sideMenu }) => {
  const [selectmenu, setSelectmenu] = useState("");
  const [subnav, setSubnav] = useState('');

  const {cities: cityData} = useSelector((state) => state.liveNews);

  const side_menus = [
    {
      menuName: "Vellore",
      icon: HomeOutlinedIcon,
      route: "/Vellore",
    },
    // {
    //   menuName: "India",
    //   icon: HomeOutlinedIcon,
    //   subNav: [
    //     {
    //       menuName: "Andhra",
    //       route: "/schools",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //     {
    //       menuName: "Kerala",
    //       route: "/colleges",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //     {
    //       menuName: "Delhi",
    //       route: "/business",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //     {
    //       menuName: "Kolkata",
    //       route: "/agents",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //     {
    //       menuName: "Pune",
    //       route: "/photographers",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //   ],
    // },
    // {
    //   menuName: "Tamil Nadu",
    //   icon: HomeOutlinedIcon,
    //   subNav: [
    //     {
    //       menuName: "Vellore",
    //       route: "/printingservices",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //     {
    //       menuName: "Tiruvannamalai",
    //       route: "/idcardautomation",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //   ],
    // },
    // {
    //   menuName: "Sports",
    //   icon: HomeOutlinedIcon,
    //   subNav: [
    //     {
    //       menuName: "Cricket",
    //       route: "/printing",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //     {
    //       menuName: "Footbal",
    //       route: "/idautomation",
    //       icon: <HomeOutlinedIcon />,
    //     },
    //   ],
    // },
    {
      menuName: "Ranipet",
      icon: ShoppingCartOutlinedIcon,
      route: "/Ranipet",
    },
    {
      menuName: "Tirupattur",
      icon: ShoppingCartOutlinedIcon,
      route: "/Tirupattur",
    }
  ];


  const handleMenu = (val) => {
    if(val.subNav && subnav !== val.menuName){
      setSubnav(val.name);
    }
    else{
      setSelectmenu(val.name);
      setSubnav("");
    }
  };

  const handleSubMenu = (val) => {
      setSelectmenu(val);
  };

  useEffect(() => {
    const val = window.location.pathname;
    for (let i = 0; i < cityData.length; i++) {
      if(cityData[i].subNav){
        for (let j = 0; j < side_menus[i].subNav.length; j++) {
          if (val === side_menus[i].subNav[j].route) {
            setSubnav(side_menus[i].menuName);
            setSelectmenu(side_menus[i].subNav[j].menuName);
          }  
        }
      }
      else if (val === cityData[i].id) {
        setSelectmenu(cityData[i].name);
      }
    }
  }, []);

  return (
    <Box className="sidemenubar" sx={{bgcolor:'primary.main', boxShadow:'0px 0px 10px #cacaca', borderRadius: 2}}>
      <Box>
        <div>
          {sideMenu?.map((val, index) => {
            return (
              <>
                <Link
                  key={index}
                  to={`subcategory/${val?.id}`}                  
                  onClick={() => handleMenu(val)}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    className={classNames(
                      "sidemenu",
                      `${selectmenu === val?.name && "active"}`
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
                        alignItems: "center",
                        justifyContent:'center',
                        gap: 10
                       }}
                      >
                      <img src={val?.image} alt="subcategory" width={50}></img>
                      <Typography sx={{ color: 'text.main', fontSize:'16px' }}>
                        {lang === "EN" ? val?.name : val?.name}
                      </Typography>
                      </div>
                      {val?.subNav &&
                        (subnav === val?.menuName ? (
                          <KeyboardArrowUpIcon sx={{ color: 'text.main', textAlign:'end', }} />
                        ) : (
                          <KeyboardArrowDownIcon sx={{ color: 'text.main',  textAlign:'end', }} />
                        ))}{" "}
                    </div>
                  </Box>
                </Link>
                {subnav === val?.menuName &&
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

export default Menu;