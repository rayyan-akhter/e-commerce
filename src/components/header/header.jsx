import React, { useEffect, useState, useRef } from "react";
import {
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { IconButton, Snackbar } from "@mui/material";
import "./header.css";
import { useDebounce } from "use-debounce";

const Header = ({ user, setUser, isMobile, dropDownOpen, setDropDownOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = useNavigate();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const dropdownRef = useRef(null);

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

  const navigateToSignup = () => {
    navigation("/register");
  };

  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", debouncedSearchQuery);
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    }
    if (dropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen, setDropDownOpen]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
 
  const action = (
    <React.Fragment>
      <IconButton
        sx={{ color: "white" }}
        aria-label="close"
        onClick={handleClose}
      >
        <AiOutlineClose size={15} />
      </IconButton>
    </React.Fragment>
  );
 
  return (
    <>
      {/* Desktop Header */}
      {!isMobile && (
        <header className="header header-desktop">
          <div className="container">
            <div className="header-content">
              {/* Logo */}
              <div className="header-logo">
                <h1 className="logo-text">Socialify</h1>
          </div>

              {/* Search Bar */}
              <div className="header-search">
                <form onSubmit={handleSearch} className="search-form">
                  <div className={`search-input ${isSearchFocused ? 'focused' : ''}`}>
                    <AiOutlineSearch className="search-icon" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="input"
                    />
                  </div>
                </form>
              </div>

              {/* Navigation */}
              <nav className="header-nav">
                <div className="nav-actions">
                  {/* User Menu */}
                  <div className="user-menu" ref={dropdownRef}>
              {!isLoggedIn ? (
                      <button className="btn btn-primary" onClick={navigateToSignup}>
                        <AiOutlineUser size={18} />
                  Sign Up
                </button>
              ) : (
                      <div style={{ position: 'relative' }}>
                        <button 
                          className="btn btn-ghost user-dropdown-btn" 
                          onClick={toggleDropDown}
                          type="button"
                        >
                          <AiOutlineUser size={18} />
                          <span className="user-name">{user?.name}</span>
                  <RiArrowDropDownLine size={20} />
                        </button>
                  {dropDownOpen && (
                    <div className="dropdown">
                            <div className="dropdown-menu">
                              <button className="dropdown-item">
                                <AiOutlineUser size={16} />
                        Profile
                      </button>
                              <button className="dropdown-item">
                        My Orders
                      </button>
                              <div className="dropdown-divider"></div>
                              <button className="dropdown-item" onClick={logOut}>
                                <MdLogout size={16} />
                        Logout
                      </button>
                            </div>
                    </div>
                  )}
                </div>
              )}
            </div>

                  {/* Action Icons */}
                  <div className="action-icons">
                    <button 
                      className="icon-btn tooltip" 
                onClick={handleClick}
                      aria-label="Wishlist"
                    >
                      <AiOutlineHeart size={24} />
                      <span className="tooltip-content">Wishlist</span>
                    </button>
                    
                    <button 
                      className="icon-btn tooltip" 
                      onClick={handleCart}
                      aria-label="Shopping Cart"
                    >
                      <AiOutlineShoppingCart size={24} />
                      <span className="tooltip-content">Cart</span>
                    </button>
                    
                    {isLoggedIn && (
                      <button 
                        className="icon-btn tooltip" 
                        onClick={logOut}
                        aria-label="Logout"
                      >
                        <MdLogout size={24} />
                        <span className="tooltip-content">Logout</span>
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <header className="header header-mobile">
          <div className="mobile-header-content">
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle touch-target" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <AiOutlineMenu size={24} />
            </button>

            {/* Mobile Logo */}
            <div className="mobile-logo">
              <h1 className="logo-text">Socialify</h1>
            </div>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              <button 
                className="mobile-icon-btn" 
                onClick={handleCart}
                aria-label="Cart"
              >
                <AiOutlineShoppingCart size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mobile-search">
            <form onSubmit={handleSearch} className="search-form">
              <div className={`search-input ${isSearchFocused ? 'focused' : ''}`}>
                <AiOutlineSearch className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="input"
                />
              </div>
            </form>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu-overlay" onClick={toggleMobileMenu}>
              <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-menu-header">
                  <h3>Menu</h3>
                  <button 
                    className="mobile-menu-close touch-target" 
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                  >
                    <AiOutlineClose size={24} />
                  </button>
                </div>
                
                <div className="mobile-menu-content">
                  {!isLoggedIn ? (
                    <button className="btn btn-primary btn-lg w-full" onClick={navigateToSignup}>
                      <AiOutlineUser size={20} />
                      Sign Up
                    </button>
                  ) : (
                    <div className="mobile-user-info">
                      <div className="user-avatar">
                        <AiOutlineUser size={32} />
                      </div>
                      <div className="user-details">
                        <h4>{user?.name}</h4>
                        <p className="text-gray-600">Welcome back!</p>
                      </div>
                    </div>
                  )}
                  
                  <nav className="mobile-nav">
                    <button className="mobile-nav-item">
                      <AiOutlineUser size={20} />
                      Profile
                    </button>
                    <button className="mobile-nav-item">
                      My Orders
                    </button>
                    <button className="mobile-nav-item">
                      <AiOutlineHeart size={20} />
                      Wishlist
                    </button>
                    {isLoggedIn && (
                      <button className="mobile-nav-item" onClick={logOut}>
                        <MdLogout size={20} />
                        Logout
                      </button>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </header>
      )}

      {/* Snackbar */}
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
        message="This feature isn't available right now"
                action={action}
              />
    </>
  );
};

export default Header;
