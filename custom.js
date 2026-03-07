let vantaEffect = null;

function initVanta() {
  if (typeof VANTA === "undefined") {
    setTimeout(initVanta, 100);
    return;
  }
  if (vantaEffect) vantaEffect.destroy();
  vantaEffect = VANTA.TOPOLOGY({
    el: "body",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x3c71f7,
    backgroundColor: 0x121212,
  });
}

// Wait for full page load so Vanta scripts are guaranteed available
window.addEventListener("load", () => {
  // Delay Vanta init to ensure body has dimensions before rendering
  setTimeout(initVanta, 100);

  // Set dynamic year if element exists
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Match notification width to columns layout
  const columns = document.querySelectorAll(".column.is-narrow");
  if (columns.length >= 2) {
    const left = columns[0].getBoundingClientRect();
    const right = columns[1].getBoundingClientRect();
    const totalWidth = right.right - left.left;
    const notification = document.querySelector(".notification");
    if (notification) notification.style.width = totalWidth + "px";
  }

  // Fade out loader
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (!loader) return;
    loader.style.transition = "opacity 0.3s ease";
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 300);
  }, 800);
});

// Fallback for Safari bfcache - fires when page is restored from cache
window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    setTimeout(initVanta, 100);
  }
});

// Reinitialize Vanta on resize to prevent stretching
let resizeTimer;
let lastWidth = window.innerWidth;

window.addEventListener("resize", () => {
  const currentWidth = window.innerWidth;
  if (currentWidth === lastWidth) return; // ignore height-only changes
  lastWidth = currentWidth;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initVanta, 300);
});

// Fade out on nav-link click then navigate
document.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link");
  if (!link || !link.href || link.origin !== window.location.origin) return;
  e.preventDefault();

  const loader = document.createElement("div");
  loader.style.cssText =
    "position:fixed;top:0;left:0;width:100vw;height:100dvh;background:#121212;z-index:9999;opacity:0;transition:opacity 0.3s ease;";
  document.body.appendChild(loader);

  requestAnimationFrame(() => {
    loader.style.opacity = "1";
    setTimeout(() => {
      window.location.href = link.href;
    }, 300);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button",
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  document
    .querySelector('a[aria-label="Email"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("contact@dannyphamv.com").then(() => {
        const el = document.querySelector('a[aria-label="Email"]');
        el.dataset.tooltip = "Copied!";
        setTimeout(() => {
          el.dataset.tooltip = "Contact";
        }, 1500);
      });
    });
});
