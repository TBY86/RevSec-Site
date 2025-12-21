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
const heroTop = document.querySelector('.heroTop'); // matches HTML
const heroBottom = document.querySelector('.heroActions'); // matches HTML

if (heroLine && heroTop && heroBottom) {
    // Initial states
    heroLine.style.transform = 'scaleX(0)';
    heroLine.style.transformOrigin = 'center';
    heroLine.style.transition = 'transform 2.5s ease-out';

    heroTop.style.opacity = 0;
    heroTop.style.transform = 'translateY(-50px)';
    heroBottom.style.opacity = 0;
    heroBottom.style.transform = 'translateY(50px)';

    // Trigger line animation after slight delay for page load
    setTimeout(() => {
        heroLine.style.transform = 'scaleX(1)';
    }, 800);

    // Animate top and bottom after line finishes
    heroLine.addEventListener('transitionend', () => {
        // Top content animation
        heroTop.style.transition = 'all 0.8s ease-out';
        heroTop.style.opacity = 1;
        heroTop.style.transform = 'translateY(0)';

        // Bottom content animation slightly after top
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
    let pulseOpacity = 0.6; // starting glow intensity
    let glowPosition = 100

    // Animate shimmer horizontally
    function animateHeroLine() {
        // Update background position for shimmer
        shimmerPos += 0.5; // slower than button (smaller increment)
        if (shimmerPos > 100) shimmerPos = 0;
        heroLine.style.backgroundPosition = `${shimmerPos}% 50%`;

        // Move the glow from right to left
        glowPosition -= 0.5; // Speed of glow movement (negative = left direction)
        if (glowPosition < -20) glowPosition = 100; // Reset to right when it reaches left edge

        // Pulse glow subtly
        pulseOpacity += 0.008 * pulseDirection; // very slow pulse
        if (pulseOpacity >= 0.9) pulseDirection = -1;
        if (pulseOpacity <= 0.5) pulseDirection = 1;

        heroLine.style.boxShadow = `0 0 10px rgba(0, 217, 163, ${pulseOpacity})`;

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



