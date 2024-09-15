import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";


import "./header.css";
const Header = ({ user, setUser,isMobile }) => {
  const[isLoggedIn, setIsLoggedIn] = useState(false)
  const navigation = useNavigate();
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    localStorage.removeItem("product");
    navigation("/register");
  };
  const handleCart = () => {
    if (!user?.name) {
      navigation("/register");
    } else {
      navigation("/cart");
    }
  };
  const navigateToSignup = () =>{
    navigation("/register");
  }

  const alertmsg =()=>{
    alert("this functionality coming soon")
  }

  useEffect(()=>{
    const loginStatus = localStorage.getItem("login")

    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  },[])
  return (
    <>
      {!isMobile && (
        <div className="header">
          <div className="left">
            <h2 className="name">{user.name}</h2>
          </div>
          <div className="middle">
            {/* <div className="middleLeft">
              <button className="headerBtn" onClick={() => navigation("/")}>
                Home
              </button>
              <button className="headerBtn" onClick={alertmsg}>Contact</button>
              <button className="headerBtn"  onClick={alertmsg}>About</button>
            
            </div> */}
            <div className="middle-container">

            <input type="text" placeholder="Not working yet" />
            <div className="header-search-icon-container">
            <IoSearchOutline size={30}  className="header-search-icon"/>
            </div>
            </div>
          </div>
          <div className="right">
            <div>

          {!isLoggedIn ? (
            <button className="headerBtn" onClick={navigateToSignup}>
                  Sign Up
                </button>
              ) : (
                <span className="headerUserName">{user?.name}</span>
              )}
              </div>
              <div className="icon-container">
            <AiOutlineHeart  className="header-icon" size={30} />
              </div>
              <div className="icon-container">

            <AiOutlineShoppingCart
              size={30}
              onClick={handleCart}
              className="header-icon"
              />
              </div>
              <div className="icon-container">

            <MdLogout size={30} onClick={() => logOut()} className="header-icon" />
              </div>
          </div>
        </div>
      ) 
      }
      
    </>
  );
};

export default Header;
