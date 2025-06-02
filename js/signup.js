/**
 * Signup Page JavaScript for TechPulse E-commerce
 */

// Initialize signup page
function initSignupPage() {
  // Setup form validation and submission
  const signupForm = document.getElementById('signupForm');
  
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const termsAgree = document.getElementById('termsAgree')?.checked || false;
      
      // Validate name
      if (!fullName) {
        showToast('Error', 'Please enter your full name');
        return;
      }
      
      // Validate email
      if (!email || !isValidEmail(email)) {
        showToast('Error', 'Please enter a valid email address');
        return;
      }
      
      // Validate password
      if (!password) {
        showToast('Error', 'Please enter a password');
        return;
      }
      
      // Check password strength
      const passwordStrength = checkPasswordStrength(password);
      if (passwordStrength.strength === 'weak') {
        showToast('Error', 'Password is too weak. Please choose a stronger password');
        return;
      }
      
      // Validate confirm password
      if (password !== confirmPassword) {
        showToast('Error', 'Passwords do not match');
        return;
      }
      
      // Validate terms agreement
      if (!termsAgree) {
        showToast('Error', 'You must agree to the Terms of Service and Privacy Policy');
        return;
      }
      
      // Attempt registration
      const result = AuthService.register(fullName, email, password);
      
      if (result.success) {
        showToast('Success', 'Account created successfully');
        
        // Login the user automatically
        AuthService.login(email, password);
        
        // Redirect after signup
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        showToast('Error', result.message);
      }
    });
  }
  
  // Setup password visibility toggle
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
      const passwordInput = button.closest('.input-group').querySelector('input');
      
      if (passwordInput) {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          button.innerHTML = '<i class="bi bi-eye-slash"></i>';
        } else {
          passwordInput.type = 'password';
          button.innerHTML = '<i class="bi bi-eye"></i>';
        }
      }
    });
  });
  
  // Setup password strength meter
  const passwordInput = document.getElementById('signupPassword');
  const passwordProgressBar = document.querySelector('.password-strength .progress-bar');
  const passwordFeedback = document.querySelector('.password-feedback');
  
  if (passwordInput && passwordProgressBar && passwordFeedback) {
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      const strength = checkPasswordStrength(password);
      
      // Update progress bar
      passwordProgressBar.style.width = `${strength.score}%`;
      
      // Update color based on strength
      if (strength.strength === 'strong') {
        passwordProgressBar.className = 'progress-bar bg-success';
      } else if (strength.strength === 'medium') {
        passwordProgressBar.className = 'progress-bar bg-warning';
      } else {
        passwordProgressBar.className = 'progress-bar bg-danger';
      }
      
      // Update feedback text
      passwordFeedback.textContent = `Password strength: ${strength.strength.charAt(0).toUpperCase() + strength.strength.slice(1)}`;
    });
  }
}

// Initialize signup page when document is ready
docReady(() => {
  initSignupPage();
});