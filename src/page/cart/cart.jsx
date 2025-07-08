import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./cart.css";
import { ClipLoader } from "react-spinners";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { IconButton, Snackbar } from "@mui/material";
import { AiOutlineClose, AiOutlineLock, AiOutlineShoppingCart, AiOutlineArrowLeft } from "react-icons/ai";

export const Cart = ({ user }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(150);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true";
    if (!isLoggedIn || !user?.name) {
      setAuthMessage("Please log in to access your cart");
      setTimeout(() => {
        navigation("/register");
      }, 2000);
      return;
    }
  }, [user, navigation]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProducts(cartData);
  }, []);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false); 
      }
    };
    fetchProductsData();
  }, []);

  const cartDetails = cartProducts.map((cartProduct) => {
    const product = products.find((p) => p.id === cartProduct.productId);
    return product ? { ...product, quantity: cartProduct.quantity } : null;
  }).filter(Boolean);

  const cartTotal = cartDetails.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  useEffect(() => {
    setShippingCost(cartTotal < 1000 ? 150 : 0);
  }, [cartTotal]);

  // Show authentication message if user is not logged in
  if (authMessage) {
    return (
      <div className="auth-message">
        <div className="auth-message-content">
          <AiOutlineLock size={48} className="auth-icon" />
          <h2>Authentication Required</h2>
          <p>{authMessage}</p>
          <div className="auth-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => navigation("/register")}
            >
              Sign In
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => navigation("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-loader">
        <div className="loader-container">
          <ClipLoader size={60} color="var(--primary-color)" />
          <p className="loading-text">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cartDetails?.length) {
    return (
      <section className="cart-section">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <AiOutlineShoppingCart size={80} />
            </div>
            <h2 className="heading-2">Your Cart is Empty</h2>
            <p className="body-large text-gray-600">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => navigation("/")}>
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  const handleQuantityChange = (productId, amount) => {
    setCartProducts((prevCartProducts) => {
      let updatedCart = prevCartProducts.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      );

      updatedCart = updatedCart.filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        sx={{color:"white"}}
        aria-label="close"
        onClick={handleClose}
      >
        <AiOutlineClose size={15} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <section className="cart-section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <button 
            className="breadcrumb-link"
            onClick={() => navigation("/")}
          >
            <AiOutlineArrowLeft size={16} />
            Back to Shop
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Shopping Cart</span>
        </div>

        {/* Cart Header */}
        <div className="cart-header">
          <h1 className="heading-1">Shopping Cart</h1>
          <p className="body-large text-gray-600">
            {cartDetails.length} item{cartDetails.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <div className="cart-header-product">Product</div>
              <div className="cart-header-price">Price</div>
              <div className="cart-header-quantity">Quantity</div>
              <div className="cart-header-subtotal">Subtotal</div>
            </div>

            {cartDetails.map((product) => (
              <div className="cart-item" key={product.id}>
                <div className="cart-item-product">
                  <img className="cart-item-image" src={product.image} alt={product.title} />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{product.title}</h3>
                    <p className="cart-item-category">{product.category}</p>
                  </div>
                </div>
                <div className="cart-item-price">${product.price}</div>
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={product.quantity <= 1}
                  >
                    <BiMinus size={16} />
                  </button>
                  <span className="quantity-value">{product.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    <BsPlus size={16} />
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <button className="btn btn-outline" onClick={() => navigation("/")}>
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-header">
              <h3 className="heading-3">Order Summary</h3>
            </div>
            
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
              </div>
              {shippingCost > 0 && (
                <div className="summary-note">
                  <p>Free shipping on orders over $1000</p>
                </div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span>${(cartTotal + shippingCost).toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-actions">
              <button 
                className="btn btn-primary btn-lg checkout-btn"
                onClick={() => navigation("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Coupon Section */}
            <div className="coupon-section">
              <div className="coupon-input-group">
                <input 
                  type="text" 
                  className="coupon-input" 
                  placeholder="Enter coupon code"
                />
                <button className="btn btn-outline coupon-btn" onClick={handleClick}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="This feature isn't available right now"
          action={action}
        />
      </div>
    </section>
  );
};

