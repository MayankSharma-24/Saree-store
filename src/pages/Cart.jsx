import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks';
import './Cart.css';

const Cart = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    // Mock coupon validation
    if (coupon.toUpperCase() === 'SAREE30') {
      setDiscount(30);
    } else if (coupon.toUpperCase() === 'SAVE10') {
      setDiscount(10);
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
    setCoupon('');
  };

  const subtotal = parseFloat(total);
  const discountAmount = (subtotal * discount) / 100;
  const tax = ((subtotal - discountAmount) * 18) / 100; // 18% GST
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
  const grandTotal = subtotal - discountAmount + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Add some beautiful sarees to your cart and come back here!</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header" style={{ marginBottom: 'var(--space-16)' }}>
          <h1>Shopping Cart</h1>
          <p>Review your items before checkout</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span></span>
            </div>

            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-product">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-category">{item.category}</p>
                  </div>
                </div>

                <div className="item-price">
                  ₹{item.price.toLocaleString()}
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                    }
                    min="1"
                  />
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <div className="item-total">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>

                <button
                  className="item-remove"
                  onClick={() => handleRemove(item.id)}
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="coupon-section">
              <form onSubmit={handleApplyCoupon}>
                <input
                  type="text"
                  placeholder="Enter coupon code (Try: SAREE30 or SAVE10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="coupon-input"
                />
                <button type="submit" className="btn btn-secondary">
                  Apply
                </button>
              </form>
              {discount > 0 && (
                <p className="discount-applied">✓ {discount}% discount applied!</p>
              )}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount ({discount}%)</span>
                  <span>−₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>

              {shipping === 0 && (
                <p className="free-shipping-note">✓ Free shipping on orders above ₹500</p>
              )}

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="btn btn-ghost"
                style={{ width: '100%', marginTop: 'var(--space-4)' }}
              >
                Continue Shopping
              </Link>

              <button
                className="btn btn-outline"
                onClick={clearCart}
                style={{ width: '100%', marginTop: 'var(--space-4)' }}
              >
                Clear Cart
              </button>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="badge">
                  <span>🔒</span>
                  <small>Secure Checkout</small>
                </div>
                <div className="badge">
                  <span>✓</span>
                  <small>30-day Returns</small>
                </div>
                <div className="badge">
                  <span>📞</span>
                  <small>24/7 Support</small>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="recommendations">
              <h4>Why shop with us?</h4>
              <ul>
                <li>✓ Authentic, premium quality sarees</li>
                <li>✓ Guaranteed Best Prices</li>
                <li>✓ Fast & Free Shipping</li>
                <li>✓ Easy Returns & Exchanges</li>
                <li>✓ Secure Payments</li>
                <li>✓ 24/7 Customer Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;