import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import TopHeader from "./components/topHeader/topHeader";
import { Cart } from "./page/cart/cart";
import { Home } from "./page/home/home";
import { Product } from "./page/products/product";
import Register from "./page/register/register";
import { SingleProduct } from "./page/singleProduct/singleProduct";
import Profile from "./page/profile/profile";
import Checkout from "./page/checkout/checkout";

function App() {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Improved responsive detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load user data
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownOpen && !event.target.closest('.dropdown')) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropDownOpen]);

  return (
    <div className="app">
      <Router>
        <Routes>
          {/* Register Page */}
          <Route
            path="/register"
            element={
              <div className="register-page">
                {isMobile && <TopHeader user={user} isMobile={isMobile} />}
                <Register user={user} setUser={setUser} />
              </div>
            }
          />

          {/* Home Page */}
          <Route
            exact
            path="/"
            element={
              <div className="main-layout">
                {isMobile && <TopHeader user={user} isMobile={isMobile} />}
                <Header
                  user={user}
                  product={product}
                  setUser={setUser}
                  isMobile={isMobile}
                  dropDownOpen={dropDownOpen}
                  setDropDownOpen={setDropDownOpen}
                />
                <main className="main-content">
                  <Home user={user} setUser={setUser} />
                </main>
              </div>
            }
          />

          {/* Single Product Page */}
          <Route
            path="/product/:id"
            element={
              <div className="main-layout">
                {isMobile && <TopHeader user={user} isMobile={isMobile} />}
                <Header
                  user={user}
                  setUser={setUser}
                  isMobile={isMobile}
                  dropDownOpen={dropDownOpen}
                  setDropDownOpen={setDropDownOpen}
                />
                <main className="main-content">
                  <SingleProduct
                    product={product}
                    setProduct={setProduct}
                    user={user}
                  />
                </main>
              </div>
            }
          />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <div className="main-layout">
                {isMobile && <TopHeader user={user} isMobile={isMobile} />}
                <Header
                  user={user}
                  setUser={setUser}
                  isMobile={isMobile}
                  dropDownOpen={dropDownOpen}
                  setDropDownOpen={setDropDownOpen}
                />
                <main className="main-content">
                  <Cart product={product} user={user} />
                </main>
              </div>
            }
          />

          {/* Products Page */}
          <Route
            path="/products"
            element={
              <div className="main-layout">
                {isMobile && <TopHeader user={user} isMobile={isMobile} />}
                <Header
                  user={user}
                  setUser={setUser}
                  isMobile={isMobile}
                  dropDownOpen={dropDownOpen}
                  setDropDownOpen={setDropDownOpen}
                />
                <main className="main-content">
                  <Product user={user} />
                </main>
              </div>
            }
          />

          {/* Profile Page (Commented out for now) */}
          {/* <Route
            path="/profile"
            element={
              <div className="main-layout">
                {isMobile && <TopHeader user={user} isMobile={isMobile} />}
                <Header
                  user={user}
                  setUser={setUser}
                  isMobile={isMobile}
                  dropDownOpen={dropDownOpen}
                  setDropDownOpen={setDropDownOpen}
                />
                <main className="main-content">
                  <Profile user={user} />
                </main>
              </div>
            }
          /> */}

          {/* Checkout Page */}
          <Route
            path="/checkout"
            element={
              <div className="main-layout">
                {isMobile && <TopHeader user={user} isMobile={isMobile} />}
                <main className="main-content">
                  <Checkout user={user} />
                </main>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
