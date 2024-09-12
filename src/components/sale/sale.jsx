import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";
import "./sale.css";
import { ClipLoader } from "react-spinners";
const Sale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const productsData = async() => {
      setLoading(true)
      try{ 
     
        const response = await fetch("https://fakestoreapi.com/products");
        const data  = await response.json();
        setProducts(data)
      } catch(error){
        console.error();
        
      }finally{
        setLoading(false);;
      }
       
    };
    productsData();
  }, []);
  console.log(products, "products");

  // if (loading) {
  //   return (
  //     <div className="loader">
  //       <ClipLoader size={200} />
  //     </div>
  //   );
  // }


  return (
    <div className="sale">
      <div className="saleTop">
        <div className="saleBox"></div>
        <h4 className="saleBoxDay">Today's</h4>
      </div>
      <div className="saleCenter">
        <div className="saleCenterLeft">
          <h2>Flash Sales</h2>
          <h2>04:45:55</h2>
        </div>
      </div>
      <div className="saleBottom">
        {products.slice(0, 4).map((product, index) => (
          <div
            className="saleProduct"
            key={index}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="productImageContainer">
              <img
                className="saleProductImage"
                src={product.image}
                alt="Joystick"
              />
            </div>
            <div className="productDescription">
              <div className="productName">
                <h4 className="productTitle">{product.title}</h4>
                <AiOutlineHeart size={20} />
              </div>
              <div className="productPrice">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="veiwBtnontainer">
        <button className="veiwBtn" onClick={() => navigate("/products")}>
          View all product
        </button>
      </div>
      <hr className="line"></hr>
    </div>
  );
};

export default Sale;

