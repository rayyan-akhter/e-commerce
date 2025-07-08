import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./singleProduct.css";
import image from "./deliveryIcon.png";
import returnImage from "./returnIcon.png";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { AiOutlineLock, AiOutlineArrowLeft, AiOutlineStar, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineCar, AiOutlineRollback } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

export const SingleProduct = ({ user }) => {
  const params = useParams();
  const navigation = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + amount, 1));
  };

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("login") === "true";
    
    if (!isLoggedIn || !user?.name) {
      setShowAuthMessage(true);
      setTimeout(() => {
        setShowAuthMessage(false);
        navigation("/register");
      }, 2000);
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = storedCart.findIndex(
      (item) => item.productId === product.id
    );

    if (existingProductIndex > -1) {
      storedCart[existingProductIndex].quantity += quantity;
    } else {
      storedCart.push({ productId: product.id, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert("Product added to cart!");
    navigation("/cart");
  };

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("login") === "true";
    
    if (!isLoggedIn || !user?.name) {
      setShowAuthMessage(true);
      setTimeout(() => {
        setShowAuthMessage(false);
        navigation("/register");
      }, 2000);
      return;
    }

    // Add to cart and proceed to checkout
    handleAddToCart();
    navigation("/checkout");
  };

  const handleWishlist = () => {
    // TODO: Implement wishlist functionality
    console.log("Added to wishlist:", product.title);
  };

  if (loading) {
    return (
      <div className="single-product-loader">
        <div className="loader-container">
          <ClipLoader size={60} color="var(--primary-color)" />
          <p className="loading-text">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="single-product-section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <button 
            className="breadcrumb-link"
            onClick={() => navigation("/products")}
          >
            <AiOutlineArrowLeft size={16} />
            Back to Products
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.category}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.title?.substring(0, 30)}...</span>
        </div>

        <div className="product-content">
          {/* Product Image */}
          <div className="product-image-section">
            <div className="product-image-container">
              <img
                className="product-image"
                src={product.image}
                alt={product.title}
              />
              <div className="product-image-overlay">
                <button 
                  className="overlay-btn wishlist-btn"
                  onClick={handleWishlist}
                  aria-label="Add to wishlist"
                >
                  <AiOutlineHeart size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <div className="product-header">
              <div className="product-category">
                <span className="category-badge">{product.category}</span>
              </div>
              <h1 className="product-title">{product.title}</h1>
              
              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`star ${i < Math.floor(product.rating?.rate || 0) ? 'filled' : ''}`}
                    >
                      <AiOutlineStar size={16} />
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="product-price">
                <span className="current-price">${product.price}</span>
                <span className="original-price">${(product.price * 1.25).toFixed(2)}</span>
                <span className="discount-badge">-20%</span>
              </div>
            </div>

            {/* Description */}
            <div className="product-description">
              <h3 className="description-title">Description</h3>
              <p className="description-text">{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="product-actions">
              <div className="quantity-section">
                <label className="quantity-label">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <BiMinus size={16} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <BsPlus size={16} />
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn btn-primary btn-lg add-to-cart-btn" onClick={handleAddToCart}>
                  <AiOutlineShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="btn btn-outline btn-lg buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <AiOutlineCar size={24} />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Free Delivery</h4>
                  <p className="feature-description">
                    Enter your postal code for delivery availability
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <AiOutlineRollback size={24} />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">30-Day Returns</h4>
                  <p className="feature-description">
                    Free 30-day delivery returns. View details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Message Overlay */}
      {showAuthMessage && (
        <div className="auth-overlay">
          <div className="auth-message-popup">
            <AiOutlineLock size={48} className="auth-icon" />
            <h3>Authentication Required</h3>
            <p>Please sign in to add items to your cart</p>
            <div className="auth-actions">
              <button 
                className="btn btn-primary" 
                onClick={() => navigation("/register")}
              >
                Sign In
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => setShowAuthMessage(false)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
