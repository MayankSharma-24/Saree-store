import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks";
import { useAuth } from "../../hooks";
import { useWishlist } from "../../hooks";
import "./Navbar.css";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { itemCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { wishlistCount } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">Radhe Store</span>
        </Link>

        {/* Menu Button (Mobile) */}
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Traditional"
                onClick={() => setIsMenuOpen(false)}
              >
                Traditional
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Casual"
                onClick={() => setIsMenuOpen(false)}
              >
                Casual
              </Link>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Search */}
          <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="search-btn" aria-label="Search">
                🔍
              </button>
            </form>
            <button
              className="search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              🔍
            </button>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="navbar-icon" title="Wishlist">
            <span className="icon-badge">{wishlistCount}</span>
            ❤️
          </Link>

          {/* Cart */}
          <Link to="/cart" className="navbar-icon" title="Cart">
            <span className="icon-badge">{itemCount}</span>
            🛒
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
