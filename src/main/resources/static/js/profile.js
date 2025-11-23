// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const editInfoBtn = document.getElementById('editInfoBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    
    const firstNameInput = document.getElementById('firstNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const emailInput = document.getElementById('emailInput');
    const formActions = document.getElementById('formActions');

    // Store original values
    let originalValues = {
        firstName: firstNameInput ? firstNameInput.value : '',
        lastName: lastNameInput ? lastNameInput.value : '',
        email: emailInput ? emailInput.value : ''
    };

    // Edit profile information
    if (editInfoBtn) {
        editInfoBtn.addEventListener('click', function() {
            // Make inputs editable
            if (firstNameInput) {
                firstNameInput.readOnly = false;
                firstNameInput.classList.add('editable');
            }
            if (lastNameInput) {
                lastNameInput.readOnly = false;
                lastNameInput.classList.add('editable');
            }
            if (emailInput) {
                emailInput.readOnly = false;
                emailInput.classList.add('editable');
            }

            // Show form actions
            if (formActions) {
                formActions.style.display = 'flex';
            }

            // Hide edit button
            this.style.display = 'none';
        });
    }

    // Cancel edit
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            // Restore original values
            if (firstNameInput) {
                firstNameInput.value = originalValues.firstName;
                firstNameInput.readOnly = true;
                firstNameInput.classList.remove('editable');
            }
            if (lastNameInput) {
                lastNameInput.value = originalValues.lastName;
                lastNameInput.readOnly = true;
                lastNameInput.classList.remove('editable');
            }
            if (emailInput) {
                emailInput.value = originalValues.email;
                emailInput.readOnly = true;
                emailInput.classList.remove('editable');
            }

            // Hide form actions
            if (formActions) {
                formActions.style.display = 'none';
            }

            // Show edit button
            if (editInfoBtn) {
                editInfoBtn.style.display = 'block';
            }
        });
    }

    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            // Validate email
            const email = emailInput ? emailInput.value : '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                emailInput.focus();
                return false;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Saving...';
            }
        });
    }

    // Password form validation
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            const newPassword = this.querySelector('input[name="newPassword"]').value;
            const confirmPassword = this.querySelector('input[name="confirmPassword"]').value;

            if (newPassword.length < 8) {
                e.preventDefault();
                alert('New password must be at least 8 characters long');
                return false;
            }

            if (newPassword !== confirmPassword) {
                e.preventDefault();
                alert('New passwords do not match');
                return false;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Updating...';
            }
        });
    }

    // Deposit button
    if (depositBtn) {
        depositBtn.addEventListener('click', function() {
            const amount = prompt('Enter deposit amount:');
            if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
                // TODO: Implement deposit functionality
                alert('Deposit functionality will be implemented soon');
                // You can make an AJAX call or redirect to deposit page here
            }
        });
    }

    // Withdraw button
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', function() {
            const amount = prompt('Enter withdrawal amount:');
            if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
                // TODO: Implement withdrawal functionality
                alert('Withdrawal functionality will be implemented soon');
                // You can make an AJAX call or redirect to withdrawal page here
            }
        });
    }

    // Avatar edit button
    const editAvatarBtn = document.getElementById('editAvatarBtn');
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function() {
            // TODO: Implement avatar upload functionality
            alert('Avatar upload functionality will be implemented soon');
            // You can add file upload functionality here
        });
    }
});


