// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Ensure page always starts at top on load
    window.scrollTo(0, 0);


    /* =============================
       Utility function for smooth hover effect
       ============================= */
    function addHoverEffect(element, options) {
        const { hoverStyles, originalStyles, transition = 'all 0.3s ease' } = options;

        // Store original styles if not passed
        const original = originalStyles || {};
        Object.keys(hoverStyles).forEach(prop => {
            if (!original[prop]) {
                original[prop] = element.style[prop] || '';
            }
        });

        element.style.transition = transition;

        element.addEventListener('mouseenter', () => {
            for (const prop in hoverStyles) {
                element.style[prop] = hoverStyles[prop];
            }
        });

        element.addEventListener('mouseleave', () => {
            for (const prop in original) {
                element.style[prop] = original[prop];
            }
        });
    }

/* =============================
   Hero Section Entrance Animation
   ============================= */
const heroLine = document.querySelector('.heroLine');
const heroTop = document.querySelector('.heroTop');
const heroBottom = document.querySelector('.heroActions');
if (heroLine && heroTop && heroBottom) {
    // ===== STEP 1: SET INITIAL HIDDEN STATES =====
    heroLine.style.transform = 'scaleX(0)';
    heroLine.style.transformOrigin = 'center';
    heroLine.style.transition = 'transform 1s ease-out';
    heroTop.style.opacity = 0;
    heroTop.style.transform = 'translateY(-50px)';
   
    heroBottom.style.opacity = 0;
    heroBottom.style.transform = 'translateY(50px)';
    // ===== STEP 2: TRIGGER LINE ANIMATION AFTER DELAY =====
    setTimeout(() => {
        heroLine.style.transform = 'scaleX(1)';
    }, 2000); // CHANGED: Updated delay value
    // ===== STEP 3: WAIT FOR LINE TO FINISH, THEN ANIMATE CONTENT =====
    heroLine.addEventListener('transitionend', () => {
        heroTop.style.transition = 'all 0.8s ease-out';
        heroTop.style.opacity = 1;
        heroTop.style.transform = 'translateY(0)';
        setTimeout(() => {
            heroBottom.style.transition = 'all 0.8s ease-out';
            heroBottom.style.opacity = 1;
            heroBottom.style.transform = 'translateY(0)';
        }, 200);
    });
}

/* =============================
   Hero Line Shimmer & Pulse (JS)
   ============================= */
if (heroLine) {
    let shimmerPos = 0;
    let pulseDirection = 1;
    let pulseOpacity = 0.6;
    let glowPosition = 200;
    let isLineGrowing = true; // ADDED: Track if line is still growing
    let glowIntensity = 1; // ADDED: Multiplier for glow intensity
   
    // ADDED: Listen for when line finishes growing
    heroLine.addEventListener('transitionend', () => {
        isLineGrowing = false;
    }, { once: true }); // Added { once: true } to prevent multiple triggers
   
    function animateHeroLine() {
        shimmerPos += 0.5;
        if (shimmerPos > 100) shimmerPos = 0;
        heroLine.style.backgroundPosition = `${shimmerPos}% 50%`;
       
        glowPosition -= 0.5;
        if (glowPosition <= -200) {
            glowPosition = 200;
        }
       
        pulseOpacity += 0.008 * pulseDirection;
        if (pulseOpacity >= 0.9) pulseDirection = -1;
        if (pulseOpacity <= 0.5) pulseDirection = 1;
       
        let edgeFade = 1;
        if (glowPosition > 100) {
            // Fade in from right (200 → 100)
            edgeFade = (200 - glowPosition) / 100;
        } else if (glowPosition < -100) {
            // Fade out to left (-100 → -200)
            edgeFade = (glowPosition + 200) / 100;
        }
        edgeFade = Math.max(0, Math.min(1, edgeFade));
       
        // ADDED: Reduce glow intensity after line finishes growing
        if (!isLineGrowing) {
            glowIntensity -= 0.01; // Gradually reduce
            if (glowIntensity < 0.1) glowIntensity = 0.1; // Keep minimal glow
        }
       
        // CHANGED: Multiply by glowIntensity to reduce glow after animation
        heroLine.style.boxShadow = `
           0 0 ${40 * glowIntensity}px ${20 * glowIntensity}px rgba(0, 217, 163, ${pulseOpacity * edgeFade * glowIntensity}),
            0 0 ${60 * glowIntensity}px ${30 * glowIntensity}px rgba(0, 102, 255, ${pulseOpacity * 0.6 * edgeFade * glowIntensity}),
            0 0 ${80 * glowIntensity}px ${40 * glowIntensity}px rgba(0, 217, 163, ${pulseOpacity * 0.4 * edgeFade * glowIntensity}),
            0 0 ${100 * glowIntensity}px ${50 * glowIntensity}px rgba(0, 102, 255, ${pulseOpacity * 0.3 * edgeFade * glowIntensity})
        `;
       
        requestAnimationFrame(animateHeroLine);
    }
   
    animateHeroLine();
}

/* =============================
   Sticky Contact Button Smooth Fade (JS Only)
   ============================= */
const contactBtn = document.getElementById('contactBtn');
const heroSection = document.getElementById('hero');

if (contactBtn && heroSection) {
    let targetOpacity = 0;
    let currentOpacity = 0;
    const fadeSpeed = 0.02;

    contactBtn.style.opacity = '0';
    contactBtn.style.pointerEvents = 'none';
    contactBtn.style.transition = 'none';

    function updateOpacity() {
        currentOpacity += (targetOpacity - currentOpacity) * fadeSpeed;
        contactBtn.style.opacity = currentOpacity;
        contactBtn.style.pointerEvents = currentOpacity < 0.05 ? 'none' : 'auto';
        requestAnimationFrame(updateOpacity);
    }

    function checkHeroVisibility() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        targetOpacity = heroBottom <= 0 ? 1 : 0;
    }

    updateOpacity();
    window.addEventListener('scroll', checkHeroVisibility);
    window.addEventListener('resize', checkHeroVisibility);
    checkHeroVisibility();
}



    /* =============================
       Report Cards Hover Animation
       ============================= */
    document.querySelectorAll('.reportCard').forEach(card => {
        addHoverEffect(card, {
            hoverStyles: {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 24px rgba(0, 102, 255, 0.4)',
            }
        });
    });

    /* =============================
       Service Cards Hover Animation
       ============================= */
    document.querySelectorAll('.serviceCard').forEach(card => {
        addHoverEffect(card, {
            hoverStyles: {
                transform: 'translateY(-8px)',
                boxShadow: '0 10px 20px rgba(0, 102, 255, 0.3)',
            }
        });
    });

    /* =============================
       Career Cards Hover Animation
       ============================= */
    document.querySelectorAll('.careerCard').forEach(card => {
        addHoverEffect(card, {
            hoverStyles: {
                transform: 'translateY(-6px)',
                boxShadow: '0 8px 16px rgba(0, 102, 255, 0.2)',
            }
        });
    });

    /* =============================
       Buttons Hover Animation
       ============================= */
    document.querySelectorAll('.btnPrimary, .btnSecondary, .btnReport, .btnCareer, .btnSubmit, .contactButton').forEach(btn => {
        addHoverEffect(btn, {
            hoverStyles: {
                transform: 'scale(1.05)',
            },
            transition: 'transform 0.2s ease'
        });
    });

    /* =============================
       Hero Actions Buttons Special Hover
       ============================= */
    const heroBtn = document.getElementById('heroCta');
    if (heroBtn) {
        addHoverEffect(heroBtn, {
            hoverStyles: {
                transform: 'scale(1.1)',
                boxShadow: '0 8px 20px rgba(0, 102, 255, 0.5)',
            },
            transition: 'all 0.25s ease'
        });
    }

    /* =============================
       Social Links Hover
       ============================= */
    document.querySelectorAll('.socialLink:not(.socialLinkDisabled)').forEach(link => {
        addHoverEffect(link, {
            hoverStyles: {
                transform: 'scale(1.15)',
                boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)',
            },
            transition: 'all 0.2s ease'
        });
    });

/* =============================
       Modal Functionality
       ============================= */
    const careerModal = document.getElementById('careerModal');
    const contactModal = document.getElementById('contactModal');
    const careerModalTitle = document.getElementById('careerModalTitle');

    // Check if modals exist before setting up functionality
    if (careerModal && contactModal && careerModalTitle) {
        
        // Open career modal
        document.querySelectorAll('.btnCareer').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const careerType = e.target.dataset.careerType;
                if (careerType === 'employment') {
                    careerModalTitle.textContent = 'Submit Your Resume';
                } else {
                    careerModalTitle.textContent = 'Apply as Volunteer';
                }
                careerModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Open contact modal
        const openContactModal = (e) => {
            e.preventDefault();
            contactModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        const heroCta = document.getElementById('heroCta');
        const contactBtn = document.getElementById('contactBtn');
        
        if (heroCta) heroCta.addEventListener('click', openContactModal);
        if (contactBtn) contactBtn.addEventListener('click', openContactModal);

        // Close modals
        const closeModal = (modal) => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        const careerModalClose = document.getElementById('careerModalClose');
        const careerModalOverlay = document.getElementById('careerModalOverlay');
        const contactModalClose = document.getElementById('contactModalClose');
        const contactModalOverlay = document.getElementById('contactModalOverlay');

        if (careerModalClose) careerModalClose.addEventListener('click', () => closeModal(careerModal));
        if (careerModalOverlay) careerModalOverlay.addEventListener('click', () => closeModal(careerModal));
        if (contactModalClose) contactModalClose.addEventListener('click', () => closeModal(contactModal));
        if (contactModalOverlay) contactModalOverlay.addEventListener('click', () => closeModal(contactModal));

        // Form submissions
        const careerForm = document.getElementById('careerForm');
        const contactForm = document.getElementById('contactForm');

        if (careerForm) {
            careerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your application! We will review it and get back to you soon.');
                closeModal(careerModal);
                e.target.reset();
            });
        }

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your request! Our team will contact you within 24-48 hours.');
                closeModal(contactModal);
                e.target.reset();
            });
        }
    } else {
        console.warn('Modal elements not found in the DOM');
    }

});
















