import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";


import "./header.css";
const Header = ({ user, setUser,isMobile }) => {


 
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

  const alertmsg =()=>{
    alert("this functionality coming soon")
  }
  return (
    <>
      {!isMobile && (
        <div className="header">
          <div className="left">
            <h2 className="name">{user.name}</h2>
          </div>
          <div className="middle">
            <div className="middleLeft">
              <button className="headerBtn" onClick={() => navigation("/")}>
                Home
              </button>
              <button className="headerBtn" onClick={alertmsg}>Contact</button>
              <button className="headerBtn"  onClick={alertmsg}>About</button>
              <button className="headerBtn" onClick={alertmsg}>Sign Up</button>
            </div>
          </div>
          <div className="right">
            <AiOutlineHeart size={20} />
            <AiOutlineShoppingCart
              size={20}
              onClick={handleCart}
              className="cartIcon"
            />
            <MdLogout size={20} onClick={() => logOut()} className="logout" />
          </div>
        </div>
      ) 
      }
      
    </>
  );
};

export default Header;
