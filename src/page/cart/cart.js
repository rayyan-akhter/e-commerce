import React, { useEffect, useState } from "react";
import "./cart.css";

export const Cart = () => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(150);

  useEffect(() => {
    const cartData = () => {
      fetch("https://fakestoreapi.com/carts/2")
        .then((response) => {
          console.log(response);
          if (response) return response.json();
        })
        .then((data) => {
          setCart(data);
        })
        .catch((error) => console.log(error));
    };
    cartData();
  }, []);

  useEffect(() => {
    const productsData = () => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProducts(data);
        });
    };
    productsData();
  }, []);
  console.log(cart.products, "this is cart products");
  console.log(products, "this is products");

  useEffect(() => {
    if (!cart.products) return;
    let filteredProducts = [];
    products.forEach((product) => {
      const cartProduct = cart.products.find(
        (cartItem) => cartItem.productId === product.id
      );
      if (cartProduct) {
        filteredProducts.push({ ...product, quantity: cartProduct.quantity });
      }
    });
    setCartProducts(filteredProducts);
  }, [cart, products]);
  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  useEffect(() => {
    if (cartTotal < 1000) {
      setShippingCost(150);
    } else {
      setShippingCost(0);
    }
  }, [cartTotal]);

  return (
    <div className="cartPage">
      <div className="cartNavigation">
        <p>home </p>
        <p>/</p>
        <p> cart</p>
      </div>
      <div className="cartPagetop">
        <div className="cartProductTitle">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartProducts.map((product) => (
          <div className="cartProductDetails">
            <div className="cartProductInfo">
              <img
                className="CartProductImage"
                key={product.id}
                src={product.image}
                alt=""
              />
              <p>{product.title}</p>
            </div>
            <p className="cartProductPrice">${product.price}</p>
            <p className="cartProductQuanitity">{product.quantity}</p>
            <p className="cartProductSubTotal"> ${product.price * product.quantity}</p>
          </div>
        ))}
        <div className="cartUpdateBtnContainer">
          <p className="updateBtn">Return to Shop</p>
          <p className="updateBtn">Update Cart</p>
        </div>
      </div>
      <div className="cartPageBottom">
        <div className="cartPageBottomLeft">
          <input type="text" className="cartCoupon" />
          <button className="couponBtn">Apply Coupon</button>
        </div>
        <div className="cartPageBottomRight">
          <h3>Cart total</h3>
          <div className="cartSubTotal">
            <p>Subtotal:</p>
            <p>
              ${cartTotal}
            </p>
          </div>
          <hr></hr>
          <div className="cartSubTotal">
            <p>shipping:</p>
            <p>${shippingCost}</p>
          </div>
          <hr></hr>
          <div className="cartSubTotal">
            <p>Total:</p>
            <p>
            ${cartTotal + shippingCost}
            </p>
          </div>
          <div className="CartProcessToCheckOutContainer">
            <button className="CartProcessToCheckOut">
              Procees to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
