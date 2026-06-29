import { Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from "../data/products";
import ProductCard from "../components/Products/ProductCard";
import { useCart } from "../hooks";
import { useWishlist } from "../hooks";
import "./Home.css";

const Home = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  const handleViewDetails = (id) => {
    window.location.href = `/products/${id}`;
  };

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Discover Timeless Elegance</h1>
          <p className="hero-subtitle">
            Explore our exquisite collection of authentic Indian sarees
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            <Link to="/products" className="btn btn-outline btn-lg">
              Explore Collection
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://premvastra.com/cdn/shop/articles/Collection_of_stylish_blouse_designs_paired_with_printed_sarees_showcasing_boat_neck_high_neck_sleeveless_corset_and_puff_sleeve_styles..png?v=1780658205"
            alt="Hero"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="category-card"
              >
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <h3>{category.name}</h3>
                  <p>{category.productCount} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Collections</h2>
            <Link to="/products" className="view-all-link">
              View All →
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Authentic Quality</h3>
              <p>Genuine, high-quality sarees sourced directly from artisans</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>Quick and reliable delivery across India</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Shopping</h3>
              <p>Safe transactions with multiple payment options</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>Hassle-free returns within 30 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Customer Love</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <p className="author-name">{testimonial.name}</p>
                    <p className="author-role">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner Section */}
      <section className="promo-section">
        <div className="container">
          <div className="promo-card">
            <div className="promo-content">
              <span className="promo-label">Limited Time Offer</span>
              <h2>Get 30% Off on Select Collections</h2>
              <p>Use code: SAREE30 at checkout</p>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Shop Now
              </Link>
            </div>
            <div className="promo-image">
              <img
                src="https://as2.ftcdn.net/v2/jpg/14/87/45/17/1000_F_1487451732_pDAvcFS2ItNKc1231u6vg8bMGEv47hEz.jpg"
                alt="Promo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Showcase */}
      <section className="collection-showcase">
        <div className="container">
          <h2 className="section-title">Trending This Season</h2>
          <div className="showcase-grid">
            <div className="showcase-item large">
              <img
                src="https://pasapali.com/cdn/shop/files/phuljaal-phuljaal-teal-blue-sambalpuri-bandha-cotton-saree-1.jpg?v=1781638236"
                alt="Banarasi"
              />
              <div className="showcase-overlay">
                <h3>Banarasi Collections</h3>
                <Link
                  to="/products?category=Traditional"
                  className="btn btn-white"
                >
                  Explore
                </Link>
              </div>
            </div>
            <div className="showcase-item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUiLqRLu0--24b6hplb-kb6jWD4OU3VMM3Q&s"
                alt="Casual"
              />
              <div className="showcase-overlay">
                <h3>Casual Wear</h3>
                <Link to="/products?category=Casual" className="btn btn-white">
                  Explore
                </Link>
              </div>
            </div>
            <div className="showcase-item">
              <img
                src="https://houseofhind.com/cdn/shop/files/171A9801_1080x.jpg?v=1742581355"
                alt="Ethnic"
              />
              <div className="showcase-overlay">
                <h3>Ethnic Designs</h3>
                <Link to="/products?category=Ethnic" className="btn btn-white">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
