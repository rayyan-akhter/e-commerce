import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./cart.css";
import { ClipLoader } from "react-spinners";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { IconButton, Snackbar } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(150);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);


  const navigation = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProducts(cartData);
  }, []);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false); 
      }
    };
    fetchProductsData();
  }, []);

  const cartDetails = cartProducts.map((cartProduct) => {
    const product = products.find((p) => p.id === cartProduct.productId);
    return product ? { ...product, quantity: cartProduct.quantity } : null;
  }).filter(Boolean);

  const cartTotal = cartDetails.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  useEffect(() => {
    setShippingCost(cartTotal < 1000 ? 150 : 0);
  }, [cartTotal]);


  if (loading) {
    return (
      <div className="loader">
        <ClipLoader  size={200} />;
      </div>
    );
  }
  if (!cartDetails?.length) {
    return (
      <div className="cartPage">
        <h2>Your Cart is Empty</h2>
        <button className="updateBtn" onClick={() => navigation("/")}>
          Return to Shop
        </button>
      </div>
    );
  }
  
  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + amount, 1));
  };


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      
      <IconButton
      sx={{color:"white"}}
        aria-label="close"
        
        onClick={handleClose}
      >
        <AiOutlineClose size={15} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="cartPage">
      <div className="cartNavigation">
        <p onClick={() => navigation("/")}>Home </p>
        <p>/</p>
        <p> Cart</p>
      </div>
      <div className="cartPagetop">
        <div className="cartProductTitle">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartDetails.map((product) => (
          <div className="cartProductDetails" key={product.id}>
            <div className="cartProductInfo">
              <img className="CartProductImage" src={product.image} alt="" />
              <p>{product.title}</p>
            </div>
            <p className="cartProductPrice">${product.price}</p>
            <div className="cart-quantity-manage-container">
            <BiMinus size={28} className="minus" onClick={() => handleQuantityChange(-1)} />
              
            <p className="cartProductQuantity">{product.quantity}</p>
            <BsPlus
              size={28}
              className="plus"
              onClick={() => handleQuantityChange(1)}
            />
            </div>
            <p className="cartProductSubTotal">
              ${product.price * product.quantity}
            </p>
          </div>
        ))}
        <div className="cartUpdateBtnContainer">
          <p className="updateBtn" onClick={() => navigation("/")}>
            Return to Shop
          </p>
          <p className="updateBtn" onClick={handleClick}>Update Cart</p>
        </div>
      </div>
      <div className="cartPageBottom">
        <div className="cartPageBottomLeft">
          <input type="text" className="cartCoupon" />
          <button className="couponBtn" onClick={handleClick}>Apply Coupon</button>
        </div>
        <div className="cartPageBottomRight">
          <h3>Cart total</h3>
          <div className="cartSubTotal">
            <p>Subtotal:</p>
            <p>${cartTotal}</p>
          </div>
          <hr />
          <div className="cartSubTotal">
            <p>Shipping:</p>
            <p>${shippingCost}</p>
          </div>
          <hr />
          <div className="cartSubTotal">
            <p>Total:</p>
            <p>${cartTotal + shippingCost}</p>
          </div>
          <div className="CartProcessToCheckOutContainer">
            <button className="CartProcessToCheckOut" onClick={handleClick}>Proceed to Checkout</button>
          </div>
          <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="This feature ain't available right now"
                action={action}
              />
        </div>
      </div>
    </div>
  );
};

