import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router";
import "./topHeader.css";

const TopHeader = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    localStorage.removeItem("product");
    navigation("/register");
    closeDrawer();
  };

  const handleNavigation = (path) => {
    navigation(path);
    closeDrawer();
  };

  const alertmsg = () => {
    alert("This functionality is coming soon!");
    closeDrawer();
  };

  return (
    <div className="top-header">
      <div className="container">
        <div className="top-header-content">
          {/* Promotional Message */}
          <div className="promo-message">
            <span className="promo-badge">Sale</span>
            <p className="promo-text">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </p>
          </div>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button 
              className="mobile-drawer-toggle touch-target" 
              onClick={toggleDrawer}
              aria-label="Open menu"
            >
              <RxHamburgerMenu size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-overlay" onClick={closeDrawer}></div>
        <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>Menu</h3>
            <button 
              className="drawer-close touch-target" 
              onClick={closeDrawer}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          
          <nav className="drawer-nav">
            <button 
              className="drawer-nav-item" 
              onClick={() => handleNavigation("/")}
            >
              Home
            </button>
            <button 
              className="drawer-nav-item" 
              onClick={() => handleNavigation("/cart")}
            >
              Cart
            </button>
            <button 
              className="drawer-nav-item" 
              onClick={alertmsg}
            >
              Contact
            </button>
            <button 
              className="drawer-nav-item" 
              onClick={alertmsg}
            >
              About
            </button>
            <button 
              className="drawer-nav-item" 
              onClick={logOut}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
