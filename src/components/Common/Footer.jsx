import { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get exclusive offers and updates on new sarees</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-btn">
              Subscribe
            </button>
          </form>
          {subscribed && <p className="success-msg">✓ Thank you for subscribing!</p>}
        </div>

        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h4>About Saree Store</h4>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#press">Press</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="#returns">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#track">Track Order</a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-section">
            <h4>Policies</h4>
            <ul>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="#shipping-policy">Shipping Policy</a>
              </li>
              <li>
                <a href="#refund">Refund Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📞 +91 (555) 123-4567</p>
            <p>📧 support@sareestore.com</p>
            <p>📍 123 Fashion Street, Mumbai, India</p>
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook">
                f
              </a>
              <a href="#instagram" aria-label="Instagram">
                📷
              </a>
              <a href="#twitter" aria-label="Twitter">
                𝕏
              </a>
              <a href="#pinterest" aria-label="Pinterest">
                📌
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2024 Saree Store. All rights reserved.</p>
          <div className="payment-methods">
            <span title="Visa">💳</span>
            <span title="Mastercard">💳</span>
            <span title="UPI">📱</span>
            <span title="Net Banking">🏦</span>
            <span title="Cash on Delivery">🚚</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;