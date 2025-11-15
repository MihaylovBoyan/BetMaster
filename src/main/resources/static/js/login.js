// Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const eyeIconPassword = togglePassword ? togglePassword.querySelector('.eye-icon') : null;

    if (togglePassword && eyeIconPassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle icon between eye and crossed eye
            eyeIconPassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    // Username validation
    function validateUsername() {
        const username = usernameInput.value.trim();
        if (username.length === 0) {
            usernameError.textContent = 'Username is required';
            usernameInput.classList.add('error');
            usernameInput.classList.remove('success');
            return false;
        }
        if (username.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            usernameInput.classList.add('error');
            usernameInput.classList.remove('success');
            return false;
        }
        usernameError.textContent = '';
        usernameInput.classList.remove('error');
        usernameInput.classList.add('success');
        return true;
    }

    // Password validation
    function validatePassword() {
        const password = passwordInput.value;
        if (password.length === 0) {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('success');
            return false;
        }
        if (password.length < 4) {
            passwordError.textContent = 'Password must be at least 4 characters';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('success');
            return false;
        }
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        passwordInput.classList.add('success');
        return true;
    }

    // Real-time validation
    usernameInput.addEventListener('blur', validateUsername);
    usernameInput.addEventListener('input', function() {
        if (usernameInput.classList.contains('error')) {
            validateUsername();
        }
    });

    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', function() {
        if (passwordInput.classList.contains('error')) {
            validatePassword();
        }
    });

    // Clear error styling when user starts typing
    usernameInput.addEventListener('input', function() {
        if (usernameInput.value.trim().length > 0 && usernameInput.classList.contains('error')) {
            usernameInput.classList.remove('error');
            usernameError.textContent = '';
        }
    });

    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.length > 0 && passwordInput.classList.contains('error')) {
            passwordInput.classList.remove('error');
            passwordError.textContent = '';
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        if (!isUsernameValid || !isPasswordValid) {
            e.preventDefault();
            
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return false;
        }

        // Disable submit button to prevent double submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing In...';
        
        // Form will submit normally if validation passes
        return true;
    });

    // Handle Enter key on inputs
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            // Let the form submit naturally
            if (validateUsername() && validatePassword()) {
                form.submit();
            }
        }
    });
});

