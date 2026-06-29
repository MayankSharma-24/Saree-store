import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks';
import { useAuth } from '../hooks';
import { generateOrderId } from '../utils/utils';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const shippingCosts = {
    standard: 50,
    express: 150,
    overnight: 300,
  };

  const shippingDays = {
    standard: '5-7 business days',
    express: '2-3 business days',
    overnight: '1 business day',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      const orderId = generateOrderId();
      clearCart();
      navigate(`/order-success/${orderId}`);
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checking out</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = parseFloat(total);
  const shippingCost = shippingCosts[selectedShipping];
  const tax = ((subtotal + shippingCost) * 18) / 100;
  const grandTotal = subtotal + shippingCost + tax;

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header" style={{ marginBottom: 'var(--space-16)' }}>
          <h1>Checkout</h1>
          <p>Complete your purchase securely</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <div className="checkout-content">
            {/* Shipping & Payment Form */}
            <div className="form-section">
              {/* Shipping Address */}
              <div className="form-card">
                <h3>📍 Shipping Address</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                    {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                    {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="98765 43210"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No. 123, Street Name"
                    rows="3"
                  />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                    />
                    {errors.state && <span className="form-error">{errors.state}</span>}
                  </div>

                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="400001"
                    />
                    {errors.zipCode && <span className="form-error">{errors.zipCode}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="form-card">
                <h3>🚚 Shipping Method</h3>

                <div className="shipping-options">
                  {Object.entries(shippingDays).map(([key, days]) => (
                    <label key={key} className="shipping-option">
                      <input
                        type="radio"
                        name="shipping"
                        value={key}
                        checked={selectedShipping === key}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                      />
                      <span className="option-details">
                        <span className="option-name">
                          {key === 'standard' && 'Standard Delivery'}
                          {key === 'express' && 'Express Delivery'}
                          {key === 'overnight' && 'Overnight Delivery'}
                        </span>
                        <span className="option-days">{days}</span>
                        <span className="option-price">
                          {shippingCosts[key] === 0 ? 'FREE' : `₹${shippingCosts[key]}`}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-card">
                <h3>💳 Payment Method</h3>

                <div className="payment-options">
                  {[
                    { id: 'card', name: 'Credit/Debit Card' },
                    { id: 'upi', name: 'UPI' },
                    { id: 'wallet', name: 'Digital Wallet' },
                    { id: 'netbanking', name: 'Net Banking' },
                    { id: 'cod', name: 'Cash on Delivery' },
                  ].map((method) => (
                    <label key={method.id} className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                      />
                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>

                {selectedPayment === 'cod' && (
                  <div className="payment-note">
                    ℹ️ You will pay ₹{grandTotal.toLocaleString()} on delivery
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="form-card">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked required />
                  <span>I agree to the Terms & Conditions and Privacy Policy</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>

                <div className="order-items">
                  {items.map((item) => (
                    <div key={item.id} className="summary-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping ({selectedShipping})</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>

                <div className="summary-row">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isProcessing}
                  style={{ width: '100%', marginTop: 'var(--space-8)' }}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>

                <p className="security-note">🔒 Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;