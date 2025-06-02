/**
 * Product Detail Page JavaScript for TechPulse E-commerce
 */

// Load product details
function loadProductDetails() {
  // Get product ID from URL
  const urlParams = getUrlParams();
  const productId = urlParams.id;
  
  if (!productId) {
    showToast('Error', 'Product not found');
    return;
  }
  
  // Get product
  const product = getProductById(productId);
  
  if (!product) {
    showToast('Error', 'Product not found');
    return;
  }
  
  // Add to recently viewed
  addToRecentlyViewed(productId);
  
  // Update page title
  document.title = `${product.title} | TechPulse`;
  
  // Update breadcrumbs
  const productBreadcrumb = document.getElementById('productBreadcrumb');
  const categoryLink = document.getElementById('categoryLink');
  
  if (productBreadcrumb) {
    productBreadcrumb.textContent = product.title;
  }
  
  if (categoryLink) {
    const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    categoryLink.textContent = categoryName;
    categoryLink.href = `products.html?category=${product.category}`;
  }
  
  // Update product images
  const mainProductImage = document.getElementById('mainProductImage');
  const thumbnailContainer = document.getElementById('thumbnailContainer');
  
  if (mainProductImage) {
    mainProductImage.src = product.image;
    mainProductImage.alt = product.title;
  }
  
  if (thumbnailContainer && product.images && product.images.length > 0) {
    let thumbnailsHtml = '';
    
    product.images.forEach((image, index) => {
      thumbnailsHtml += `
        <div class="col-3">
          <img src="${image}" alt="${product.title} ${index + 1}" 
               class="img-fluid ${index === 0 ? 'active' : ''}" 
               onclick="switchImage('${image}', this)">
        </div>
      `;
    });
    
    thumbnailContainer.innerHTML = thumbnailsHtml;
  }
  
  // Update discount tag
  const discountTag = document.getElementById('discountTag');
  const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);
  
  if (discountTag) {
    if (discountPercentage) {
      discountTag.textContent = `-${discountPercentage}%`;
      discountTag.style.display = 'block';
    } else {
      discountTag.style.display = 'none';
    }
  }
  
  // Update product info
  const productTitle = document.getElementById('productTitle');
  const productRating = document.getElementById('productRating');
  const reviewCount = document.getElementById('reviewCount');
  const productSku = document.getElementById('productSku');
  const priceContainer = document.getElementById('priceContainer');
  const availabilityContainer = document.getElementById('availabilityContainer');
  const productDescription = document.getElementById('productDescription');
  
  if (productTitle) {
    productTitle.textContent = product.title;
  }
  
  if (productRating) {
    productRating.innerHTML = generateStarRating(product.rating);
  }
  
  if (reviewCount) {
    reviewCount.textContent = `${product.reviewCount} reviews`;
  }
  
  if (productSku) {
    productSku.textContent = `SKU: ${product.id.toUpperCase()}`;
  }
  
  if (priceContainer) {
    priceContainer.innerHTML = `
      ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
      <span class="current-price">${formatCurrency(product.price)}</span>
    `;
  }
  
  if (availabilityContainer) {
    const stockStatus = getStockStatus(product);
    
    availabilityContainer.innerHTML = `
      <p class="mb-0">
        Availability: <span class="${stockStatus.class}">${stockStatus.text}</span>
      </p>
    `;
  }
  
  if (productDescription) {
    productDescription.innerHTML = `<p>${product.description}</p>`;
  }
  
  // Update variants
  const variantsContainer = document.getElementById('variantsContainer');
  
  if (variantsContainer && product.variants && product.variants.length > 0) {
    let variantsHtml = '';
    
    product.variants.forEach((variant, index) => {
      variantsHtml += `
        <div class="variant-option ${index === 0 ? 'active' : ''}" 
             data-variant="${variant.name}" 
             data-price="${variant.price}" 
             onclick="selectVariant(this)">
          ${variant.name}
        </div>
      `;
    });
    
    variantsContainer.innerHTML = variantsHtml;
  }
  
  // Update stock count
  const stockCount = document.getElementById('stockCount');
  
  if (stockCount) {
    stockCount.textContent = `${product.stock} in stock`;
  }
  
  // Update add to cart button
  const addToCartBtn = document.getElementById('addToCartBtn');
  
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.id;
    
    if (product.stock <= 0) {
      addToCartBtn.disabled = true;
      addToCartBtn.innerHTML = '<i class="bi bi-x-circle"></i> Out of Stock';
    }
  }
  
  // Update buy now button
  const buyNowBtn = document.getElementById('buyNowBtn');
  
  if (buyNowBtn) {
    buyNowBtn.disabled = product.stock <= 0;
  }
  
  // Update wishlist button
  const addToWishlistBtn = document.getElementById('addToWishlistBtn');
  
  if (addToWishlistBtn) {
    if (WishlistService.isInWishlist(product.id)) {
      addToWishlistBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Remove from Wishlist';
    } else {
      addToWishlistBtn.innerHTML = '<i class="bi bi-heart"></i> Add to Wishlist';
    }
  }
  
  // Load specifications
  loadSpecifications(product);
  
  // Load features
  loadFeatures(product);
  
  // Load reviews
  loadReviews(product);
  
  // Load related products
  loadRelatedProducts(product);
}

// Load product specifications
function loadSpecifications(product) {
  const specificationsTable = document.getElementById('specificationsTable');
  
  if (!specificationsTable || !product.specifications) return;
  
  let html = '';
  
  for (const [key, value] of Object.entries(product.specifications)) {
    html += `
      <tr>
        <th scope="row">${key}</th>
        <td>${value}</td>
      </tr>
    `;
  }
  
  specificationsTable.innerHTML = html;
}

// Load product features
function loadFeatures(product) {
  const featuresContainer = document.getElementById('featuresContainer');
  
  if (!featuresContainer || !product.features) return;
  
  let html = '<ul class="features-list">';
  
  product.features.forEach(feature => {
    html += `<li>${feature}</li>`;
  });
  
  html += '</ul>';
  
  featuresContainer.innerHTML = html;
}

// Load product reviews
function loadReviews(product) {
  const reviewsList = document.getElementById('reviewsList');
  const overallRating = document.getElementById('overallRating');
  const overallRatingStars = document.getElementById('overallRatingStars');
  const totalReviews = document.getElementById('totalReviews');
  
  if (!reviewsList || !product) return;
  
  // Get reviews for this product
  const productReviews = getProductReviews(product.id);
  
  if (overallRating) {
    overallRating.textContent = product.rating.toFixed(1);
  }
  
  if (overallRatingStars) {
    overallRatingStars.innerHTML = generateStarRating(product.rating);
  }
  
  if (totalReviews) {
    totalReviews.textContent = `Based on ${product.reviewCount} reviews`;
  }
  
  if (productReviews.length === 0) {
    reviewsList.innerHTML = '<p class="text-center">No reviews yet. Be the first to review this product!</p>';
    return;
  }
  
  let html = '';
  
  productReviews.forEach(review => {
    html += `
      <div class="review-item">
        <div class="review-header">
          <div class="review-author-info">
            <img src="${review.user.avatar}" alt="${review.user.name}" class="review-avatar">
            <div>
              <h5 class="mb-0">${review.user.name}</h5>
              <div class="review-rating">
                ${generateStarRating(review.rating)}
              </div>
            </div>
          </div>
          <div class="review-date">
            ${formatDate(review.date)}
          </div>
        </div>
        <h6 class="review-title mt-3">${review.title}</h6>
        <div class="review-content">
          <p>${review.content}</p>
        </div>
        <div class="review-footer d-flex justify-content-between align-items-center mt-3">
          <div>
            <span class="me-2">Was this review helpful?</span>
            <button class="btn btn-sm btn-outline-secondary me-1">
              <i class="bi bi-hand-thumbs-up"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-hand-thumbs-down"></i>
            </button>
          </div>
          <div>
            ${review.verified ? '<span class="badge bg-success"><i class="bi bi-check-circle"></i> Verified Purchase</span>' : ''}
          </div>
        </div>
      </div>
    `;
  });
  
  reviewsList.innerHTML = html;
}

// Load related products
function loadRelatedProducts(product) {
  const relatedProductsContainer = document.getElementById('relatedProductsContainer');
  
  if (!relatedProductsContainer || !product) return;
  
  const relatedProducts = getRelatedProducts(product, 4);
  
  let html = '';
  
  relatedProducts.forEach(relatedProduct => {
    const discountPercentage = calculateDiscountPercentage(relatedProduct.originalPrice, relatedProduct.price);
    
    html += `
      <div class="col-md-6 col-lg-3">
        <div class="product-card">
          <div class="product-image-container">
            <a href="product-detail.html?id=${relatedProduct.id}">
              <img src="${relatedProduct.image}" alt="${relatedProduct.title}" class="product-image">
            </a>
            ${relatedProduct.isNew ? '<span class="product-badge new">New</span>' : ''}
            ${discountPercentage ? `<span class="product-badge sale">-${discountPercentage}%</span>` : ''}
            <div class="product-wishlist" data-id="${relatedProduct.id}">
              <i class="bi bi-heart"></i>
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">${relatedProduct.brand} • ${relatedProduct.category.charAt(0).toUpperCase() + relatedProduct.category.slice(1)}</div>
            <h3 class="product-title">
              <a href="product-detail.html?id=${relatedProduct.id}">${relatedProduct.title}</a>
            </h3>
            <div class="product-rating">
              ${generateStarRating(relatedProduct.rating)}
              <span class="ms-2">(${relatedProduct.reviewCount})</span>
            </div>
            <div class="price-container">
              ${relatedProduct.originalPrice ? `<span class="original-price">${formatCurrency(relatedProduct.originalPrice)}</span>` : ''}
              <span class="current-price">${formatCurrency(relatedProduct.price)}</span>
            </div>
            <button class="btn btn-primary btn-sm add-to-cart-btn mt-2" data-id="${relatedProduct.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  relatedProductsContainer.innerHTML = html;
  
  // Initialize wishlist buttons
  WishlistService.initWishlistButtons();
}

// Switch main product image
function switchImage(src, thumbnail) {
  const mainImage = document.getElementById('mainProductImage');
  const thumbnails = document.querySelectorAll('#thumbnailContainer img');
  
  if (mainImage) {
    mainImage.src = src;
  }
  
  // Remove active class from all thumbnails
  thumbnails.forEach(thumb => {
    thumb.classList.remove('active');
  });
  
  // Add active class to selected thumbnail
  if (thumbnail) {
    thumbnail.classList.add('active');
  }
}

// Select product variant
function selectVariant(element) {
  // Remove active class from all variants
  const variants = document.querySelectorAll('.variant-option');
  variants.forEach(variant => {
    variant.classList.remove('active');
  });
  
  // Add active class to selected variant
  element.classList.add('active');
  
  // Update price if needed
  const price = parseFloat(element.dataset.price);
  const priceContainer = document.getElementById('priceContainer');
  
  if (priceContainer && !isNaN(price)) {
    // Get product ID from URL
    const urlParams = getUrlParams();
    const productId = urlParams.id;
    const product = getProductById(productId);
    
    if (product) {
      let originalPrice = null;
      
      // Calculate original price if there was a discount
      if (product.originalPrice) {
        const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);
        if (discountPercentage) {
          originalPrice = price * (1 + discountPercentage / 100);
        }
      }
      
      priceContainer.innerHTML = `
        ${originalPrice ? `<span class="original-price">${formatCurrency(originalPrice)}</span>` : ''}
        <span class="current-price">${formatCurrency(price)}</span>
      `;
    }
  }
}

// Handle quantity changes
function setupQuantityButtons() {
  const decreaseQuantity = document.getElementById('decreaseQuantity');
  const increaseQuantity = document.getElementById('increaseQuantity');
  const quantityInput = document.getElementById('productQuantity');
  
  if (decreaseQuantity && increaseQuantity && quantityInput) {
    decreaseQuantity.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value, 10) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    increaseQuantity.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value, 10) || 1;
      const maxValue = parseInt(quantityInput.max, 10) || 99;
      
      if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
      }
    });
    
    quantityInput.addEventListener('change', () => {
      const currentValue = parseInt(quantityInput.value, 10);
      const minValue = parseInt(quantityInput.min, 10) || 1;
      const maxValue = parseInt(quantityInput.max, 10) || 99;
      
      if (isNaN(currentValue) || currentValue < minValue) {
        quantityInput.value = minValue;
      } else if (currentValue > maxValue) {
        quantityInput.value = maxValue;
      }
    });
  }
}

// Setup buy now button
function setupBuyNowButton() {
  const buyNowBtn = document.getElementById('buyNowBtn');
  
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get product ID from URL
      const urlParams = getUrlParams();
      const productId = urlParams.id;
      
      if (!productId) return;
      
      // Get quantity
      const quantityInput = document.getElementById('productQuantity');
      const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;
      
      // Get variant
      let variant = null;
      const activeVariant = document.querySelector('.variant-option.active');
      if (activeVariant) {
        const variantName = activeVariant.dataset.variant;
        variant = { name: variantName };
      }
      
      // Add to cart
      const result = CartService.addItem(productId, quantity, variant);
      
      if (result.success) {
        // Redirect to cart page
        window.location.href = 'cart.html';
      } else {
        showToast('Error', result.message);
      }
    });
  }
}

// Setup review form
function setupReviewForm() {
  const ratingStars = document.querySelectorAll('.rating-star');
  const ratingInput = document.getElementById('reviewRating');
  const submitReviewBtn = document.getElementById('submitReviewBtn');
  
  // Setup rating stars
  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating, 10);
      
      if (ratingInput) {
        ratingInput.value = rating;
      }
      
      // Update stars UI
      ratingStars.forEach(s => {
        if (parseInt(s.dataset.rating, 10) <= rating) {
          s.classList.add('active');
          s.classList.remove('bi-star');
          s.classList.add('bi-star-fill');
        } else {
          s.classList.remove('active');
          s.classList.remove('bi-star-fill');
          s.classList.add('bi-star');
        }
      });
    });
    
    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.dataset.rating, 10);
      
      ratingStars.forEach(s => {
        if (parseInt(s.dataset.rating, 10) <= rating) {
          s.classList.add('bi-star-fill');
          s.classList.remove('bi-star');
        } else {
          s.classList.add('bi-star');
          s.classList.remove('bi-star-fill');
        }
      });
    });
    
    star.addEventListener('mouseout', () => {
      const currentRating = parseInt(ratingInput ? ratingInput.value : 0, 10);
      
      ratingStars.forEach(s => {
        if (parseInt(s.dataset.rating, 10) <= currentRating) {
          s.classList.add('bi-star-fill');
          s.classList.remove('bi-star');
        } else {
          s.classList.add('bi-star');
          s.classList.remove('bi-star-fill');
        }
      });
    });
  });
  
  // Submit review
  if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', () => {
      const ratingValue = parseInt(ratingInput ? ratingInput.value : 0, 10);
      const reviewTitle = document.getElementById('reviewTitle').value.trim();
      const reviewContent = document.getElementById('reviewContent').value.trim();
      const reviewName = document.getElementById('reviewName').value.trim();
      const reviewEmail = document.getElementById('reviewEmail').value.trim();
      const reviewConsent = document.getElementById('reviewConsent').checked;
      
      // Validate form
      if (ratingValue === 0) {
        showToast('Error', 'Please select a rating');
        return;
      }
      
      if (!reviewTitle) {
        showToast('Error', 'Please enter a review title');
        return;
      }
      
      if (!reviewContent) {
        showToast('Error', 'Please enter your review');
        return;
      }
      
      if (!reviewName) {
        showToast('Error', 'Please enter your name');
        return;
      }
      
      if (!reviewEmail || !isValidEmail(reviewEmail)) {
        showToast('Error', 'Please enter a valid email');
        return;
      }
      
      if (!reviewConsent) {
        showToast('Error', 'Please agree to the privacy policy');
        return;
      }
      
      // In a real app, this would submit to a server
      // Here we'll just show a success message
      showToast('Thank You', 'Your review has been submitted and is pending approval');
      
      // Close modal
      const reviewModal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
      if (reviewModal) {
        reviewModal.hide();
      }
      
      // Reset form
      document.getElementById('reviewForm').reset();
      ratingInput.value = 0;
      
      // Reset stars
      ratingStars.forEach(s => {
        s.classList.remove('active');
        s.classList.remove('bi-star-fill');
        s.classList.add('bi-star');
      });
    });
  }
}

// Initialize product detail page
docReady(() => {
  // Load product details
  loadProductDetails();
  
  // Setup quantity buttons
  setupQuantityButtons();
  
  // Setup buy now button
  setupBuyNowButton();
  
  // Setup review form
  setupReviewForm();
  
  // Make switchImage and selectVariant functions global
  window.switchImage = switchImage;
  window.selectVariant = selectVariant;
});