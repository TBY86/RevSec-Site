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
   Hero Line Shimmer & Pulse (JS)
   ============================= */
if (heroLine) {
    let shimmerPos = 0;
    let pulseDirection = 1;
    let pulseOpacity = 0.6;
    let glowPosition = 150; // CHANGED: Start offscreen right
    let isLineGrowing = true;
    let glowIntensity = 1;
    
    heroLine.addEventListener('transitionend', () => {
        isLineGrowing = false;
    });
    
    function animateHeroLine() {
        shimmerPos += 0.5;
        if (shimmerPos > 100) shimmerPos = 0;
        heroLine.style.backgroundPosition = `${shimmerPos}% 50%`;
        
        // CHANGED: Move glow continuously from right to left
        glowPosition -= 0.5;
        if (glowPosition < -150) glowPosition = 150; // CHANGED: Reset when completely offscreen left
        
        pulseOpacity += 0.008 * pulseDirection;
        if (pulseOpacity >= 0.9) pulseDirection = -1;
        if (pulseOpacity <= 0.5) pulseDirection = 1;
        
        // CHANGED: Smooth fade at edges for snake-like wraparound
        let edgeFade = 1;
        if (glowPosition > 100) {
            // CHANGED: Fade out smoothly as it exits right side
            edgeFade = Math.max(0, (150 - glowPosition) / 50);
        } else if (glowPosition < 0) {
            // CHANGED: Fade in smoothly as it enters from left side
            edgeFade = Math.max(0, (glowPosition + 150) / 150);
        }
        
        if (!isLineGrowing) {
            glowIntensity -= 0.01;
            if (glowIntensity < 0.1) glowIntensity = 0.1; // CHANGED: Back to 0.1 for minimal glow
        }
        
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
    let targetOpacity = 0;  // start hidden
    let currentOpacity = 0; // start hidden
    const fadeSpeed = 0.02; // smaller = slower fade

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
        // Only fade in if hero is completely scrolled out
        targetOpacity = heroBottom <= 0 ? 1 : 0;
    }

    updateOpacity();
    window.addEventListener('scroll', checkHeroVisibility);
    window.addEventListener('resize', checkHeroVisibility);
    // Initial check on load
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
    document.querySelectorAll('.btnPrimary, .btnSecondary, .btnReport, .btnCareer, .btnSubmit').forEach(btn => {
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

});








