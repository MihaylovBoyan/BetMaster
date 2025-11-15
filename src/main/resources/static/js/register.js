// Register Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const eyeIconPassword = togglePassword ? togglePassword.querySelector('.eye-icon') : null;
    const eyeIconConfirm = toggleConfirmPassword ? toggleConfirmPassword.querySelector('.eye-icon') : null;

    if (togglePassword && eyeIconPassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle icon between eye and crossed eye
            eyeIconPassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    if (toggleConfirmPassword && eyeIconConfirm) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            // Toggle icon between eye and crossed eye
            eyeIconConfirm.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
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
        if (username.length > 20) {
            usernameError.textContent = 'Username must be less than 20 characters';
            usernameInput.classList.add('error');
            usernameInput.classList.remove('success');
            return false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            usernameError.textContent = 'Username can only contain letters, numbers, and underscores';
            usernameInput.classList.add('error');
            usernameInput.classList.remove('success');
            return false;
        }
        usernameError.textContent = '';
        usernameInput.classList.remove('error');
        usernameInput.classList.add('success');
        return true;
    }

    // Email validation
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.length === 0) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            emailInput.classList.remove('success');
            return false;
        }
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            emailInput.classList.remove('success');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('error');
        emailInput.classList.add('success');
        return true;
    }

    // Password validation
    function validatePassword() {
        const password = passwordInput.value;
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password)
        };

        // Update requirement indicators
        document.getElementById('req-length').classList.toggle('valid', requirements.length);
        document.getElementById('req-uppercase').classList.toggle('valid', requirements.uppercase);
        document.getElementById('req-lowercase').classList.toggle('valid', requirements.lowercase);
        document.getElementById('req-number').classList.toggle('valid', requirements.number);

        if (password.length === 0) {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('success');
            return false;
        }
        if (!requirements.length || !requirements.uppercase || !requirements.lowercase || !requirements.number) {
            passwordError.textContent = 'Password does not meet requirements';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('success');
            return false;
        }
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        passwordInput.classList.add('success');
        return true;
    }

    // Confirm password validation
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword.length === 0) {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordInput.classList.add('error');
            confirmPasswordInput.classList.remove('success');
            return false;
        }
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('error');
            confirmPasswordInput.classList.remove('success');
            return false;
        }
        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('error');
        confirmPasswordInput.classList.add('success');
        return true;
    }

    // Real-time validation
    usernameInput.addEventListener('blur', validateUsername);
    usernameInput.addEventListener('input', function() {
        if (usernameInput.classList.contains('error')) {
            validateUsername();
        }
    });

    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (emailInput.classList.contains('error')) {
            validateEmail();
        }
    });

    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', function() {
        validatePassword();
        if (confirmPasswordInput.value.length > 0) {
            validateConfirmPassword();
        }
    });

    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    confirmPasswordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value.length > 0) {
            validateConfirmPassword();
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            // Disable submit button to prevent double submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating Account...';
            
            // Submit the form
            form.submit();
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});

