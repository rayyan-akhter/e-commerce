import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  AiOutlineHeart, 
  AiOutlineShoppingCart, 
  AiOutlineArrowLeft,
  AiOutlineDelete
} from 'react-icons/ai';
import './wishlist.css';

const Wishlist = ({ user }) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load wishlist items for this user
    const allWishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const userWishlistItems = allWishlistItems.filter(
      (item) => item.user === user?.email || item.user === user?.name
    );
    setWishlistItems(userWishlistItems);
    setLoading(false);
  }, [user]);

  const removeFromWishlist = (productId) => {
    const allWishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updatedWishlist = allWishlistItems.filter(
      (item) => !(item.productId === productId && (item.user === user?.email || item.user === user?.name))
    );
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    // Update local state
    setWishlistItems(updatedWishlist.filter(
      (item) => item.user === user?.email || item.user === user?.name
    ));
  };

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = storedCart.findIndex(
      (item) => item.productId === product.id
    );

    if (existingProductIndex > -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      storedCart.push({ productId: product.id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert("Product added to cart!");
  };

  const moveAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart(item);
    });
    alert("All items moved to cart!");
  };

  const clearWishlist = () => {
    const allWishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updatedWishlist = allWishlistItems.filter(
      (item) => !(item.user === user?.email || item.user === user?.name)
    );
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlistItems([]);
  };

  if (loading) {
    return (
      <div className="wishlist-loading">
        <div className="loader-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (!wishlistItems.length) {
    return (
      <div className="wishlist-empty">
        <AiOutlineHeart size={80} className="wishlist-empty-icon" />
        <h2>Your Wishlist is Empty</h2>
        <p>Start adding products to your wishlist by clicking the heart icon on any product.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        {/* Wishlist Header */}
        <div className="wishlist-header">
          <button className="back-button" onClick={() => navigate("/")}>
            <AiOutlineArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>

        {/* Wishlist Actions */}
        <div className="wishlist-actions">
          <button 
            className="btn btn-primary"
            onClick={moveAllToCart}
          >
            <AiOutlineShoppingCart size={16} />
            Move All to Cart
          </button>
          <button 
            className="btn btn-secondary"
            onClick={clearWishlist}
          >
            <AiOutlineDelete size={16} />
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div className="wishlist-card" key={item.productId}>
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="product-badge">
                  <span className="category-badge">{item.category}</span>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.productId)}
                  aria-label="Remove from wishlist"
                >
                  <AiOutlineDelete size={16} />
                </button>
              </div>

              <div className="product-info">
                <h3 className="product-title" title={item.title}>
                  {item.title.length > 50 
                    ? item.title.substring(0, 50) + '...' 
                    : item.title
                  }
                </h3>
                
                <p className="product-description" title={item.description}>
                  {item.description.length > 120 
                    ? item.description.substring(0, 120) + '...' 
                    : item.description
                  }
                </p>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < Math.floor(item.rating?.rate || 0) ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-count">({item.rating?.count || 0})</span>
                  <span className="rating-rate">({item.rating?.rate?.toFixed(1) || 0})</span>
                </div>

                <div className="product-price">
                  <span className="current-price">${item.price}</span>
                </div>

                <div className="product-actions">
                  <button 
                    className="btn btn-primary add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    <AiOutlineShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button 
                    className="btn btn-outline view-btn"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 