/**
 * Login Page JavaScript for TechPulse E-commerce
 */

// Initialize login page
function initLoginPage() {
  // Setup form validation and submission
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const rememberMe = document.getElementById('rememberMe')?.checked || false;
      
      // Validate email
      if (!email || !isValidEmail(email)) {
        showToast('Error', 'Please enter a valid email address');
        return;
      }
      
      // Validate password
      if (!password) {
        showToast('Error', 'Please enter your password');
        return;
      }
      
      // Attempt login
      const result = AuthService.login(email, password);
      
      if (result.success) {
        showToast('Success', 'You have been logged in successfully');
        
        // Redirect after login
        setTimeout(() => {
          // Check if there's a redirect parameter in the URL
          const urlParams = getUrlParams();
          
          if (urlParams.redirect) {
            window.location.href = `${urlParams.redirect}.html`;
          } else {
            window.location.href = 'index.html';
          }
        }, 1000);
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
}

// Initialize login page when document is ready
docReady(() => {
  initLoginPage();
});