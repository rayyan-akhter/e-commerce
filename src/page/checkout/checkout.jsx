import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./checkout.css";
import header_img from "./headerImage.png";
import addAdress_img from "./addAdress.png";
import { AiOutlineLock, AiOutlineArrowLeft, AiOutlineHome, AiOutlineCreditCard, AiOutlineCheckCircle } from "react-icons/ai";

const Checkout = ({ user }) => {
  const navigation = useNavigate();
  const [authMessage, setAuthMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: user?.name || '',
    street: '',
    city: '',
    zipcode: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true";
    if (!isLoggedIn || !user?.name) {
      setAuthMessage("Please log in to access checkout");
      setTimeout(() => {
        navigation("/register");
      }, 2000);
      return;
    }

    // Load cart items for checkout
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartData.length === 0) {
      setAuthMessage("Your cart is empty. Please add items before checkout.");
      setTimeout(() => {
        navigation("/");
      }, 2000);
      return;
    }

    // Calculate cart total (simplified - in real app you'd fetch product details)
    const total = cartData.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    setCartTotal(total);
    setCartItems(cartData);
  }, [user, navigation]);

  // Load addresses from localStorage or default
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('addresses'));
    if (stored && stored.length) {
      setAddresses(stored);
    } else {
      setAddresses([
        {
          name: user?.name || 'User',
          street: user?.address?.street || '123 Main Street',
          city: user?.address?.city || 'City',
          zipcode: user?.address?.zipcode || '12345'
        }
      ]);
    }
  }, [user]);

  // Save addresses to localStorage when changed
  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleAddressSelect = idx => setSelectedAddressIndex(idx);
  const handleEdit = idx => {
    setEditingIndex(idx);
    setAddressForm(addresses[idx]);
    setShowAddForm(false);
  };
  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingIndex(null);
    setAddressForm({ name: user?.name || '', street: '', city: '', zipcode: '' });
  };
  const handleAddressFormChange = e => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };
  const handleAddressFormSave = e => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.street || !addressForm.city || !addressForm.zipcode) return;
    if (editingIndex !== null) {
      // Edit existing
      const updated = [...addresses];
      updated[editingIndex] = addressForm;
      setAddresses(updated);
      setEditingIndex(null);
    } else {
      // Add new
      setAddresses([...addresses, addressForm]);
      setSelectedAddressIndex(addresses.length);
      setShowAddForm(false);
    }
    setAddressForm({ name: user?.name || '', street: '', city: '', zipcode: '' });
  };

  // Show authentication message if user is not logged in
  if (authMessage) {
    return (
      <div className="auth-message">
        <div className="auth-message-content">
          <AiOutlineLock size={48} className="auth-icon" />
          <h2>Authentication Required</h2>
          <p>{authMessage}</p>
          <div className="auth-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => navigation("/register")}
            >
              Sign In
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => navigation("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const shipping = cartItems.length > 0 ? 300 : 0;
  const total = subtotal + shipping;

  return (
    <section className="checkout-section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <button 
            className="breadcrumb-link"
            onClick={() => navigation("/")}
          >
            <AiOutlineArrowLeft size={16} />
            Back to Shop
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Checkout</span>
        </div>

        {/* Checkout Header */}
        <div className="checkout-header">
          <div className="checkout-header-content">
            <div className="checkout-header-icon">
              <AiOutlineCreditCard size={32} />
            </div>
            <div className="checkout-header-text">
              <h1 className="heading-1">Checkout</h1>
              <p className="body-large text-gray-600">
                Complete your purchase securely
              </p>
            </div>
          </div>
          <div className="checkout-stats">
            <span className="checkout-count">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
            </span>
          </div>
        </div>

        {/* Checkout Steps */}
        <div className="checkout-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Shipping Address</div>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Payment Method</div>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Review & Place Order</div>
        </div>
      </div>

        <div className="checkout-content">
          {/* Checkout Form */}
          <div className="checkout-form">
            {/* Step 1: Shipping Address */}
            <div className="checkout-step-content">
              <div className="step-header">
                <h2 className="heading-2">Shipping Address</h2>
                <p className="body-medium text-gray-600">
                  Where should we deliver your order?
                </p>
              </div>
              
              {/* Show items being purchased above address section */}
              <div className="checkout-items-list" style={{ marginBottom: 32 }}>
                <h3 className="heading-3">Items in your order</h3>
                <div className="checkout-items-table">
                  <div className="checkout-items-header">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Subtotal</span>
                  </div>
                  {cartItems.map((item, idx) => (
                    <div className="checkout-item-row" key={idx}>
                      <span>{item.title || `Item ${idx + 1}`}</span>
                      <span>{item.quantity}</span>
                      <span>${(item.price || 0).toFixed(2)}</span>
                      <span>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="address-section">
                <div className="address-card">
                  <div className="address-header">
                    <h3 className="heading-3">Your Address</h3>
                    <p className="body-small text-gray-600">
                      Sending items to more than one address?
                    </p>
                  </div>
                  
                  <div className="address-options">
                    {addresses.map((addr, idx) => (
                      <div className="address-option" key={idx}>
                        <input
                          type="radio"
                          name="address"
                          id={`address-${idx}`}
                          checked={selectedAddressIndex === idx}
                          onChange={() => handleAddressSelect(idx)}
                        />
                        <label htmlFor={`address-${idx}`} className="address-label">
                          <div className="address-details">
                            <strong>{addr.name}</strong>
                            <span>{addr.street}</span>
                            <span>{addr.city}, {addr.zipcode}</span>
                          </div>
                        </label>
                        <button className="btn btn-outline" style={{ marginLeft: 12 }} onClick={() => handleEdit(idx)}>
                          Edit
                        </button>
                      </div>
                    ))}
                    <div className="add-address-option" onClick={handleAddNew} style={{ cursor: 'pointer' }}>
                      <img src={addAdress_img} alt="Add new address" />
                      <span>Add a new address</span>
                    </div>
                  </div>
                  
                  {(showAddForm || editingIndex !== null) && (
                    <form className="address-form" onSubmit={handleAddressFormSave} style={{ marginTop: 16 }}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Name</label>
                          <input name="name" value={addressForm.name} onChange={handleAddressFormChange} />
                        </div>
                        <div className="form-group">
                          <label>Street</label>
                          <input name="street" value={addressForm.street} onChange={handleAddressFormChange} />
                        </div>
                        <div className="form-group">
                          <label>City</label>
                          <input name="city" value={addressForm.city} onChange={handleAddressFormChange} />
                        </div>
                        <div className="form-group">
                          <label>Zipcode</label>
                          <input name="zipcode" value={addressForm.zipcode} onChange={handleAddressFormChange} />
                        </div>
                      </div>
                      <button className="btn btn-primary" type="submit" style={{ marginTop: 8 }}>
                        Save Address
                      </button>
                      <button className="btn btn-outline" type="button" style={{ marginLeft: 8 }} onClick={() => { setShowAddForm(false); setEditingIndex(null); }}>
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method (Placeholder) */}
            {currentStep >= 2 && (
              <div className="checkout-step-content">
                <div className="step-header">
                  <h2 className="heading-2">Payment Method</h2>
                  <p className="body-medium text-gray-600">
                    Choose how you'd like to pay
                  </p>
                </div>
                
                <div className="payment-section">
                  <div className="payment-card">
                    <div className="payment-option">
                      <input type="radio" name="payment" id="credit-card" defaultChecked />
                      <label htmlFor="credit-card" className="payment-label">
                        <AiOutlineCreditCard size={24} />
                        <span>Credit Card</span>
                      </label>
                    </div>
                    
                    <div className="payment-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Card Number</label>
                          <input type="text" placeholder="1234 5678 9012 3456" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input type="text" placeholder="MM/YY" />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input type="text" placeholder="123" />
                        </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review Order (Placeholder) */}
            {currentStep >= 3 && (
              <div className="checkout-step-content">
                <div className="step-header">
                  <h2 className="heading-2">Review Your Order</h2>
                  <p className="body-medium text-gray-600">
                    Please review your order details before placing it
                  </p>
                </div>
                
                <div className="review-section">
                  <div className="review-card">
                    <div className="review-items">
                      {cartItems.map((item, index) => (
                        <div key={index} className="review-item">
                          <span>Item {index + 1}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-header">
              <h3 className="heading-3">Order Summary</h3>
            </div>
            
            <div className="summary-content">
              <div className="summary-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">Item {index + 1}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">${(item.price || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="summary-actions">
              {currentStep === 1 && (
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to Payment
                </button>
              )}
              {currentStep === 2 && (
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setCurrentStep(3)}
                >
                  Review Order
                </button>
              )}
              {currentStep === 3 && !orderPlaced && (
                <button className="btn btn-primary btn-lg checkout-btn" onClick={() => setOrderPlaced(true)}>
                  <AiOutlineCheckCircle size={20} />
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {orderPlaced && (
        <div className="order-placed-overlay">
          <div className="order-placed-card">
            <AiOutlineCheckCircle size={64} className="order-placed-icon" />
            <h2 className="auth-title">Your order has been placed!</h2>
            <p className="auth-subtitle">Thank you for shopping with us.</p>
            <button className="auth-btn" onClick={() => navigation("/")}>Go to Home</button>
      </div>
    </div>
      )}
    </section>
  );
};

export default Checkout;

