/**
 * Wishlist Module for TechPulse E-commerce
 */

// Wishlist service
const WishlistService = {
  items: [], // Wishlist items (product IDs)
  
  // Initialize the wishlist
  init() {
    // Load wishlist from local storage
    const storedWishlist = getFromLocalStorage('wishlist');
    if (storedWishlist) {
      this.items = storedWishlist;
    }
    
    // Update wishlist count badge
    this.updateWishlistCount();
    
    // Initialize wishlist buttons
    this.initWishlistButtons();
  },
  
  // Save wishlist to local storage
  saveWishlist() {
    saveToLocalStorage('wishlist', this.items);
    this.updateWishlistCount();
  },
  
  // Add item to wishlist
  addItem(productId) {
    if (!this.items.includes(productId)) {
      this.items.push(productId);
      this.saveWishlist();
      return { success: true, message: 'Item added to wishlist' };
    }
    
    return { success: false, message: 'Item already in wishlist' };
  },
  
  // Remove item from wishlist
  removeItem(productId) {
    const index = this.items.indexOf(productId);
    
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveWishlist();
      return { success: true, message: 'Item removed from wishlist' };
    }
    
    return { success: false, message: 'Item not found in wishlist' };
  },
  
  // Toggle item in wishlist (add if not present, remove if present)
  toggleItem(productId) {
    if (this.isInWishlist(productId)) {
      return this.removeItem(productId);
    } else {
      return this.addItem(productId);
    }
  },
  
  // Clear all items from wishlist
  clearWishlist() {
    this.items = [];
    this.saveWishlist();
    
    return { success: true, message: 'Wishlist cleared' };
  },
  
  // Check if product is in wishlist
  isInWishlist(productId) {
    return this.items.includes(productId);
  },
  
  // Get all wishlist items with product details
  getWishlistItems() {
    return this.items.map(productId => getProductById(productId)).filter(Boolean);
  },
  
  // Get wishlist count
  getItemCount() {
    return this.items.length;
  },
  
  // Update wishlist count badge in UI
  updateWishlistCount() {
    const wishlistCountBadges = document.querySelectorAll('#wishlistCount');
    const itemCount = this.getItemCount();
    
    wishlistCountBadges.forEach(badge => {
      badge.textContent = itemCount.toString();
      
      // Show/hide badge based on count
      if (itemCount > 0) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  },
  
  // Initialize wishlist buttons
  initWishlistButtons() {
    // Update wishlist button states
    const wishlistButtons = document.querySelectorAll('.product-wishlist');
    
    wishlistButtons.forEach(button => {
      const productId = button.dataset.id;
      
      if (productId) {
        // Set initial state
        if (this.isInWishlist(productId)) {
          button.classList.add('active');
          button.innerHTML = '<i class="bi bi-heart-fill"></i>';
        } else {
          button.classList.remove('active');
          button.innerHTML = '<i class="bi bi-heart"></i>';
        }
        
        // Add click event listener
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const result = this.toggleItem(productId);
          
          if (result.success) {
            if (this.isInWishlist(productId)) {
              button.classList.add('active');
              button.innerHTML = '<i class="bi bi-heart-fill"></i>';
              showToast('Wishlist', 'Item added to wishlist');
            } else {
              button.classList.remove('active');
              button.innerHTML = '<i class="bi bi-heart"></i>';
              showToast('Wishlist', 'Item removed from wishlist');
            }
          }
        });
      }
    });
  }
};

// Initialize wishlist when document is ready
docReady(() => {
  WishlistService.init();
  
  // Add event listener for standalone wishlist buttons
  document.addEventListener('click', function(event) {
    const addToWishlistBtn = event.target.closest('#addToWishlistBtn');
    
    if (addToWishlistBtn) {
      event.preventDefault();
      
      // Get product ID from URL
      const urlParams = getUrlParams();
      const productId = urlParams.id;
      
      if (productId) {
        const result = WishlistService.toggleItem(productId);
        
        // Update button text/icon
        if (WishlistService.isInWishlist(productId)) {
          addToWishlistBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Remove from Wishlist';
          showToast('Wishlist', 'Item added to wishlist');
        } else {
          addToWishlistBtn.innerHTML = '<i class="bi bi-heart"></i> Add to Wishlist';
          showToast('Wishlist', 'Item removed from wishlist');
        }
      }
    }
  });
});