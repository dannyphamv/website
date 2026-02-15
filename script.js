// Set copyright year dynamically to avoid manual updates
document.getElementById("year").textContent = new Date().getFullYear();

const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");
const html = document.documentElement;

// Theme initialization: Check localStorage first, then fall back to system preference
// This allows user choice to override system settings
const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

// Check if user prefers reduced motion for accessibility
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Mobile Device Detection
 * Detects actual mobile devices rather than just screen size
 * This ensures tablets with large screens still get Vanta animations
 */
function isMobileDevice() {
    // Check user agent for mobile device signatures
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileUA = mobileRegex.test(navigator.userAgent);
    
    // Check for touch capability (more reliable than user agent alone)
    const isTouchDevice = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    
    // Check screen size as additional factor
    const isSmallScreen = window.innerWidth <= 768;
    
    // Device is considered mobile if it matches mobile UA OR (is touch-enabled AND has small screen)
    return isMobileUA || (isTouchDevice && isSmallScreen);
}

// Apply mobile class if device is detected as mobile
if (isMobileDevice()) {
    document.documentElement.classList.add('is-mobile-device');
}

/* Vanta.js Cloud Logic - Optimized Performance Strategy
 * 
 * WHY we use .setOptions() instead of destroying/recreating:
 * - Destroying and recreating Vanta on theme switch causes a 500ms+ delay
 * - This creates jarring visual lag when toggling themes
 * - .setOptions() updates colors instantly without destroying the WebGL context
 * - Results in smooth, instant theme transitions
 */
let vantaEffect = null;

function initVanta() {
    // Don't initialize Vanta if user prefers reduced motion
    // WebGL animations can trigger vestibular disorders
    if (prefersReducedMotion) {
        return;
    }

    // Don't initialize Vanta on mobile devices for better performance and battery life
    if (isMobileDevice()) {
        return;
    }

    const isDark = html.getAttribute("data-theme") === "dark";
    
    // Color configuration: Dark theme uses muted colors to reduce eye strain
    const vantaOptions = {
        el: "body",
        mouseControls: true,
        touchControls: true,
        gyroControls: false, // Disable gyro on mobile for performance
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: isDark ? 0x212121 : 0xffffff,
        skyColor: isDark ? 0x2b2b2b : 0x68b8d7,
        cloudColor: isDark ? 0x444444 : 0xadc1de,
        cloudShadowColor: isDark ? 0x111111 : 0x183550,
        sunColor: isDark ? 0x222222 : 0xff9919,
        sunGlareColor: isDark ? 0x222222 : 0xff6633,
        sunlightColor: isDark ? 0x222222 : 0xff9933,
        speed: 0.4
    };

    if (!vantaEffect) {
        // First initialization - create the effect
        vantaEffect = VANTA.CLOUDS(vantaOptions);
    } else {
        // Subsequent theme changes - update colors without destroying effect
        // This is the key performance optimization
        vantaEffect.setOptions(vantaOptions);
    }
}

/* Theme Toggle Animation Strategy
 * 
 * WHY we delay theme change until mid-animation:
 * - Creates smooth visual transition that feels intentional
 * - Icon animation provides feedback before color change
 * - 200ms delay aligns with icon shrink animation (50% of 400ms)
 * - Prevents jarring instant color switch
 */
toggleBtn.addEventListener("click", () => {
    icon.classList.add('animate-pop');

    // Change theme mid-way through animation (at 200ms of 400ms total)
    setTimeout(() => {
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateIcon(newTheme);
        initVanta(); // Update Vanta colors instantly via setOptions
    }, 200);

    // Clean up animation class after it completes
    icon.addEventListener('animationend', () => {
        icon.classList.remove('animate-pop');
    }, { once: true }); // { once: true } auto-removes listener to prevent memory leaks
});

// Toggle between filled and regular moon icon based on theme
function updateIcon(theme) {
    icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-regular fa-moon";
}

document.addEventListener("DOMContentLoaded", () => {
    initVanta();

    // Intersection Observer for scroll-reveal animations
    // threshold: 0.15 means trigger when 15% of element is visible
    const observerOptions = { threshold: 0.15 };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Unobserve after animation to improve performance
                // We don't need to track elements that have already been revealed
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, observerOptions);
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    typeWriter();
});

/* Scroll Progress Bar
 * Created dynamically via JS instead of HTML to keep markup clean
 * ARIA attributes make it accessible to screen readers */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.setAttribute('role', 'progressbar');
progressBar.setAttribute('aria-label', 'Page scroll progress');
progressBar.setAttribute('aria-valuemin', '0');
progressBar.setAttribute('aria-valuemax', '100');
document.body.prepend(progressBar);

window.onscroll = () => {
    // Calculate scroll percentage
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    progressBar.style.width = scrolled + "%";
    // Update ARIA value for accessibility
    progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
};

/* Typewriter Effect
 * Simple character-by-character reveal animation
 * 100ms delay feels natural - not too fast, not too slow */
const text = "Data Analyst — Python, SQL, R";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

/* Debounced Resize Handler
 * 
 * WHY we debounce:
 * - Window resize events fire continuously during resize (hundreds of times)
 * - Each Vanta resize recalculates WebGL canvas dimensions - expensive operation
 * - Debouncing waits until user STOPS resizing before updating
 * - 250ms delay is imperceptible to users but saves significant CPU
 */
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (vantaEffect) vantaEffect.resize();
    }, 250);
});
