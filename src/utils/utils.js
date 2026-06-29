// Constants
export const PRICE_RANGES = [
  { min: 0, max: 1000, label: 'Below ₹1,000' },
  { min: 1000, max: 3000, label: '₹1,000 - ₹3,000' },
  { min: 3000, max: 5000, label: '₹3,000 - ₹5,000' },
  { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
  { min: 10000, max: Infinity, label: 'Above ₹10,000' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rating' },
  { value: 'popular', label: 'Most Popular' },
];

export const DELIVERY_OPTIONS = [
  { id: 'standard', name: 'Standard Delivery', days: '5-7', price: 50 },
  { id: 'express', name: 'Express Delivery', days: '2-3', price: 150 },
  { id: 'overnight', name: 'Overnight Delivery', days: '1', price: 300 },
];

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'wallet', name: 'Digital Wallet' },
  { id: 'upi', name: 'UPI' },
  { id: 'netbanking', name: 'Net Banking' },
  { id: 'cod', name: 'Cash on Delivery' },
];

// Validators
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone.replace(/\D/g, ''));
};

export const validateZipCode = (zipCode) => {
  const regex = /^[0-9]{6}$/;
  return regex.test(zipCode);
};

// Formatters
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-IN', options);
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{5})(\d{5})$/);
  if (match) {
    return `${match[1]} ${match[2]}`;
  }
  return phone;
};

export const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Sorting functions
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'newest':
      return sorted.reverse();
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'popular':
      return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    default:
      return sorted;
  }
};

// Filter functions
export const filterByPriceRange = (products, min, max) => {
  return products.filter((product) => product.price >= min && product.price <= max);
};

export const filterByCategory = (products, category) => {
  if (!category) return products;
  return products.filter((product) => product.category === category);
};

export const filterByRating = (products, minRating) => {
  return products.filter((product) => (product.rating || 0) >= minRating);
};

export const searchProducts = (products, query) => {
  if (!query.trim()) return products;

  const lowerQuery = query.toLowerCase();
  return products.filter((product) => {
    const searchFields = [
      product.name,
      product.description,
      product.category,
      product.fabric,
      product.pattern,
    ].join(' ');

    return searchFields.toLowerCase().includes(lowerQuery);
  });
};

// Cart helpers
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const calculateTax = (amount, taxPercent = 18) => {
  return (amount * taxPercent) / 100;
};

export const calculateTotal = (subtotal, tax, shipping) => {
  return subtotal + tax + shipping;
};

// LocalStorage helpers
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Notification helpers
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Generate order ID
export const generateOrderId = () => {
  return `ORD${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Check if product is on sale
export const isOnSale = (product) => {
  return product.originalPrice && product.originalPrice > product.price;
};

// Get discount percentage
export const getDiscountPercentage = (originalPrice, currentPrice) => {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};