import React, { useEffect, useState } from "react";
import { Navigate, json, useNavigate, useParams } from "react-router";
import "./singleProduct.css"
import image from "./deliveryIcon.png"
import returnImage  from "./returnIcon.png"
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";


export const SingleProduct = ({product,setProduct}) => {
  const params = useParams();
    console.log(params.id);
  const navigation = useNavigate();

  useEffect(() => {
    const productData = () => {
      fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then((response) => {
          console.log(response);
          if (response) return response.json();
        })
        .then((data) => {
          setProduct(data);
        
        })
        .catch((error) => console.log(error));
    };
    productData();
  }, []);

  const AddToCart =()=>{
    fetch('https://fakestoreapi.com/carts')
    .then((response) => {
      console.log(response);
      if (response) return response.json();
    })
    .then((data) => {
      setProduct(data);
    
    })
    .catch((error) => console.log(error));
    // localStorage.setItem("product",JSON.stringify(product));
    // alert("product Added to Cart")
    navigation("/cart")
  }
  

  console.log(product);
  return (
    <div className="productPage">
     
      <div className="productPageCenter">
        <img className="productPageImage" src={product.image} alt="" />
      </div>
      <div className="productPageRight">
        <div className="productPageRightTop">
          <h3 className="productPrice">{product.title}</h3>
          <h4>${product.price}</h4>
          <p>{product.description}</p>
        </div>
        <hr></hr>
        <div className="productPageRightCenter">
          <div className="addProduct">
           <BiMinus size={30} className="minus"/>
           <h3 className="number" >1</h3>
           <BsPlus size={30} className="plus"/>
          </div>
          <button className="buyNow">Buy now</button>
          <button className="buyNow" onClick={AddToCart}>Add Cart</button>
        </div>
        <div className="productPageRightBottom">
          <div className="delivery"> 
          <img src={image} alt=""/>
          <div>
            <p> Free delivery</p>
            <p> Enter your postal code for Delivery Availability</p>
          </div>
          </div>
          <hr></hr>
          <div className="delivery">
          <img src={returnImage} alt=""/>
          <div>
            <p> Return delivery</p>
            <p> Free 30 Days Delivery Returns. Details</p>
          </div>
             </div>
        </div>
      </div>
    </div>
  );
};
