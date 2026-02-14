document.getElementById("year").textContent = new Date().getFullYear();
const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");
const html = document.documentElement;

const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Vanta.js Cloud Logic - Optimized to prevent theme-switch delay
let vantaEffect = null;
function initVanta() {
    // Don't initialize Vanta if user prefers reduced motion
    if (prefersReducedMotion) {
        return;
    }

    const isDark = html.getAttribute("data-theme") === "dark";
    const vantaOptions = {
        el: "body",
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
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
        vantaEffect = VANTA.CLOUDS(vantaOptions);
    } else {
        // Update existing effect instead of destroying it
        vantaEffect.setOptions(vantaOptions);
    }
}

toggleBtn.addEventListener("click", () => {
    icon.classList.add('animate-pop');

    // Change theme logic mid-way through animation
    setTimeout(() => {
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateIcon(newTheme);
        initVanta();
    }, 200);

    icon.addEventListener('animationend', () => {
        icon.classList.remove('animate-pop');
    }, { once: true });
});

function updateIcon(theme) {
    icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-regular fa-moon";
}

document.addEventListener("DOMContentLoaded", () => {
    initVanta();

    const observerOptions = { threshold: 0.15 };
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(revealCallback, observerOptions);
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    typeWriter();
});

// Scroll Progress
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.setAttribute('role', 'progressbar');
progressBar.setAttribute('aria-label', 'Page scroll progress');
progressBar.setAttribute('aria-valuemin', '0');
progressBar.setAttribute('aria-valuemax', '100');
document.body.prepend(progressBar);

window.onscroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
    progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
};

// Typewriter
const text = "Data Analyst — Python, SQL, R";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

window.addEventListener("resize", () => {
    if (vantaEffect) vantaEffect.resize();
});
