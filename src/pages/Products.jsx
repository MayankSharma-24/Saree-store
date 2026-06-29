import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products";
import ProductCard from "../components/Products/ProductCard";
import { useCart } from "../hooks";
import { useWishlist } from "../hooks";
import "./Products.css";

const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popular":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );

  const searchQuery = searchParams.get("search") || "";

  const filteredProducts = useMemo(() => {
    let results = [...PRODUCTS];

    if (searchQuery) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }
    results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    results = sortProducts(results, sortBy);

    return results;
  }, [searchQuery, selectedCategory, minPrice, maxPrice, sortBy]);

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-page-header">
        <div className="container">
          <h1>
            {selectedCategory || searchQuery
              ? selectedCategory || `Search: "${searchQuery}"`
              : "All Sarees"}
          </h1>
          <p className="products-count">
            {filteredProducts.length} styles found
          </p>
        </div>
      </div>

      <div className="container">
        <div className="products-layout">
          {/* Sidebar */}
          <aside className="products-sidebar">
            {/* Categories */}
            <div className="filter-block">
              <h4 className="filter-title">CATEGORIES</h4>
              <div className="filter-list">
                <label className="filter-item">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ""}
                    onChange={() => setSelectedCategory("")}
                  />
                  <span>All</span>
                </label>
                {CATEGORIES.map((cat) => (
                  <label key={cat.id} className="filter-item">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.name}
                      onChange={() => setSelectedCategory(cat.name)}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="filter-block">
              <h4 className="filter-title">PRICE RANGE</h4>
              <div className="price-boxes">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                  className="price-box"
                />
                <span>—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || 20000)}
                  className="price-box"
                />
              </div>
              <p className="price-range-label">
                ₹{minPrice.toLocaleString()} – ₹{maxPrice.toLocaleString()}
              </p>
            </div>

            {/* Clear */}
            {(selectedCategory || minPrice > 0 || maxPrice < 20000) && (
              <button
                className="clear-btn"
                onClick={() => {
                  setSelectedCategory("");
                  setMinPrice(0);
                  setMaxPrice(20000);
                  setSearchParams({});
                }}
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Main */}
          <div className="products-main">
            {/* Toolbar */}
            <div className="products-toolbar">
              <p className="toolbar-count">
                <strong>{filteredProducts.length}</strong> Products
              </p>
              <div className="sort-wrap">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Popularity</option>
                  <option value="rating">Better Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>🔍</p>
                <h3>No products found</h3>
                <p>Try changing your filters</p>
                <button
                  className="clear-btn"
                  onClick={() => {
                    setSelectedCategory("");
                    setMinPrice(0);
                    setMaxPrice(20000);
                    setSearchParams({});
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
