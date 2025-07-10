import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router";
import "./featuredProducts.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        // Select a mix of products from different categories
        const featuredProducts = data.filter((_, index) => 
          index % 3 === 0 || index % 5 === 0
        ).slice(0, 8);
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", product.title);
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    
    // Get current wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Check if product is already in wishlist
    const existingItem = wishlist.find(
      item => item.productId === product.id && 
      (item.user === user?.email || item.user === user?.name)
    );
    
    if (existingItem) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(
        item => !(item.productId === product.id && 
        (item.user === user?.email || item.user === user?.name))
      );
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert("Removed from wishlist!");
    } else {
      // Add to wishlist
      const wishlistItem = {
        productId: product.id,
        user: user?.email || user?.name,
        ...product
      };
      wishlist.push(wishlistItem);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert("Added to wishlist!");
    }
  };

  if (loading) {
    return (
      <div className="featured-loader">
        <div className="loader-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading featured products...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="featured-section">
      <div className="container">
        {/* Featured Products Header */}
        <div className="featured-header">
          <h2 className="heading-2">Featured Products</h2>
          <p className="body-large text-gray-600">
            Discover our handpicked selection of premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="featured-products-grid">
          {products.map((product) => (
            <div
              className="featured-product-card"
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
                  <span className="category-badge">{product.category}</span>
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-title" title={product.title}>
                  {product.title.length > 50 
                    ? product.title.substring(0, 50) + '...' 
                    : product.title
                  }
                </h3>
                
                <p className="product-description" title={product.description}>
                  {product.description.length > 120 
                    ? product.description.substring(0, 120) + '...' 
                    : product.description
                  }
                </p>
                
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
                  <span className="rating-rate">({product.rating?.rate?.toFixed(1) || 0})</span>
                </div>

                <div className="product-price">
                  <span className="current-price">${product.price}</span>
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

export default FeaturedProducts; 