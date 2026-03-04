let vantaEffect = null;

function initVanta() {
  if (vantaEffect) vantaEffect.destroy();
  vantaEffect = VANTA.TOPOLOGY({
    el: "body",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x3c71f7,
    backgroundColor: 0x121212,
  });
}

initVanta();

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initVanta, 300);
});

window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.transition = "opacity 0.3s ease";
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 300);
  }, 300);
});

document.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link");
  if (!link || !link.href || link.origin !== window.location.origin) return;
  e.preventDefault();

  const loader = document.createElement("div");
  loader.style.cssText =
    "position:fixed;top:0;left:0;width:100vw;height:100vh;background:#121212;z-index:9999;opacity:0;transition:opacity 0.3s ease;";
  document.body.appendChild(loader);

  requestAnimationFrame(() => {
    loader.style.opacity = "1";
    setTimeout(() => {
      window.location.href = link.href;
    }, 300);
  });
});

window.addEventListener('load', () => {
    const columns = document.querySelectorAll('.column.is-narrow');
    if (columns.length >= 2) {
        const left = columns[0].getBoundingClientRect();
        const right = columns[1].getBoundingClientRect();
        const totalWidth = right.right - left.left;
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.width = totalWidth + 'px';
        }
    }
});

document.getElementById('year').textContent = new Date().getFullYear();