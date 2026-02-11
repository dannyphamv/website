document.getElementById("year").textContent = new Date().getFullYear();
const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");
const html = document.documentElement;

// Check for saved theme or system preference
const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

// Apply the theme on load
html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

toggleBtn.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);

    /* --- MOBILE REPAINT FIX START --- */
    // Briefly "touch" the body style to force a repaint
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger a reflow
    document.body.style.display = '';
    /* --- MOBILE REPAINT FIX END --- */
});

function updateIcon(theme) {
    icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-regular fa-moon";
}

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Once it's revealed, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Target all elements with the .reveal class
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(el => observer.observe(el));
});

const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

window.onscroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {
        // Move the glow to the cursor's current X and Y coordinates
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // Optional: Hide the glow when the mouse leaves the window
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        // Change this from '0.08' to '1'
        glow.style.opacity = '1';
    });
});

const text = "Data Analyst — Python, SQL, R";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

document.addEventListener('DOMContentLoaded', typeWriter);