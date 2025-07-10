import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai';
import './orders.css';

const Orders = ({ user }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders for this user
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders.filter(
      (order) => order.user === user?.email || order.user === user?.name
    );
    setOrders(userOrders.reverse()); // Most recent first
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  if (!orders.length) {
    return (
      <div className="orders-empty">
        <AiOutlineShoppingCart size={64} className="orders-empty-icon" />
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders yet.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <button className="back-button" onClick={() => navigate("/")}> <AiOutlineArrowLeft size={20} /> Back to Home </button>
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Here are your recent orders</p>
        </div>
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-meta">
                <span className="order-date">{new Date(order.date).toLocaleString()}</span>
                <span className="order-total">Total: ${order.total.toFixed(2)}</span>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div className="order-item" key={idx}>
                    <span className="item-name">Item {idx + 1}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                    <span className="item-price">${(item.price || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders; 