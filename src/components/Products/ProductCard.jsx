import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks";
import { useWishlist } from "../../hooks";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="pc-card"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="pc-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="pc-image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x400?text=${encodeURIComponent(product.name)}`;
          }}
        />

        {/* Top Badges */}
        <div className="pc-badges-top">
          {discountPercent && (
            <span className="pc-badge-discount">-{discountPercent}%</span>
          )}
          {product.isNew && <span className="pc-badge-new">NEW</span>}
        </div>

        {/* Wishlist Button */}
        <button
          className={`pc-wishlist ${wishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>

        {/* Add to Cart - shows on hover */}
        <button
          className={`pc-add-btn ${isHovered ? "visible" : ""} ${addedToCart ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {addedToCart ? "✓ ADDED" : "ADD TO CART"}
        </button>
      </div>

      {/* Info Area */}
      <div className="pc-info">
        <p className="pc-brand">{product.fabric || product.category}</p>
        <h3 className="pc-name">{product.name}</h3>

        {/* Rating */}
        {product.rating && (
          <div className="pc-rating">
            <span className="pc-rating-pill">{product.rating} ★</span>
            <span className="pc-reviews">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="pc-price-row">
          <span className="pc-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="pc-original">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          {discountPercent && (
            <span className="pc-off">({discountPercent}% OFF)</span>
          )}
        </div>

        {/* Stock */}
        {product.stock !== undefined &&
          product.stock <= 5 &&
          product.stock > 0 && (
            <p className="pc-stock">Only {product.stock} left!</p>
          )}
        {product.stock === 0 && <p className="pc-stock out">Out of Stock</p>}
      </div>
    </div>
  );
};

export default ProductCard;
