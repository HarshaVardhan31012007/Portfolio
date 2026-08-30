/**
 * HARSHAVARDHAN REDDY KUNAM - PORTFOLIO INTERACTION SCRIPT
 * Handles ambient canvas glow, scroll reveals, smooth navigation, and interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Ambient Background Canvas Blobs
    // --------------------------------------------------------------------------
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [
            { x: width * 0.2, y: height * 0.3, radius: 350, color: 'rgba(110, 231, 183, 0.07)', vx: 0.3, vy: 0.2 },
            { x: width * 0.8, y: height * 0.6, radius: 400, color: 'rgba(129, 140, 248, 0.08)', vx: -0.2, vy: 0.3 },
            { x: width * 0.5, y: height * 0.8, radius: 300, color: 'rgba(56, 189, 248, 0.06)', vx: 0.2, vy: -0.3 }
        ];

        function animateAmbient() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -100 || p.x > width + 100) p.vx *= -1;
                if (p.y < -100 || p.y > height + 100) p.vy *= -1;

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'rgba(11, 15, 25, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animateAmbient);
        }

        animateAmbient();
    }

    // --------------------------------------------------------------------------
    // 2. Scroll Reveal Observer
    // --------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // --------------------------------------------------------------------------
    // 3. Back to Top & Active Link Highlight
    // --------------------------------------------------------------------------
    const backToTopBtn = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Back to top visibility
        if (window.scrollY > 400) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }

        // Active link tracking
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------------------------
    // 4. Contact Form Submission (Mock Feedback)
    // --------------------------------------------------------------------------
    const contactForm = document.querySelector('.contact-form-card form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '✓ Message Sent Successfully!';
                btn.style.background = '#10B981';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            }, 1200);
        });
    }
});
