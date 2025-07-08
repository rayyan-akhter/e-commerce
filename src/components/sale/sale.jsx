import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router";
import "./sale.css";

const Sale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 45,
    seconds: 55
  });
  const navigate = useNavigate();

  useEffect(() => {
    const productsData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    productsData();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", product.title);
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    // TODO: Implement wishlist functionality
    console.log("Adding to wishlist:", product.title);
  };

  if (loading) {
    return (
      <div className="sale-loader">
        <div className="loader-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading flash sales...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="flash-sale-section">
      <div className="container">
        {/* Flash Sale Header */}
        <div className="sale-header">
          <div className="sale-badge">
            <div className="sale-indicator"></div>
            <span className="sale-label">Flash Sale</span>
          </div>
          <h2 className="heading-2">Today's Deals</h2>
          <p className="body-large text-gray-600">
            Limited time offers on trending products
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="countdown-timer">
          <div className="timer-label">Sale Ends In:</div>
          <div className="timer-display">
            <div className="timer-unit">
              <span className="timer-value">{formatTime(timeLeft.hours)}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
              <span className="timer-value">{formatTime(timeLeft.minutes)}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
              <span className="timer-value">{formatTime(timeLeft.seconds)}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.slice(0, 6).map((product, index) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                />
                <div className="product-overlay">
                  <button 
                    className="overlay-btn wishlist-btn"
                    onClick={(e) => handleWishlist(e, product)}
                    aria-label="Add to wishlist"
                  >
                    <AiOutlineHeart size={20} />
                  </button>
                  <button 
                    className="overlay-btn view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    aria-label="View product"
                  >
                    <AiOutlineEye size={20} />
                  </button>
                </div>
                <div className="product-badge">
                  <span className="discount-badge">-20%</span>
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-title" title={product.title}>
                  {product.title.length > 50 
                    ? product.title.substring(0, 50) + '...' 
                    : product.title
                  }
                </h3>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < Math.floor(product.rating?.rate || 0) ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-count">({product.rating?.count || 0})</span>
                </div>

                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  <span className="original-price">${(product.price * 1.25).toFixed(2)}</span>
                </div>

                <button 
                  className="btn btn-primary add-to-cart-btn"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <AiOutlineShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="view-all-container">
          <button 
            className="btn btn-outline btn-lg"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sale;
