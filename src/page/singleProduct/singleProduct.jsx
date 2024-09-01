import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./singleProduct.css";
import image from "./deliveryIcon.png";
import returnImage from "./returnIcon.png";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";

export const SingleProduct = ({ user }) => {
  const params = useParams();
  const navigation = useNavigate();
  
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
  };

  const handleAddToCart = () => {
    if (!user?.name) {
      navigation("/register");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = storedCart.findIndex(item => item.productId === product.id);

    if (existingProductIndex > -1) {
      storedCart[existingProductIndex].quantity += quantity;
    } else {
      storedCart.push({ productId: product.id, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert("Product added to cart!");
    navigation("/cart");
  };

  return (
    <div className="productPage">
      <div className="productPageCenter">
        <img className="productPageImage" src={product.image} alt={product.title} />
      </div>
      <div className="productPageRight">
        <div className="productPageRightTop">
          <h3 className="productPrice">{product.title}</h3>
          <h4>${product.price}</h4>
          <p>{product.description}</p>
        </div>
        <hr />
        <div className="productPageRightCenter">
          <div className="addProduct">
            <BiMinus size={30} className="minus" onClick={() => handleQuantityChange(-1)} />
            <h3 className="number">{quantity}</h3>
            <BsPlus size={30} className="plus" onClick={() => handleQuantityChange(1)} />
          </div>
          <button className="buyNow" >Buy Now</button>
          <button className="buyNow" onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <div className="productPageRightBottom">
          <div className="delivery">
            <img src={image} alt="" />
            <div>
              <p>Free delivery</p>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          <hr />
          <div className="delivery">
            <img src={returnImage} alt="" />
            <div>
              <p>Return delivery</p>
              <p>Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
