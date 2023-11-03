import { Drawer } from '@mui/material';
import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import "./topHeader.css";
import { useNavigate } from "react-router";

const TopHeader = ({isMobile}) =>{
    const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();


    const toggleDrawer = () => {
      setIsOpen((prev) => !prev);
    };
    const logOut = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("login");
      localStorage.removeItem("product");
      navigation("/register");
    };
    const alertmsg =()=>{
      alert("this functionality coming soon")
    }
    return(
        <div className='topHeader'>
            <div className='center'>
                <p>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                </p>
               
            </div>
            <div className='topHeaderRight'>
               {isMobile && (
          <RxHamburgerMenu onClick={toggleDrawer} size={20} className="drawerLogo" color='white'cursor="pointer" />
        )}
        <Drawer
          elevation={1}
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer}
        >
          <div className='drawer'>
            <p className='drawerBtn' onClick={() => navigation("/")}>Home</p>
            <p className='drawerBtn' onClick={alertmsg}>contact</p>
            <p className='drawerBtn' onClick={alertmsg}>about</p>
            <p className='drawerBtn' onClick={() => logOut()}>Logout</p>
          </div>
        </Drawer>
            </div>
        </div>
    )
}
export default TopHeader;