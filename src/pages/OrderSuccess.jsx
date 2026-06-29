import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Simulate getting order data
    const mockOrder = {
      id: id,
      date: new Date().toLocaleDateString("en-IN"),
      total: Math.floor(Math.random() * 50000) + 5000,
      estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("en-IN"),
      items: [
        {
          name: "Banarasi Silk Saree",
          quantity: 1,
          price: 5999,
        },
      ],
    };
    setOrderData(mockOrder);
  }, [id]);

  if (!orderData) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="order-success-page">
      <div className="container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <div className="success-content">
          <div className="order-details-card">
            <div className="order-header">
              <div>
                <h3>Order Confirmation</h3>
                <p className="order-id">
                  Order ID: <strong>{orderData.id}</strong>
                </p>
              </div>
              <div className="order-status">
                <span className="status-badge processing">Processing</span>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="order-timeline">
              <div className="timeline-item active">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Order Placed</h4>
                  <p>{orderData.date}</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Processing</h4>
                  <p>Your order is being prepared</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Shipped</h4>
                  <p>On the way to you</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Delivered</h4>
                  <p>Estimated: {orderData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items-section">
              <h3>Order Items</h3>
              <div className="order-items-list">
                {orderData.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{(orderData.total * 0.85).toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Tax & Shipping</span>
                <span>₹{(orderData.total * 0.15).toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{orderData.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="next-steps">
              <h3>What's Next?</h3>
              <ul className="steps-list">
                <li>
                  <span className="step-icon">📧</span>
                  <div>
                    <strong>Confirmation Email</strong>
                    <p>Check your email for order confirmation</p>
                  </div>
                </li>
                <li>
                  <span className="step-icon">📦</span>
                  <div>
                    <strong>Tracking Information</strong>
                    <p>You'll receive tracking details soon</p>
                  </div>
                </li>
                <li>
                  <span className="step-icon">⭐</span>
                  <div>
                    <strong>Leave a Review</strong>
                    <p>Share your feedback after delivery</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="success-actions">
              <Link to="/profile" className="btn btn-primary btn-lg">
                📦 Track Order
              </Link>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Continue Shopping
              </Link>
              <button
                onClick={() => navigate("/")}
                className="btn btn-outline btn-lg"
              >
                Back to Home
              </button>
            </div>

            {/* Support */}
            <div className="support-section">
              <h4>Need Help?</h4>
              <p>
                📞 Call us at <strong>+91 (555) 123-4567</strong> or
                <br />
                📧 Email us at <strong>support@sareestore.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
