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

function App() {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {

    window.addEventListener("resize",(e)=>{

      if (window.innerWidth < 912) setIsMobile(true);
      else setIsMobile(false);
      console.log(e);
    })
    if (window.outerWidth < 912) setIsMobile(true);
      else setIsMobile(false);
    
  }, []);

  useEffect(() => {
   
    if (localStorage.getItem("user"))
      return setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <div >
                <TopHeader user={user} isMobile={isMobile} />
                <Register user={user} setUser={setUser} />
              </div>
            }
          />
          <Route
            exact
            path="/"
            element={
              <>
                <TopHeader isMobile={isMobile}/>
                <Header user={user} product={product} setUser={setUser} isMobile={isMobile} />
                <Home user={user} setUser={setUser} />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <TopHeader isMobile={isMobile}/>
                <Header user={user} setUser={setUser} isMobile={isMobile} />
                <SingleProduct
                  product={product}
                  setProduct={setProduct}
                  user={user}
                />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <TopHeader isMobile={isMobile} />
                <Header user={user} setUser={setUser} isMobile={isMobile}/>
                <Cart product={product} />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <TopHeader isMobile={isMobile} />
                <Header user={user} setUser={setUser} isMobile={isMobile} />
               <Product/>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

