import { Link } from "react-router-dom";
import { useWishlist } from "../hooks";
import { useCart } from "../hooks";
import ProductCard from "../components/Products/ProductCard";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleViewDetails = (id) => {
    window.location.href = `/products/${id}`;
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container" style={{ padding: "60px 0" }}>
          <div className="empty-wishlist">
            <div className="empty-icon">❤️</div>
            <h1>Your Wishlist is Empty</h1>
            <p>Add some beautiful sarees to your wishlist!</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container" style={{ padding: "40px 0" }}>
        {/* Page Header */}
        <div className="wishlist-header">
          <h1>❤️ My Wishlist</h1>
          <p>{wishlist.length} items saved</p>
        </div>

        {/* Wishlist Items */}
        <div className="wishlist-content">
          {/* Items Grid */}
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <div key={product.id} className="wishlist-item">
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToWishlist={(p) => removeFromWishlist(p.id)}
                  onViewDetails={handleViewDetails}
                />
                <div className="wishlist-item-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAddToCart(product)}
                    style={{ width: "100%" }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => removeFromWishlist(product.id)}
                    style={{ width: "100%" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Price Summary */}
          <div className="wishlist-sidebar">
            <div className="wishlist-summary">
              <h3>Summary</h3>
              <div className="summary-stat">
                <span>Total Items</span>
                <span className="stat-value">{wishlist.length}</span>
              </div>
              <div className="summary-stat">
                <span>Total Value</span>
                <span className="stat-value">
                  ₹
                  {wishlist
                    .reduce((sum, item) => sum + item.price, 0)
                    .toLocaleString()}
                </span>
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: "var(--space-6)" }}
                onClick={() => {
                  wishlist.forEach((item) => addToCart(item));
                  window.location.href = "/cart";
                }}
              >
                Add All to Cart
              </button>
              <Link
                to="/products"
                className="btn btn-ghost btn-lg"
                style={{ width: "100%" }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
