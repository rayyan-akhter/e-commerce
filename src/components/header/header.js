import React, { useEffect } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import "./header.css";
const Header = ({user,setUser}) => {
  const navigation = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    localStorage.removeItem("product")
    navigation("/register")
  }
  const handleCart =()=>{
  if(!user?.name){
  alert("login first")
  navigation("/register");}
else{
  navigation("/cart")  
}
  }
  return (
    <div className="header">
      <div className="left">
        <h2 className="name">{user.name}</h2>
      </div>
      <div className="middle">
        <div className="middleLeft">
          <button className="headerBtn" onClick={()=>navigation("/")}>Home</button>
          <button className="headerBtn">Contact</button>
          <button className="headerBtn">About</button>
          <button className="headerBtn">Sign Up</button>
        </div>
        <div className="middleRight">
          <input
            className="search"
            placeholder="what are you looking for"
          ></input>
        </div>
      </div>
      <div className="right">
        <AiOutlineHeart size={20} />
        <AiOutlineShoppingCart size={20} onClick={handleCart} className="cartIcon" />
        <MdLogout size={20} onClick={()=>logOut()} className="logout" />
      </div>
    </div>
  );
};

export default Header;