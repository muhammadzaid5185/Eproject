
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Loader
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(function() {
                    document.getElementById('loader').style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Back to top button
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Back to top
        document.getElementById('backToTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Form handling
        document.getElementById('quickContactForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in production, this would send to server)
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                this.reset();
            }, 3000);
            
            // Show toast notification
            showToast('Message sent successfully! We\'ll get back to you soon.');
        });

        // Toast notification
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <div class="toast-content">
                    <i class="fas fa-check-circle me-2"></i>
                    ${message}
                </div>
            `;
            
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--gradient);
                color: white;
                padding: 1rem 2rem;
                border-radius: 50px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideUp 0.3s ease;
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideDown 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }

        // Page transition effect
        document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.hostname === window.location.hostname) {
                    e.preventDefault();
                    const target = this.href;
                    
                    // Fade out animation
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        window.location.href = target;
                    }, 300);
                }
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const hero = document.querySelector('.hero-section');
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });

        // Counter animation for statistics
        function animateCounter(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Intersection Observer for counter animation
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, 0, target, 2000);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe statistics section if exists
        const statsSection = document.querySelector('.statistics-section');
        if (statsSection) {
            observer.observe(statsSection);
        }

        // Hover effect for cards
        document.querySelectorAll('.custom-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Dynamic year in footer
        document.querySelectorAll('.current-year').forEach(el => {
            el.textContent = new Date().getFullYear();
        });

        // Geolocation for personalized experience
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    console.log('User location:', position.coords.latitude, position.coords.longitude);
                    // Could customize content based on location
                },
                function(error) {
                    console.log('Geolocation error:', error.message);
                }
            );
        }

        // Search functionality (if implemented)
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function(e) {
                const query = e.target.value.toLowerCase();
                // Implement search logic
            }, 300));
        }

        // Debounce function
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Dark mode toggle (optional)
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
            
            // Check localStorage for dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }

        // Print current page info
        console.log('QuickCalligraphy website loaded successfully!');
        console.log('Current page:', window.location.pathname);
   