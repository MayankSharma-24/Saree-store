import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../hooks";
import { useWishlist } from "../hooks";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(
    product ? isInWishlist(product.id) : false,
  );

  if (!product) {
    return (
      <div
        className="page-container"
        style={{ textAlign: "center", padding: "60px 20px" }}
      >
        <h1>Product Not Found</h1>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = () => {
    addToWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="container" style={{ marginTop: "var(--space-8)" }}>
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="container" style={{ marginTop: "var(--space-12)" }}>
        <div className="product-details-grid">
          {/* Image Section */}
          <div className="image-section">
            <div className="main-image">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
              />
              {product.isNew && <span className="product-badge">NEW</span>}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                <img
                  src={product.image}
                  alt="Thumbnail"
                  className={selectedImage === 0 ? "active" : ""}
                  onClick={() => setSelectedImage(0)}
                />
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={selectedImage === idx + 1 ? "active" : ""}
                    onClick={() => setSelectedImage(idx + 1)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="info-section">
            {/* Category & Title */}
            {product.category && (
              <span className="product-category">{product.category}</span>
            )}
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="rating-section">
                <div className="stars">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="rating-value">{product.rating}</span>
                {product.reviews && (
                  <span className="reviews-count">
                    ({product.reviews} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="price-section">
              <div className="price">
                <span className="current-price">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="discount">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            {/* Product Details */}
            {product.details && (
              <div className="details-box">
                <h4>Product Details</h4>
                <ul>
                  <li>
                    <strong>Length:</strong> {product.details.length}
                  </li>
                  <li>
                    <strong>Width:</strong> {product.details.width}
                  </li>
                  <li>
                    <strong>Weight:</strong> {product.details.weight}
                  </li>
                  <li>
                    <strong>Care:</strong> {product.details.care}
                  </li>
                </ul>
              </div>
            )}

            {/* Attributes */}
            {product.fabric && (
              <div className="attributes">
                <div className="attribute">
                  <strong>Fabric:</strong> {product.fabric}
                </div>
                <div className="attribute">
                  <strong>Pattern:</strong> {product.pattern}
                </div>
                <div className="attribute">
                  <strong>Occasion:</strong> {product.occasion}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="selection-group">
                <label>
                  <strong>Color:</strong>
                </label>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? "selected" : ""}`}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Stock */}
            <div className="quantity-section">
              <div className="quantity-input">
                <label>
                  <strong>Quantity:</strong>
                </label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              {product.stock !== undefined && (
                <div
                  className={`stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {isAdded ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
              <button
                className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
                onClick={handleWishlist}
                title="Add to wishlist"
              >
                {isWishlisted ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Features */}
            <div className="features-highlight">
              <div className="feature">
                <span>✨</span>
                <div>
                  <strong>Authentic Quality</strong>
                  <p>Genuine saree</p>
                </div>
              </div>
              <div className="feature">
                <span>🚚</span>
                <div>
                  <strong>Fast Shipping</strong>
                  <p>2-3 days delivery</p>
                </div>
              </div>
              <div className="feature">
                <span>↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <h2>Customer Reviews</h2>
          <div className="reviews-placeholder">
            <p>Reviews feature coming soon!</p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <h2 className="related-title">You May Also Like</h2>

            <div className="related-products-grid">
              {relatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="related-product-card"
                  onClick={() => navigate(`/products/${prod.id}`)}
                >
                  <div className="related-product-image">
                    <img src={prod.image} alt={prod.name} />
                  </div>

                  <div className="related-product-content">
                    <h4>{prod.name}</h4>

                    <p className="price">₹{prod.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
