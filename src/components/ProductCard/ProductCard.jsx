import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, showRating = true, showOverlay = true, className = "" }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      // TODO: Implement add to cart functionality
      console.log("Adding to cart:", product.title);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success feedback
      // You can add a toast notification here
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
    console.log("Toggling wishlist:", product.title);
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    return stars;
  };

  return (
    <div 
      className={`product-card ${className}`}
      onClick={handleCardClick}
    >
      {/* Product Image Container */}
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg'; // Fallback image
          }}
        />
        
        {/* Product Overlay */}
        {showOverlay && (
          <div className="product-overlay">
            <button 
              className={`overlay-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <AiOutlineHeart size={20} />
            </button>
            <button 
              className="overlay-btn view-btn"
              onClick={handleViewProduct}
              aria-label="View product details"
            >
              <AiOutlineEye size={20} />
            </button>
          </div>
        )}

        {/* Product Badge */}
        <div className="product-badge">
          <span className="discount-badge">-20%</span>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title" title={product.title}>
          {product.title.length > 50 
            ? product.title.substring(0, 50) + '...' 
            : product.title
          }
        </h3>
        
        {/* Product Rating */}
        {showRating && product.rating && (
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating.rate)}
            </div>
            <span className="rating-count">({product.rating.count})</span>
          </div>
        )}

        {/* Product Price */}
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          <span className="original-price">{formatPrice(product.price * 1.25)}</span>
        </div>

        {/* Add to Cart Button */}
        <button 
          className={`btn btn-primary add-to-cart-btn ${isLoading ? 'loading' : ''}`}
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              <AiOutlineShoppingCart size={16} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 