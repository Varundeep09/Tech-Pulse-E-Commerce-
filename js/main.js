/**
 * Main JavaScript for TechPulse E-commerce Homepage
 */

// Load featured products
function loadFeaturedProducts() {
  const container = document.getElementById('featuredProductsContainer');
  if (!container) return;
  
  const featuredProducts = getFeaturedProducts(4);
  
  let html = '';
  
  featuredProducts.forEach(product => {
    const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);
    
    html += `
      <div class="col-md-6 col-lg-3">
        <div class="product-card">
          <div class="product-image-container">
            <a href="product-detail.html?id=${product.id}">
              <img src="${product.image}" alt="${product.title}" class="product-image">
            </a>
            ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
            ${discountPercentage ? `<span class="product-badge sale">-${discountPercentage}%</span>` : ''}
            ${!isInStock(product) ? '<span class="product-badge out-of-stock">Out of Stock</span>' : ''}
            <div class="product-wishlist" data-id="${product.id}">
              <i class="bi bi-heart"></i>
            </div>
            <div class="product-actions">
              <a href="product-detail.html?id=${product.id}" class="product-action-btn" title="View Details">
                <i class="bi bi-eye"></i>
              </a>
              <a href="#" class="product-action-btn add-to-cart-btn" data-id="${product.id}" title="Add to Cart">
                <i class="bi bi-cart-plus"></i>
              </a>
              <a href="#" class="product-action-btn" title="Compare">
                <i class="bi bi-arrow-left-right"></i>
              </a>
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">${product.brand} • ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            <h3 class="product-title">
              <a href="product-detail.html?id=${product.id}">${product.title}</a>
            </h3>
            <div class="product-rating">
              ${generateStarRating(product.rating)}
              <span class="ms-2">(${product.reviewCount})</span>
            </div>
            <div class="price-container">
              ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
              <span class="current-price">${formatCurrency(product.price)}</span>
            </div>
            <button class="btn btn-primary btn-sm add-to-cart-btn mt-2" data-id="${product.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Initialize wishlist buttons
  WishlistService.initWishlistButtons();
}

// Load new arrivals
function loadNewArrivals() {
  const container = document.getElementById('newArrivalsContainer');
  if (!container) return;
  
  const newArrivals = getNewArrivals(4);
  
  let html = '';
  
  newArrivals.forEach(product => {
    const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);
    
    html += `
      <div class="col-md-6 col-lg-3">
        <div class="product-card">
          <div class="product-image-container">
            <a href="product-detail.html?id=${product.id}">
              <img src="${product.image}" alt="${product.title}" class="product-image">
            </a>
            ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
            ${discountPercentage ? `<span class="product-badge sale">-${discountPercentage}%</span>` : ''}
            ${!isInStock(product) ? '<span class="product-badge out-of-stock">Out of Stock</span>' : ''}
            <div class="product-wishlist" data-id="${product.id}">
              <i class="bi bi-heart"></i>
            </div>
            <div class="product-actions">
              <a href="product-detail.html?id=${product.id}" class="product-action-btn" title="View Details">
                <i class="bi bi-eye"></i>
              </a>
              <a href="#" class="product-action-btn add-to-cart-btn" data-id="${product.id}" title="Add to Cart">
                <i class="bi bi-cart-plus"></i>
              </a>
              <a href="#" class="product-action-btn" title="Compare">
                <i class="bi bi-arrow-left-right"></i>
              </a>
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">${product.brand} • ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            <h3 class="product-title">
              <a href="product-detail.html?id=${product.id}">${product.title}</a>
            </h3>
            <div class="product-rating">
              ${generateStarRating(product.rating)}
              <span class="ms-2">(${product.reviewCount})</span>
            </div>
            <div class="price-container">
              ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
              <span class="current-price">${formatCurrency(product.price)}</span>
            </div>
            <button class="btn btn-primary btn-sm add-to-cart-btn mt-2" data-id="${product.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Initialize wishlist buttons
  WishlistService.initWishlistButtons();
}

// Setup deal of the day countdown
function setupDealOfDay() {
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');
  
  if (!hours || !minutes || !seconds) return;
  
  // Set end time to 24 hours from now
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 24);
  
  // Start countdown
  startCountdown(endTime.getTime(), (timeRemaining) => {
    hours.textContent = timeRemaining.hours;
    minutes.textContent = timeRemaining.minutes;
    seconds.textContent = timeRemaining.seconds;
  });
  
  // Setup deal product
  const dealImage = document.getElementById('dealImage');
  const dealTitle = document.getElementById('dealTitle');
  const dealDescription = document.getElementById('dealDescription');
  
  if (dealImage && dealTitle && dealDescription) {
    // Use the first flash deal
    if (data.flashDeals && data.flashDeals.length > 0) {
      const flashDeal = data.flashDeals[0];
      const product = getProductById(flashDeal.productId);
      
      if (product) {
        dealImage.src = product.image;
        dealImage.alt = product.title;
        dealTitle.textContent = product.title;
        dealDescription.textContent = product.description;
        
        // Calculate discount price
        const originalPrice = product.originalPrice || product.price;
        const discountedPrice = product.price * (1 - flashDeal.discountPercentage / 100);
        
        // Update price display
        const priceContainer = dealTitle.closest('.deal-content').querySelector('.price-container');
        if (priceContainer) {
          priceContainer.innerHTML = `
            <span class="original-price">${formatCurrency(originalPrice)}</span>
            <span class="current-price">${formatCurrency(discountedPrice)}</span>
          `;
        }
        
        // Update discount tag
        const dealTag = dealImage.closest('.deal-image-container').querySelector('.deal-tag');
        if (dealTag) {
          dealTag.textContent = `SAVE ${flashDeal.discountPercentage}%`;
        }
        
        // Update add to cart button
        const addToCartBtn = dealTitle.closest('.deal-content').querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
          addToCartBtn.dataset.id = product.id;
        }
      }
    }
  }
}

// Setup newsletter form
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value : '';
      
      if (email && isValidEmail(email)) {
        showToast('Newsletter', 'Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      } else {
        showToast('Error', 'Please enter a valid email address.');
      }
    });
  }
}

// Initialize homepage
docReady(() => {
  // Load products
  loadFeaturedProducts();
  loadNewArrivals();
  
  // Setup deal of the day countdown
  setupDealOfDay();
  
  // Setup newsletter form
  setupNewsletterForm();
});