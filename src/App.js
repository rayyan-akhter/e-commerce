import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import TopHeader from "./components/topHeader/topHeader";
import { Home } from "./page/home/home";
import { SingleProduct } from "./page/product/singleProduct";
import Register from "./page/register/register";
import { useState } from "react";
import { Cart } from "./page/cart/cart";

function App() {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});

    return (
    <>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <>
                <TopHeader  user={user} />
                <Register />
              </>
            }
          />
          <Route
            exact
            path="/"
            element={
              <>
                <TopHeader />
                <Header user={user} product={product} />
                <Home user={user} setUser={setUser} />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <TopHeader />
                <Header user={user}/>
                <SingleProduct product={product} setProduct={setProduct}  />
              </>
            }
          />
          <Route path="/cart"
          element={
            <>
              <TopHeader />
                <Header user={user} />
                <Cart product={product} />
            </>
          }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
