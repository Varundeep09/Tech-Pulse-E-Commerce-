/**
 * Utility Functions for TechPulse E-commerce Site
 */

// Format currency
function formatCurrency(amount) {
  return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Calculate discount percentage
function calculateDiscountPercentage(originalPrice, currentPrice) {
  if (!originalPrice || originalPrice <= currentPrice) return null;
  const percentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  return percentage;
}

// Generate stars based on rating
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="bi bi-star-fill"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
    starsHTML += '<i class="bi bi-star-half"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="bi bi-star"></i>';
  }
  
  return starsHTML;
}

// Truncate text with ellipsis
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Parse URL parameters
function getUrlParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  
  return params;
}

// Get product by ID
function getProductById(productId) {
  return data.products.find(product => product.id === productId);
}

// Get related products (same category, different product)
function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  
  return data.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

// Get featured products
function getFeaturedProducts(limit = 4) {
  return data.products
    .filter(p => p.isFeatured || p.isBestSeller)
    .slice(0, limit);
}

// Get new arrivals
function getNewArrivals(limit = 4) {
  return data.products
    .filter(p => p.isNew)
    .slice(0, limit);
}

// Get product reviews
function getProductReviews(productId) {
  return data.reviews.filter(review => review.productId === productId);
}

// Calculate average rating
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

// Show notification toast
function showToast(title, message, duration = 3000) {
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  const toast = document.getElementById('notificationToast');
  
  if (toastTitle && toastMessage && toast) {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    const bsToast = new bootstrap.Toast(toast, { delay: duration });
    bsToast.show();
  }
}

// Save data to local storage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get data from local storage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Generate a random ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Format date to readable string
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Check if an item is in stock
function isInStock(product) {
  return product && product.stock > 0;
}

// Get stock status text and class
function getStockStatus(product) {
  if (!product) return { text: 'Unknown', class: 'text-muted' };
  
  if (product.stock > 10) {
    return { text: 'In Stock', class: 'text-success' };
  } else if (product.stock > 0) {
    return { text: 'Low Stock', class: 'text-warning' };
  } else {
    return { text: 'Out of Stock', class: 'text-danger' };
  }
}

// Filter products by various criteria
function filterProducts(products, filters = {}) {
  let filteredProducts = [...products];
  
  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  
  // Filter by brand
  if (filters.brands && filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter(p => filters.brands.includes(p.brand));
  }
  
  // Filter by price range
  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
  }
  
  // Filter by rating
  if (filters.minRating) {
    filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating);
  }
  
  // Filter by availability
  if (filters.inStock === true) {
    filteredProducts = filteredProducts.filter(p => p.stock > 0);
  }
  
  // Search by keyword
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }
  
  return filteredProducts;
}

// Sort products
function sortProducts(products, sortBy = 'featured') {
  const productsCopy = [...products];
  
  switch(sortBy) {
    case 'priceLow':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'priceHigh':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'newest':
      return productsCopy.sort((a, b) => a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1);
    case 'bestSelling':
      return productsCopy.sort((a, b) => a.isBestSeller === b.isBestSeller ? 0 : a.isBestSeller ? -1 : 1);
    case 'topRated':
      return productsCopy.sort((a, b) => b.rating - a.rating);
    case 'featured':
    default:
      return productsCopy.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }
}

// Apply coupon code
function applyCoupon(code, subtotal) {
  const coupon = data.coupons.find(c => c.code === code && c.validUntil > Date.now());
  
  if (!coupon) return { valid: false, message: 'Invalid or expired coupon code.' };
  
  if (subtotal < coupon.minPurchase) {
    return { 
      valid: false, 
      message: `This coupon requires a minimum purchase of ${formatCurrency(coupon.minPurchase)}.` 
    };
  }
  
  if (coupon.freeShipping) {
    return { 
      valid: true, 
      message: 'Free shipping applied!',
      discount: 0,
      freeShipping: true
    };
  }
  
  const discount = (subtotal * (coupon.discountPercentage / 100)).toFixed(2);
  
  return {
    valid: true,
    message: `${coupon.discountPercentage}% discount applied!`,
    discount: parseFloat(discount),
    freeShipping: false
  };
}

// Track recently viewed products
function addToRecentlyViewed(productId) {
  const recentlyViewed = getFromLocalStorage('recentlyViewed') || [];
  
  // Remove if already exists
  const index = recentlyViewed.indexOf(productId);
  if (index > -1) {
    recentlyViewed.splice(index, 1);
  }
  
  // Add to beginning of array
  recentlyViewed.unshift(productId);
  
  // Keep only the 10 most recent
  const updatedList = recentlyViewed.slice(0, 10);
  
  saveToLocalStorage('recentlyViewed', updatedList);
}

// Get recently viewed products
function getRecentlyViewedProducts(limit = 4) {
  const recentlyViewed = getFromLocalStorage('recentlyViewed') || [];
  const products = [];
  
  for (const id of recentlyViewed) {
    const product = getProductById(id);
    if (product) {
      products.push(product);
      if (products.length >= limit) break;
    }
  }
  
  return products;
}

// Set dark/light theme
function setTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  saveToLocalStorage('darkMode', isDark);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
  }
}

// Initialize theme from local storage
function initTheme() {
  const isDark = getFromLocalStorage('darkMode');
  setTheme(isDark);
}

// Format time remaining for countdown
function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  };
}

// Initialize a countdown timer
function startCountdown(endTime, updateCallback, completeCallback) {
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;
    
    if (distance <= 0) {
      clearInterval(countdownInterval);
      if (completeCallback) completeCallback();
      return;
    }
    
    const totalSeconds = Math.floor(distance / 1000);
    const timeRemaining = formatTimeRemaining(totalSeconds);
    
    if (updateCallback) updateCallback(timeRemaining);
  }, 1000);
  
  return countdownInterval;
}

// Validate email format
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate phone number
function isValidPhone(phone) {
  const regex = /^\d{10,15}$/;
  return regex.test(phone.replace(/[^\d]/g, ''));
}

// Simple password strength checker
function checkPasswordStrength(password) {
  // Length check
  const lengthScore = Math.min(password.length / 8, 1) * 25;
  
  // Complexity checks
  const hasUppercase = /[A-Z]/.test(password) ? 25 : 0;
  const hasLowercase = /[a-z]/.test(password) ? 25 : 0;
  const hasNumber = /\d/.test(password) ? 25 : 0;
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 25 : 0;
  
  const totalScore = lengthScore * 0.4 + (hasUppercase + hasLowercase + hasNumber + hasSpecial) * 0.15;
  
  if (totalScore >= 80) return { strength: 'strong', score: totalScore };
  if (totalScore >= 50) return { strength: 'medium', score: totalScore };
  return { strength: 'weak', score: totalScore };
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize header scroll behavior
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// Document ready function
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// Export all utility functions
docReady(() => {
  // Initialize common UI elements
  initTheme();
  initBackToTop();
  initHeaderScroll();
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme !== 'dark');
    });
  }
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.querySelector('.search-button');
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
      }
    });
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
          window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        }
      }
    });
  }
});