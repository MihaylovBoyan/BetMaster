// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.sport-card, .event-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Live odds update simulation (for demo purposes)
    const liveOddsElements = document.querySelectorAll('.team-odds');
    if (liveOddsElements.length > 0 && window.location.pathname === '/') {
        setInterval(function() {
            liveOddsElements.forEach(oddsElement => {
                // Simulate small odds changes
                const currentOdds = parseFloat(oddsElement.textContent);
                if (!isNaN(currentOdds)) {
                    const change = (Math.random() - 0.5) * 0.1; // Small random change
                    const newOdds = Math.max(1.01, Math.min(10, currentOdds + change));
                    oddsElement.textContent = newOdds.toFixed(2);
                    
                    // Add visual feedback for odds changes
                    oddsElement.style.backgroundColor = '#ff1744';
                    setTimeout(() => {
                        oddsElement.style.backgroundColor = '';
                    }, 300);
                }
            });
        }, 5000); // Update every 5 seconds
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click handler for bet buttons (placeholder)
    document.querySelectorAll('.event-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // This would typically navigate to a bet placement page
            // For now, just show a message
            console.log('Place bet clicked - would navigate to bet placement page');
            // You can add actual navigation here later
            // window.location.href = '/bet/place';
        });
    });
});

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Utility function to format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Export functions for use in other scripts
window.BetMaster = {
    formatDate: formatDate,
    formatCurrency: formatCurrency
};

