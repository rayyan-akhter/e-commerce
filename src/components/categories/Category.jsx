import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./category.css";
import iphone from "./iPhone.jpg";
import jacket from "./jacket.jpg";

const Category = ({ isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const carouselImage = [iphone, jacket];

  const apiUrl = `https://fakestoreapi.com/products/categories`;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSelectedCategory(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategory = (category) => {
    navigate(`/products?category=${category}`);
  };

  // Auto-rotate carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImage.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImage.length]);

  if (loading) {
    return (
      <div className="category-loader">
        <div className="loader-container">
          <ClipLoader size={60} color="var(--primary-color)" />
          <p className="loading-text">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="category-section">
      <div className="container">
        <div className="category-content">
          {/* Categories Section */}
          <div className="categories-container">
            <div className="categories-header">
              <h2 className="heading-3">Shop by Category</h2>
              <p className="body-medium text-gray-600">
                Discover our curated collection of products
              </p>
            </div>
            
            <div className="categories-grid">
              {selectedCategory.map((category, index) => (
                <div
                  key={category}
                  className={`category-card ${hoveredCategory === category ? 'hovered' : ''}`}
                  onClick={() => handleCategory(category)}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="category-icon">
                    <span className="category-emoji">
                      {getCategoryEmoji(category)}
                    </span>
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{formatCategoryName(category)}</h3>
                    <p className="category-description">
                      {getCategoryDescription(category)}
                    </p>
                  </div>
                  <div className="category-arrow">
                    <AiOutlineArrowRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Carousel */}
          {!isMobile && (
            <div className="hero-carousel">
              <div className="carousel-container">
                <div className="carousel-image-wrapper">
                  <img
                    className="carousel-image"
                    src={carouselImage[currentImageIndex]}
                    alt="Featured product"
                  />
                  <div className="carousel-overlay">
                    <div className="carousel-content">
                      <h2 className="heading-2 text-white">
                        Discover Amazing Products
                      </h2>
                      <p className="body-large text-white opacity-90">
                        Shop the latest trends and find your perfect match
                      </p>
                      <button 
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate("/products")}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                  {carouselImage.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper functions
const getCategoryEmoji = (category) => {
  const emojiMap = {
    "men's clothing": "👔",
    "women's clothing": "👗",
    "jewelery": "💍",
    "electronics": "📱",
  };
  return emojiMap[category] || "🛍️";
};

const formatCategoryName = (category) => {
  return category
    .split("'")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("'");
};

const getCategoryDescription = (category) => {
  const descriptions = {
    "men's clothing": "Stylish apparel for the modern man",
    "women's clothing": "Elegant fashion for every occasion",
    "jewelery": "Timeless pieces to complement your style",
    "electronics": "Cutting-edge technology and gadgets",
  };
  return descriptions[category] || "Explore our amazing collection";
};

export default Category;
