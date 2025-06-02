/**
 * Shopping Cart Module for TechPulse E-commerce
 */

// Cart item data structure
class CartItem {
  constructor(productId, quantity = 1, variant = null) {
    this.id = generateId();
    this.productId = productId;
    this.quantity = quantity;
    this.variant = variant;
    this.added = new Date().toISOString();
  }
}

// Shopping cart service
const CartService = {
  items: [], // Cart items
  couponCode: null, // Applied coupon code
  
  // Initialize the cart
  init() {
    // Load cart from local storage
    const storedCart = getFromLocalStorage('cart');
    if (storedCart) {
      this.items = storedCart.items || [];
      this.couponCode = storedCart.couponCode || null;
    }
    
    // Update cart count badge
    this.updateCartCount();
  },
  
  // Save cart to local storage
  saveCart() {
    const cart = {
      items: this.items,
      couponCode: this.couponCode
    };
    
    saveToLocalStorage('cart', cart);
    this.updateCartCount();
  },
  
  // Add item to cart
  addItem(productId, quantity = 1, variant = null) {
    const product = getProductById(productId);
    
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    
    // Check if product is in stock
    if (product.stock < quantity) {
      return { success: false, message: 'Not enough stock available' };
    }
    
    // Check if item already exists in cart
    const existingItemIndex = this.items.findIndex(item => 
      item.productId === productId && 
      ((!item.variant && !variant) || (item.variant?.name === variant?.name))
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      this.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const newItem = new CartItem(productId, quantity, variant);
      this.items.push(newItem);
    }
    
    this.saveCart();
    
    return { success: true, message: 'Item added to cart', cartCount: this.getItemCount() };
  },
  
  // Update item quantity
  updateItemQuantity(itemId, quantity) {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return { success: false, message: 'Item not found in cart' };
    }
    
    const productId = this.items[itemIndex].productId;
    const product = getProductById(productId);
    
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    
    // Check if product is in stock
    if (product.stock < quantity) {
      return { success: false, message: 'Not enough stock available' };
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      this.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      this.items[itemIndex].quantity = quantity;
    }
    
    this.saveCart();
    
    return { success: true, message: 'Cart updated' };
  },
  
  // Remove item from cart
  removeItem(itemId) {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return { success: false, message: 'Item not found in cart' };
    }
    
    this.items.splice(itemIndex, 1);
    this.saveCart();
    
    return { success: true, message: 'Item removed from cart' };
  },
  
  // Clear all items from cart
  clearCart() {
    this.items = [];
    this.couponCode = null;
    this.saveCart();
    
    return { success: true, message: 'Cart cleared' };
  },
  
  // Apply coupon code
  applyCoupon(code) {
    this.couponCode = code;
    this.saveCart();
    
    return { success: true, message: 'Coupon applied' };
  },
  
  // Remove coupon code
  removeCoupon() {
    this.couponCode = null;
    this.saveCart();
    
    return { success: true, message: 'Coupon removed' };
  },
  
  // Get all cart items with product details
  getCartItems() {
    return this.items.map(item => {
      const product = getProductById(item.productId);
      
      if (!product) return null;
      
      // Calculate price based on variant
      let price = product.price;
      let originalPrice = product.originalPrice;
      
      if (item.variant) {
        const variant = product.variants.find(v => v.name === item.variant.name);
        if (variant) {
          price = variant.price;
          // Assume same discount percentage for variants
          if (originalPrice) {
            const discountPercentage = calculateDiscountPercentage(originalPrice, product.price);
            if (discountPercentage) {
              originalPrice = price * (1 + discountPercentage / 100);
            } else {
              originalPrice = null;
            }
          }
        }
      }
      
      return {
        id: item.id,
        productId: product.id,
        title: product.title,
        brand: product.brand,
        image: product.image,
        price,
        originalPrice,
        quantity: item.quantity,
        variant: item.variant,
        subtotal: price * item.quantity,
        stock: product.stock
      };
    }).filter(Boolean); // Remove null items (if product not found)
  },
  
  // Get total number of items in cart
  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },
  
  // Get cart subtotal
  getSubtotal() {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.subtotal, 0);
  },
  
  // Get tax amount (assuming 8% tax rate)
  getTax() {
    return this.getSubtotal() * 0.08;
  },
  
  // Get shipping cost (free shipping over $100, otherwise $9.99)
  getShipping() {
    // Check for free shipping coupon
    if (this.couponCode) {
      const couponResult = applyCoupon(this.couponCode, this.getSubtotal());
      if (couponResult.valid && couponResult.freeShipping) {
        return 0;
      }
    }
    
    return this.getSubtotal() >= 100 ? 0 : 9.99;
  },
  
  // Get discount amount based on coupon
  getDiscount() {
    if (!this.couponCode) return 0;
    
    const couponResult = applyCoupon(this.couponCode, this.getSubtotal());
    return couponResult.valid ? couponResult.discount : 0;
  },
  
  // Get cart total
  getTotal() {
    return this.getSubtotal() + this.getTax() + this.getShipping() - this.getDiscount();
  },
  
  // Check if cart is empty
  isEmpty() {
    return this.items.length === 0;
  },
  
  // Get cart summary
  getCartSummary() {
    return {
      items: this.getCartItems(),
      itemCount: this.getItemCount(),
      subtotal: this.getSubtotal(),
      tax: this.getTax(),
      shipping: this.getShipping(),
      discount: this.getDiscount(),
      total: this.getTotal(),
      couponCode: this.couponCode
    };
  },
  
  // Update cart count badge in UI
  updateCartCount() {
    const cartCountBadges = document.querySelectorAll('#cartCount');
    const itemCount = this.getItemCount();
    
    cartCountBadges.forEach(badge => {
      badge.textContent = itemCount.toString();
      
      // Show/hide badge based on count
      if (itemCount > 0) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }
};

// Initialize cart when document is ready
docReady(() => {
  CartService.init();
  
  // Add to cart functionality for buttons with data-id attribute
  document.addEventListener('click', function(event) {
    // Check if clicked element has data-id attribute
    const addToCartBtn = event.target.closest('.add-to-cart-btn');
    
    if (addToCartBtn && addToCartBtn.dataset.id) {
      event.preventDefault();
      const productId = addToCartBtn.dataset.id;
      
      // Get quantity if available
      let quantity = 1;
      const quantityInput = document.getElementById('productQuantity');
      if (quantityInput) {
        quantity = parseInt(quantityInput.value, 10) || 1;
      }
      
      // Get variant if available
      let variant = null;
      const activeVariant = document.querySelector('.variant-option.active');
      if (activeVariant) {
        const variantName = activeVariant.dataset.variant;
        variant = { name: variantName };
      }
      
      // Add to cart
      const result = CartService.addItem(productId, quantity, variant);
      
      if (result.success) {
        showToast('Added to Cart', result.message);
      } else {
        showToast('Error', result.message);
      }
    }
  });
});