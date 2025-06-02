/**
 * Authentication Module for TechPulse E-commerce
 */

// User data structure
class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // In a real app, never store plain text passwords
    this.created = new Date().toISOString();
    this.addresses = [];
    this.orders = [];
  }
}

// Address data structure
class Address {
  constructor(id, name, street, city, state, zipCode, country, isDefault = false) {
    this.id = id;
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.isDefault = isDefault;
  }
}

// Authentication service
const AuthService = {
  users: [], // In-memory store of users (would be a database in a real app)
  currentUser: null,
  
  // Initialize the auth service
  init() {
    // Load users from local storage
    const storedUsers = getFromLocalStorage('users');
    if (storedUsers) {
      this.users = storedUsers;
    }
    
    // Check for a logged-in user session
    const userSession = getFromLocalStorage('userSession');
    if (userSession) {
      this.currentUser = this.getUserById(userSession.userId);
      this.updateAuthUI();
    }
    
    // If it's the first run and no users exist, create some sample users
    if (this.users.length === 0) {
      this.createSampleUsers();
    }
  },
  
  // Create sample users for demonstration
  createSampleUsers() {
    const sampleUsers = [
      new User('user1', 'John Doe', 'john@example.com', 'password123'),
      new User('user2', 'Jane Smith', 'jane@example.com', 'password123')
    ];
    
    // Add sample addresses
    sampleUsers[0].addresses.push(
      new Address('addr1', 'Home', '123 Main St', 'New York', 'NY', '10001', 'USA', true),
      new Address('addr2', 'Work', '456 Business Ave', 'New York', 'NY', '10002', 'USA', false)
    );
    
    this.users = sampleUsers;
    saveToLocalStorage('users', this.users);
  },
  
  // Register a new user
  register(name, email, password) {
    // Check if user already exists
    if (this.getUserByEmail(email)) {
      return { success: false, message: 'Email already registered' };
    }
    
    // Create new user
    const userId = generateId();
    const newUser = new User(userId, name, email, password);
    
    // Add to users array
    this.users.push(newUser);
    
    // Save to local storage
    saveToLocalStorage('users', this.users);
    
    return { success: true, message: 'Registration successful', userId };
  },
  
  // Login a user
  login(email, password) {
    const user = this.getUserByEmail(email);
    
    if (!user) {
      return { success: false, message: 'Email not found' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password' };
    }
    
    // Set current user
    this.currentUser = user;
    
    // Create session
    const session = {
      userId: user.id,
      created: new Date().toISOString()
    };
    
    // Save session to local storage
    saveToLocalStorage('userSession', session);
    
    // Update UI
    this.updateAuthUI();
    
    return { success: true, message: 'Login successful', user };
  },
  
  // Logout the current user
  logout() {
    this.currentUser = null;
    
    // Remove session from local storage
    localStorage.removeItem('userSession');
    
    // Update UI
    this.updateAuthUI();
    
    return { success: true, message: 'Logout successful' };
  },
  
  // Update authentication UI elements
  updateAuthUI() {
    const authenticatedEl = document.getElementById('userAuthenticated');
    const unauthenticatedEl = document.getElementById('userUnauthenticated');
    const displayNameEl = document.getElementById('userDisplayName');
    
    if (authenticatedEl && unauthenticatedEl) {
      if (this.currentUser) {
        authenticatedEl.style.display = 'block';
        unauthenticatedEl.style.display = 'none';
        
        if (displayNameEl) {
          displayNameEl.textContent = this.currentUser.name;
        }
      } else {
        authenticatedEl.style.display = 'none';
        unauthenticatedEl.style.display = 'block';
      }
    }
  },
  
  // Get user by ID
  getUserById(userId) {
    return this.users.find(user => user.id === userId);
  },
  
  // Get user by email
  getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  },
  
  // Check if user is logged in
  isLoggedIn() {
    return this.currentUser !== null;
  },
  
  // Add address to current user
  addAddress(name, street, city, state, zipCode, country, isDefault = false) {
    if (!this.isLoggedIn()) {
      return { success: false, message: 'User not logged in' };
    }
    
    const addressId = generateId();
    const newAddress = new Address(addressId, name, street, city, state, zipCode, country, isDefault);
    
    // If this is the default address, update other addresses
    if (isDefault) {
      this.currentUser.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }
    
    // Add the new address
    this.currentUser.addresses.push(newAddress);
    
    // Update the user record
    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex !== -1) {
      this.users[userIndex] = this.currentUser;
      saveToLocalStorage('users', this.users);
    }
    
    return { success: true, message: 'Address added successfully', addressId };
  },
  
  // Get current user's addresses
  getAddresses() {
    if (!this.isLoggedIn()) {
      return [];
    }
    
    return this.currentUser.addresses;
  },
  
  // Get default address
  getDefaultAddress() {
    if (!this.isLoggedIn()) {
      return null;
    }
    
    return this.currentUser.addresses.find(addr => addr.isDefault) || this.currentUser.addresses[0] || null;
  },
  
  // Add order to current user
  addOrder(order) {
    if (!this.isLoggedIn()) {
      return { success: false, message: 'User not logged in' };
    }
    
    this.currentUser.orders.push(order);
    
    // Update the user record
    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex !== -1) {
      this.users[userIndex] = this.currentUser;
      saveToLocalStorage('users', this.users);
    }
    
    return { success: true, message: 'Order added successfully', orderId: order.id };
  },
  
  // Get current user's orders
  getOrders() {
    if (!this.isLoggedIn()) {
      return [];
    }
    
    return this.currentUser.orders;
  }
};

// Initialize auth service when document is ready
docReady(() => {
  AuthService.init();
  
  // Set up logout functionality
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      AuthService.logout();
      showToast('Success', 'You have been logged out successfully');
      
      // Redirect to home page after logout
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }
});