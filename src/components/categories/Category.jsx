import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./category.css";
import iphone from "./iPhone.jpg";
const Category = ({isMobile}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState([]);

  useGSAP(() => {
    gsap.from("#iphoneImg", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 1,
      duration: 2,
      ease: "power2.inOut",
    });

    
  }, []);

  const apiUrl = `https://fakestoreapi.com/products/categories`;

  useEffect(()=>{

    const fetchCategories = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSelectedCategory(data);
    };
    fetchCategories();
  },[])
  

  const handleCategory = (category) => {
    navigate(`/products?category=${category}`);
  };
  

  return (
    <div className="frame">
      <div className="categories" >
        <h1>Categories</h1>
      <div className="frameLeft">
      {selectedCategory.map((category) => (
            <p
              key={category}
              className="frameBtns"
              onClick={() => handleCategory(category)}
            >
              {category}
            </p>
          ))}
      </div>
          </div>
     {!isMobile && <div className="frameRight" id="iphoneImg">
          <img className="iphoneImg" src={iphone} alt="iphoneImage"/>
        </div>}
    </div>
  );
};

export default Category;

