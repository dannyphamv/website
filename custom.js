const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) =>
    new bootstrap.Tooltip(tooltipTriggerEl, {
      offset: [0, 15],
    }),
);

let vantaEffect = VANTA.TOPOLOGY({
  el: document.body,
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  backgroundColor: 0x212529,
  color: 0x017FC0
});

function ensureVanta() {
  if (!vantaEffect) {
    vantaEffect = VANTA.TOPOLOGY({
      el: document.body,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: 0x212529,
      color: 0x017FC0
    });
  }
}

window.addEventListener('resize', () => {
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }
  ensureVanta();
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) ensureVanta();
});

window.addEventListener('focus', ensureVanta);

const sectionOrder = ["home", "experience", "education", "projects", "skills"];
let currentSection = "home";
let isAnimating = false;

const navLinks = document.querySelectorAll("#main-nav .nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const target = this.getAttribute("data-section");
    if (target === currentSection || isAnimating) return;

    isAnimating = true;

    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");

    const currentEl = document.getElementById(currentSection);
    const targetEl = document.getElementById(target);

    currentEl.classList.add("fade-out");

    setTimeout(() => {
      currentEl.classList.remove("active-section", "fade-out");

      targetEl.classList.add("active-section", "fade-in");

      setTimeout(() => {
        targetEl.classList.remove("fade-in");
        isAnimating = false;
      }, 350);

      currentSection = target;
    }, 300);
  });
});

document.querySelector("footer .text-body-secondary").textContent =
  `© ${new Date().getFullYear()} Danny Pham`;
