import React, { useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import "./categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriesData = () => {
      fetch("https://fakestoreapi.com/products/categories")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCategories(data);
        });
    };
    categoriesData();
  }, []);
  return (
    <div className="category">
      <div className="categoryTop">
        <div className="categoryBox"></div>
        <h4 className="categoryBoxTitle">Categories</h4>
      </div>
      <div className="categoryBottom">
        {categories.map((category, index) => (
          <div className="categories" key={index}>
            <TbCategory size={60} />
            <h4>{category}</h4>
          </div>
        ))}
      </div>

      <hr className="line2"></hr>
    </div>
  );
};

export default Categories;
