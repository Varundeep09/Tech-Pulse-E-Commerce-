/**
 * Cart Page JavaScript for TechPulse E-commerce
 */

// Render cart items
function renderCartItems() {
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartContent = document.getElementById('cartContent');
  
  if (!cartItemsList || !cartEmptyState || !cartContent) return;
  
  const cartItems = CartService.getCartItems();
  
  if (cartItems.length === 0) {
    // Show empty state
    cartEmptyState.style.display = 'block';
    cartContent.style.display = 'none';
    return;
  }
  
  // Show cart content
  cartEmptyState.style.display = 'none';
  cartContent.style.display = 'block';
  
  // Generate HTML for cart items
  let html = '';
  
  cartItems.forEach(item => {
    html += `
      <div class="cart-item" data-id="${item.id}">
        <div class="form-check">
          <input class="form-check-input item-checkbox" type="checkbox" value="${item.id}">
        </div>
        <a href="product-detail.html?id=${item.productId}" class="me-3">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        </a>
        <div class="cart-item-details">
          <h5 class="cart-item-title">
            <a href="product-detail.html?id=${item.productId}">${item.title}</a>
          </h5>
          ${item.variant ? `<div class="cart-item-variant">Variant: ${item.variant.name}</div>` : ''}
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
        </div>
        <div class="input-group" style="width: 130px;">
          <button class="btn btn-outline-secondary quantity-btn decrease-quantity" type="button">-</button>
          <input type="number" class="form-control text-center item-quantity" value="${item.quantity}" min="1" max="${item.stock}">
          <button class="btn btn-outline-secondary quantity-btn increase-quantity" type="button">+</button>
        </div>
        <div class="cart-item-subtotal ms-4 me-3">
          ${formatCurrency(item.subtotal)}
        </div>
        <button class="btn btn-sm btn-outline-danger remove-item">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });
  
  cartItemsList.innerHTML = html;
  
  // Update order summary
  updateOrderSummary();
  
  // Add event listeners
  addCartItemEventListeners();
}

// Update order summary
function updateOrderSummary() {
  const itemCount = document.getElementById('itemCount');
  const subtotal = document.getElementById('subtotal');
  const shipping = document.getElementById('shipping');
  const tax = document.getElementById('tax');
  const discount = document.getElementById('discount');
  const discountRow = document.getElementById('discountRow');
  const total = document.getElementById('total');
  
  if (!itemCount || !subtotal || !shipping || !tax || !total) return;
  
  const summary = CartService.getCartSummary();
  
  itemCount.textContent = summary.itemCount;
  subtotal.textContent = formatCurrency(summary.subtotal);
  shipping.textContent = formatCurrency(summary.shipping);
  tax.textContent = formatCurrency(summary.tax);
  
  if (summary.discount > 0 && discount && discountRow) {
    discount.textContent = `-${formatCurrency(summary.discount)}`;
    discountRow.style.display = 'flex';
  } else if (discountRow) {
    discountRow.style.display = 'none';
  }
  
  total.textContent = formatCurrency(summary.total);
  
  // Update checkout button state
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    if (summary.itemCount > 0) {
      checkoutBtn.classList.remove('disabled');
    } else {
      checkoutBtn.classList.add('disabled');
    }
  }
}

// Add event listeners to cart items
function addCartItemEventListeners() {
  // Quantity change
  const quantityInputs = document.querySelectorAll('.item-quantity');
  quantityInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const itemId = cartItem.dataset.id;
      const quantity = parseInt(e.target.value, 10);
      
      const result = CartService.updateItemQuantity(itemId, quantity);
      
      if (result.success) {
        renderCartItems();
      } else {
        showToast('Error', result.message);
        renderCartItems(); // Reset UI
      }
    });
  });
  
  // Decrease quantity
  const decreaseButtons = document.querySelectorAll('.decrease-quantity');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const itemId = cartItem.dataset.id;
      const quantityInput = cartItem.querySelector('.item-quantity');
      const currentQuantity = parseInt(quantityInput.value, 10);
      
      if (currentQuantity > 1) {
        const result = CartService.updateItemQuantity(itemId, currentQuantity - 1);
        
        if (result.success) {
          renderCartItems();
        } else {
          showToast('Error', result.message);
        }
      } else {
        // Confirm removal if quantity would be 0
        if (confirm('Remove this item from the cart?')) {
          const result = CartService.removeItem(itemId);
          
          if (result.success) {
            renderCartItems();
            showToast('Cart Updated', 'Item removed from cart');
          }
        }
      }
    });
  });
  
  // Increase quantity
  const increaseButtons = document.querySelectorAll('.increase-quantity');
  increaseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const itemId = cartItem.dataset.id;
      const quantityInput = cartItem.querySelector('.item-quantity');
      const currentQuantity = parseInt(quantityInput.value, 10);
      
      const result = CartService.updateItemQuantity(itemId, currentQuantity + 1);
      
      if (result.success) {
        renderCartItems();
      } else {
        showToast('Error', result.message);
      }
    });
  });
  
  // Remove item
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const itemId = cartItem.dataset.id;
      
      const result = CartService.removeItem(itemId);
      
      if (result.success) {
        renderCartItems();
        showToast('Cart Updated', 'Item removed from cart');
      }
    });
  });
  
  // Select all items
  const selectAllCheckbox = document.getElementById('selectAllItems');
  const itemCheckboxes = document.querySelectorAll('.item-checkbox');
  
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      
      itemCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
    });
  }
  
  // Individual checkboxes
  itemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // Check if all checkboxes are checked
      const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
      
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
      }
    });
  });
}

// Load recommended products
function loadRecommendedProducts() {
  const container = document.getElementById('recommendedProductsContainer');
  if (!container) return;
  
  // Get cart items to exclude them from recommendations
  const cartItems = CartService.getCartItems();
  const cartProductIds = cartItems.map(item => item.productId);
  
  // Get recommendations (featured products not in cart)
  const recommendedProducts = data.products
    .filter(product => !cartProductIds.includes(product.id) && (product.isFeatured || product.isBestSeller))
    .slice(0, 4);
  
  let html = '';
  
  recommendedProducts.forEach(product => {
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

// Initialize cart page
docReady(() => {
  // Render cart
  renderCartItems();
  
  // Load recommended products
  loadRecommendedProducts();
  
  // Clear cart functionality
  const clearCartBtn = document.getElementById('clearCartBtn');
  const confirmClearCartBtn = document.getElementById('confirmClearCartBtn');
  
  if (clearCartBtn && confirmClearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      const clearCartModal = new bootstrap.Modal(document.getElementById('clearCartModal'));
      clearCartModal.show();
    });
    
    confirmClearCartBtn.addEventListener('click', () => {
      const result = CartService.clearCart();
      
      if (result.success) {
        renderCartItems();
        showToast('Cart Cleared', 'All items have been removed from your cart');
        
        // Hide modal
        const clearCartModal = bootstrap.Modal.getInstance(document.getElementById('clearCartModal'));
        if (clearCartModal) {
          clearCartModal.hide();
        }
      }
    });
  }
  
  // Remove selected items
  const removeSelectedBtn = document.getElementById('removeSelectedBtn');
  const confirmRemoveSelectedBtn = document.getElementById('confirmRemoveSelectedBtn');
  
  if (removeSelectedBtn && confirmRemoveSelectedBtn) {
    removeSelectedBtn.addEventListener('click', () => {
      const selectedItems = document.querySelectorAll('.item-checkbox:checked');
      
      if (selectedItems.length === 0) {
        showToast('Error', 'No items selected');
        return;
      }
      
      const removeSelectedModal = new bootstrap.Modal(document.getElementById('removeSelectedModal'));
      removeSelectedModal.show();
    });
    
    confirmRemoveSelectedBtn.addEventListener('click', () => {
      const selectedItems = document.querySelectorAll('.item-checkbox:checked');
      let removed = 0;
      
      selectedItems.forEach(checkbox => {
        const itemId = checkbox.value;
        const result = CartService.removeItem(itemId);
        
        if (result.success) {
          removed++;
        }
      });
      
      if (removed > 0) {
        renderCartItems();
        showToast('Cart Updated', `${removed} item${removed > 1 ? 's' : ''} removed from your cart`);
      }
      
      // Hide modal
      const removeSelectedModal = bootstrap.Modal.getInstance(document.getElementById('removeSelectedModal'));
      if (removeSelectedModal) {
        removeSelectedModal.hide();
      }
    });
  }
  
  // Apply promo code
  const promoInput = document.getElementById('promoInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoMessage = document.getElementById('promoMessage');
  
  if (promoInput && applyPromoBtn && promoMessage) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim();
      
      if (!code) {
        promoMessage.textContent = 'Please enter a promo code';
        promoMessage.className = 'form-text text-danger mt-2';
        promoMessage.style.display = 'block';
        return;
      }
      
      const subtotal = CartService.getSubtotal();
      const result = applyCoupon(code, subtotal);
      
      if (result.valid) {
        CartService.applyCoupon(code);
        promoMessage.textContent = result.message;
        promoMessage.className = 'form-text text-success mt-2';
        updateOrderSummary();
      } else {
        promoMessage.textContent = result.message;
        promoMessage.className = 'form-text text-danger mt-2';
      }
      
      promoMessage.style.display = 'block';
    });
  }
  
  // Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      if (CartService.isEmpty()) {
        e.preventDefault();
        showToast('Error', 'Your cart is empty');
      } else if (!AuthService.isLoggedIn()) {
        e.preventDefault();
        showToast('Login Required', 'Please login to proceed to checkout');
        
        // Redirect to login page after a delay
        setTimeout(() => {
          window.location.href = 'login.html?redirect=checkout';
        }, 1500);
      }
      // Otherwise, proceed to checkout
    });
  }
});