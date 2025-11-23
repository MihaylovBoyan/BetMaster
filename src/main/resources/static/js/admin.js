// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const refreshUsersBtn = document.getElementById('refreshUsersBtn');
    const refreshBetsBtn = document.getElementById('refreshBetsBtn');
    const refreshTransactionsBtn = document.getElementById('refreshTransactionsBtn');

    // Tab switching functionality
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.add('active');
        });
    });

    // Refresh buttons
    if (refreshUsersBtn) {
        refreshUsersBtn.addEventListener('click', function() {
            // TODO: Implement user refresh functionality
            location.reload();
        });
    }

    if (refreshBetsBtn) {
        refreshBetsBtn.addEventListener('click', function() {
            // TODO: Implement bet refresh functionality
            location.reload();
        });
    }

    if (refreshTransactionsBtn) {
        refreshTransactionsBtn.addEventListener('click', function() {
            // TODO: Implement transaction refresh functionality
            location.reload();
        });
    }

    // User action functions (to be implemented)
    window.viewUser = function(userId) {
        // TODO: Implement view user functionality
        alert('View user: ' + userId);
    };

    window.editUser = function(userId) {
        // TODO: Implement edit user functionality
        alert('Edit user: ' + userId);
    };

    window.deleteUser = function(userId) {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            // TODO: Implement delete user functionality
            alert('Delete user: ' + userId);
        }
    };
});

