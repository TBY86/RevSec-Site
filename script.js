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
// ADDED: Define variables at the top
const heroLine = document.querySelector('.heroLine');
const heroTop = document.querySelector('.heroTop');
const heroBottom = document.querySelector('.heroActions');

if (heroLine && heroTop && heroBottom) {
    // ADDED: Set initial hidden states
    heroLine.style.transform = 'scaleX(0)';
    heroLine.style.transformOrigin = 'center';
    heroLine.style.transition = 'transform 1s ease-out';

    heroTop.style.opacity = 0;
    heroTop.style.transform = 'translateY(-50px)';
    
    heroBottom.style.opacity = 0;
    heroBottom.style.transform = 'translateY(50px)';

    // ADDED: Trigger line animation after delay
    setTimeout(() => {
        heroLine.style.transform = 'scaleX(1)';
    }, 2000);

    // ADDED: Wait for line to finish, then animate content
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
    let glowPosition = 100; // CHANGED: Position of the glow segment (100 = right edge)
    let glowWidth = 0; // CHANGED: Width of the green glow segment (starts at 0)
    let glowPhase = 'growing'; // ADDED: Track phase: 'growing', 'traveling', 'shrinking'
    let isLineGrowing = true;
    let glowIntensity = 1;
    
    heroLine.addEventListener('transitionend', () => {
        isLineGrowing = false;
    });
    
    function animateHeroLine() {
        shimmerPos += 0.5;
        if (shimmerPos > 100) shimmerPos = 0;
        heroLine.style.backgroundPosition = `${shimmerPos}% 50%`;
        
        // CHANGED: Three-phase LED strip effect
        if (glowPhase === 'growing') {
            // Phase 1: Grow on the right side
            glowWidth += 0.3;
            if (glowWidth >= 15) {
                glowWidth = 15;
                glowPhase = 'traveling'; // Start traveling once fully grown
            }
        } else if (glowPhase === 'traveling') {
            // Phase 2: Travel left at full width
            glowPosition -= 0.3;
            if (glowPosition <= 0) {
                glowPhase = 'shrinking'; // Start shrinking when reaching left edge
            }
        } else if (glowPhase === 'shrinking') {
            // Phase 3: Shrink on the left side
            glowPosition -= 0.3; // Continue moving left
            glowWidth -= 0.3; // Shrink as it disappears
            if (glowWidth <= 0) {
                glowWidth = 0;
                glowPosition = 100; // Reset to right edge
                glowPhase = 'growing'; // Start growing again
            }
        }
        
        // CHANGED: Reduce intensity after line finishes growing
        if (!isLineGrowing) {
            glowIntensity -= 0.01;
            if (glowIntensity < 0.1) glowIntensity = 0.1;
        }
        
        // CHANGED: Glow size and opacity based on segment width
        let segmentOpacity = (glowWidth / 15) * glowIntensity;
        
        heroLine.style.boxShadow = `
           0 0 ${20 + (glowWidth * 2)}px ${10 + glowWidth}px rgba(0, 217, 163, ${segmentOpacity * 0.8}),
            0 0 ${30 + (glowWidth * 3)}px ${15 + (glowWidth * 1.5)}px rgba(0, 102, 255, ${segmentOpacity * 0.5}),
            0 0 ${40 + (glowWidth * 4)}px ${20 + (glowWidth * 2)}px rgba(0, 217, 163, ${segmentOpacity * 0.3})
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

