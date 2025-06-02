/**
 * Products Page JavaScript for TechPulse E-commerce
 */

// Current filters and pagination state
let currentFilters = {
  category: '',
  brands: [],
  minPrice: null,
  maxPrice: null,
  minRating: null,
  inStock: false,
  search: ''
};

let currentSort = 'featured';
let currentPage = 1;
const itemsPerPage = 12;
let viewMode = 'grid'; // 'grid' or 'list'

// Initialize products page
function initProductsPage() {
  // Get URL parameters
  const urlParams = getUrlParams();
  
  // Set initial category from URL if present
  if (urlParams.category) {
    currentFilters.category = urlParams.category;
    
    // Check corresponding checkbox
    const categoryCheckbox = document.getElementById(`category${urlParams.category.charAt(0).toUpperCase() + urlParams.category.slice(1)}`);
    if (categoryCheckbox) {
      categoryCheckbox.checked = true;
    }
    
    // Update category title
    updateCategoryTitle(urlParams.category);
  }
  
  // Set initial search from URL if present
  if (urlParams.search) {
    currentFilters.search = urlParams.search;
    
    // Update search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = urlParams.search;
    }
    
    // Update category title for search
    updateCategoryTitle(null, urlParams.search);
  }
  
  // Load products
  loadProducts();
  
  // Initialize filter event listeners
  initFilters();
  
  // Initialize sorting
  initSorting();
  
  // Initialize view mode
  initViewMode();
  
  // Load recently viewed products
  loadRecentlyViewed();
}

// Update category title and breadcrumb
function updateCategoryTitle(category, searchTerm) {
  const categoryTitle = document.getElementById('categoryTitle');
  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  
  if (categoryTitle) {
    if (searchTerm) {
      categoryTitle.textContent = `Search Results for "${searchTerm}"`;
    } else if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      categoryTitle.textContent = categoryName;
    } else {
      categoryTitle.textContent = 'All Products';
    }
  }
  
  if (breadcrumbCategory) {
    if (searchTerm) {
      breadcrumbCategory.textContent = 'Search Results';
    } else if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      breadcrumbCategory.textContent = categoryName;
    } else {
      breadcrumbCategory.textContent = 'Products';
    }
  }
}

// Load products with current filters and sorting
function loadProducts() {
  const productsContainer = document.getElementById('productsContainer');
  if (!productsContainer) return;
  
  // Apply filters
  let filteredProducts = filterProducts(data.products, currentFilters);
  
  // Sort products
  filteredProducts = sortProducts(filteredProducts, currentSort);
  
  // Update product count
  updateProductCount(filteredProducts.length);
  
  // Paginate products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Generate HTML for products
  let html = '';
  
  if (paginatedProducts.length === 0) {
    html = '<div class="col-12"><p class="text-center">No products found matching your criteria.</p></div>';
  } else {
    paginatedProducts.forEach(product => {
      const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);
      
      if (viewMode === 'grid') {
        html += `
          <div class="col-md-6 col-lg-4 col-xl-3">
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
                  <a href="#" class="product-action-btn" data-bs-toggle="modal" data-bs-target="#quickViewModal" 
                     onclick="openQuickView('${product.id}')" title="Quick View">
                    <i class="bi bi-arrows-fullscreen"></i>
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
                <button class="btn btn-primary btn-sm add-to-cart-btn mt-2" data-id="${product.id}" ${!isInStock(product) ? 'disabled' : ''}>
                  <i class="bi bi-cart-plus"></i> ${isInStock(product) ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        `;
      } else {
        // List view
        html += `
          <div class="col-12 mb-3">
            <div class="product-card list-view">
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
              </div>
              <div class="product-info p-3">
                <div class="product-category">${product.brand} • ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-title">
                  <a href="product-detail.html?id=${product.id}">${product.title}</a>
                </h3>
                <div class="product-rating">
                  ${generateStarRating(product.rating)}
                  <span class="ms-2">(${product.reviewCount})</span>
                </div>
                <p class="product-description">${truncateText(product.description, 150)}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="price-container">
                    ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
                    <span class="current-price">${formatCurrency(product.price)}</span>
                  </div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" ${!isInStock(product) ? 'disabled' : ''}>
                      <i class="bi bi-cart-plus"></i> ${isInStock(product) ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#quickViewModal" 
                            onclick="openQuickView('${product.id}')">
                      <i class="bi bi-eye"></i> Quick View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });
  }
  
  productsContainer.innerHTML = html;
  
  // Update pagination
  updatePagination(filteredProducts.length);
  
  // Initialize wishlist buttons
  WishlistService.initWishlistButtons();
}

// Update product count display
function updateProductCount(total) {
  const productsShown = document.getElementById('productsShown');
  const totalProducts = document.getElementById('totalProducts');
  
  if (productsShown && totalProducts) {
    const start = Math.min((currentPage - 1) * itemsPerPage + 1, total);
    const end = Math.min(currentPage * itemsPerPage, total);
    
    productsShown.textContent = total > 0 ? `${start}-${end}` : '0';
    totalProducts.textContent = total.toString();
  }
}

// Update pagination controls
function updatePagination(totalItems) {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  let html = '';
  
  // Previous button
  html += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;
  
  // Page numbers
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust start page if end page is maxed out
  startPage = Math.max(1, endPage - maxVisiblePages + 1);
  
  // First page
  if (startPage > 1) {
    html += `
      <li class="page-item">
        <a class="page-link" href="#" data-page="1">1</a>
      </li>
    `;
    
    if (startPage > 2) {
      html += `
        <li class="page-item disabled">
          <a class="page-link" href="#">...</a>
        </li>
      `;
    }
  }
  
  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    html += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
  }
  
  // Last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `
        <li class="page-item disabled">
          <a class="page-link" href="#">...</a>
        </li>
      `;
    }
    
    html += `
      <li class="page-item">
        <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
      </li>
    `;
  }
  
  // Next button
  html += `
    <li class="page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
  
  pagination.innerHTML = html;
  
  // Add event listeners to pagination links
  const pageLinks = pagination.querySelectorAll('.page-link');
  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const page = parseInt(link.dataset.page, 10);
      
      if (!isNaN(page) && page !== currentPage && page > 0 && page <= totalPages) {
        currentPage = page;
        loadProducts();
        // Scroll to top of products
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Initialize filter event listeners
function initFilters() {
  // Category filters
  const categoryFilters = document.querySelectorAll('.category-filter');
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      if (filter.checked) {
        // Uncheck other category filters
        categoryFilters.forEach(f => {
          if (f !== filter) f.checked = false;
        });
        
        currentFilters.category = filter.value;
      } else {
        currentFilters.category = '';
      }
      
      updateCategoryTitle(currentFilters.category);
      currentPage = 1;
      loadProducts();
    });
  });
  
  // Brand filters
  const brandFilters = document.querySelectorAll('.brand-filter');
  brandFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      currentFilters.brands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(f => f.value);
      currentPage = 1;
      loadProducts();
    });
  });
  
  // Price range filters
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const minPriceRange = document.getElementById('minPriceRange');
  
  if (minPriceInput && maxPriceInput) {
    // Initialize price range
    minPriceInput.addEventListener('change', () => {
      currentFilters.minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null;
      currentPage = 1;
      loadProducts();
    });
    
    maxPriceInput.addEventListener('change', () => {
      currentFilters.maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null;
      currentPage = 1;
      loadProducts();
    });
    
    // Price range slider
    if (minPriceRange) {
      minPriceRange.addEventListener('input', () => {
        const value = parseInt(minPriceRange.value, 10);
        minPriceInput.value = value;
        currentFilters.minPrice = value;
        currentPage = 1;
        loadProducts();
      });
    }
  }
  
  // Rating filters
  const ratingFilters = document.querySelectorAll('.rating-filter');
  ratingFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      // Get highest checked rating
      const checkedRatings = Array.from(document.querySelectorAll('.rating-filter:checked'));
      if (checkedRatings.length > 0) {
        currentFilters.minRating = Math.min(...checkedRatings.map(f => parseFloat(f.value)));
      } else {
        currentFilters.minRating = null;
      }
      
      currentPage = 1;
      loadProducts();
    });
  });
  
  // Availability filters
  const availabilityFilters = document.querySelectorAll('.availability-filter');
  availabilityFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      if (filter.value === 'inStock' && filter.checked) {
        currentFilters.inStock = true;
      } else {
        currentFilters.inStock = false;
      }
      
      currentPage = 1;
      loadProducts();
    });
  });
  
  // Clear all filters
  const clearFiltersBtn = document.getElementById('clearFilters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      // Reset filter UI
      document.querySelectorAll('.category-filter, .brand-filter, .rating-filter, .availability-filter').forEach(filter => {
        filter.checked = false;
      });
      
      if (minPriceInput) minPriceInput.value = '';
      if (maxPriceInput) maxPriceInput.value = '';
      if (minPriceRange) minPriceRange.value = 0;
      
      // Reset filter state
      currentFilters = {
        category: '',
        brands: [],
        minPrice: null,
        maxPrice: null,
        minRating: null,
        inStock: false,
        search: currentFilters.search // Preserve search term
      };
      
      updateCategoryTitle(null, currentFilters.search);
      currentPage = 1;
      loadProducts();
    });
  }
}

// Initialize sorting
function initSorting() {
  const sortOptions = document.getElementById('sortOptions');
  
  if (sortOptions) {
    sortOptions.addEventListener('change', () => {
      currentSort = sortOptions.value;
      currentPage = 1;
      loadProducts();
    });
  }
}

// Initialize view mode
function initViewMode() {
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  
  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      viewMode = 'grid';
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      loadProducts();
    });
    
    listViewBtn.addEventListener('click', () => {
      viewMode = 'list';
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      loadProducts();
    });
  }
}

// Load recently viewed products
function loadRecentlyViewed() {
  const container = document.getElementById('recentlyViewedContainer');
  if (!container) return;
  
  const recentProducts = getRecentlyViewedProducts(4);
  
  if (recentProducts.length === 0) {
    container.closest('section').style.display = 'none';
    return;
  }
  
  let html = '';
  
  recentProducts.forEach(product => {
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
            <div class="product-wishlist" data-id="${product.id}">
              <i class="bi bi-heart"></i>
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

// Quick view modal functionality
function openQuickView(productId) {
  const product = getProductById(productId);
  
  if (!product) return;
  
  // Update modal content
  const quickViewTitle = document.getElementById('quickViewTitle');
  const quickViewImage = document.getElementById('quickViewImage');
  const quickViewRating = document.getElementById('quickViewRating');
  const quickViewPrice = document.getElementById('quickViewPrice');
  const quickViewAvailability = document.getElementById('quickViewAvailability');
  const quickViewDescription = document.getElementById('quickViewDescription');
  const quickViewAddToCart = document.getElementById('quickViewAddToCart');
  const quickViewDetailsLink = document.getElementById('quickViewDetailsLink');
  
  if (quickViewTitle) quickViewTitle.textContent = product.title;
  if (quickViewImage) {
    quickViewImage.src = product.image;
    quickViewImage.alt = product.title;
  }
  
  if (quickViewRating) {
    quickViewRating.innerHTML = `
      ${generateStarRating(product.rating)}
      <span class="ms-2">(${product.reviewCount} reviews)</span>
    `;
  }
  
  if (quickViewPrice) {
    const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);
    
    quickViewPrice.innerHTML = `
      ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
      <span class="current-price">${formatCurrency(product.price)}</span>
      ${discountPercentage ? `<span class="ms-2 text-danger">-${discountPercentage}% Off</span>` : ''}
    `;
  }
  
  if (quickViewAvailability) {
    const stockStatus = getStockStatus(product);
    quickViewAvailability.innerHTML = `
      <p class="mb-0">
        Availability: <span class="${stockStatus.class}">${stockStatus.text}</span>
      </p>
    `;
  }
  
  if (quickViewDescription) {
    quickViewDescription.textContent = product.description;
  }
  
  if (quickViewAddToCart) {
    quickViewAddToCart.dataset.id = product.id;
    
    if (!isInStock(product)) {
      quickViewAddToCart.disabled = true;
      quickViewAddToCart.innerHTML = '<i class="bi bi-x-circle"></i> Out of Stock';
    } else {
      quickViewAddToCart.disabled = false;
      quickViewAddToCart.innerHTML = '<i class="bi bi-cart-plus"></i> Add to Cart';
    }
  }
  
  if (quickViewDetailsLink) {
    quickViewDetailsLink.href = `product-detail.html?id=${product.id}`;
  }
  
  // Setup quantity buttons
  const quickViewDecreaseBtn = document.getElementById('quickViewDecreaseBtn');
  const quickViewIncreaseBtn = document.getElementById('quickViewIncreaseBtn');
  const quickViewQuantity = document.getElementById('quickViewQuantity');
  
  if (quickViewDecreaseBtn && quickViewIncreaseBtn && quickViewQuantity) {
    quickViewDecreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quickViewQuantity.value, 10) || 1;
      if (currentValue > 1) {
        quickViewQuantity.value = currentValue - 1;
      }
    });
    
    quickViewIncreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quickViewQuantity.value, 10) || 1;
      const maxValue = product.stock || 99;
      
      if (currentValue < maxValue) {
        quickViewQuantity.value = currentValue + 1;
      }
    });
  }
  
  // Setup add to cart button
  if (quickViewAddToCart) {
    quickViewAddToCart.addEventListener('click', () => {
      if (!isInStock(product)) return;
      
      const quantity = parseInt(quickViewQuantity?.value || 1, 10);
      const result = CartService.addItem(product.id, quantity);
      
      if (result.success) {
        showToast('Added to Cart', result.message);
        
        // Close modal
        const quickViewModal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
        if (quickViewModal) {
          quickViewModal.hide();
        }
      } else {
        showToast('Error', result.message);
      }
    });
  }
  
  // Setup add to wishlist button
  const quickViewAddToWishlist = document.getElementById('quickViewAddToWishlist');
  
  if (quickViewAddToWishlist) {
    // Update button text based on wishlist status
    if (WishlistService.isInWishlist(product.id)) {
      quickViewAddToWishlist.innerHTML = '<i class="bi bi-heart-fill"></i> Remove from Wishlist';
    } else {
      quickViewAddToWishlist.innerHTML = '<i class="bi bi-heart"></i> Add to Wishlist';
    }
    
    quickViewAddToWishlist.addEventListener('click', () => {
      const result = WishlistService.toggleItem(product.id);
      
      if (result.success) {
        if (WishlistService.isInWishlist(product.id)) {
          quickViewAddToWishlist.innerHTML = '<i class="bi bi-heart-fill"></i> Remove from Wishlist';
          showToast('Wishlist', 'Item added to wishlist');
        } else {
          quickViewAddToWishlist.innerHTML = '<i class="bi bi-heart"></i> Add to Wishlist';
          showToast('Wishlist', 'Item removed from wishlist');
        }
      }
    });
  }
}

// Initialize products page when document is ready
docReady(() => {
  initProductsPage();
  
  // Make openQuickView function global
  window.openQuickView = openQuickView;
});