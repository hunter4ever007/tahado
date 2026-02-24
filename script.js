// Tahado Landing Page JS (no frameworks)

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* Year */
$("#year").textContent = new Date().getFullYear();

/* Smooth scroll (with header offset) */
const header = $(".topbar");
const headerOffset = () => header ? header.getBoundingClientRect().height : 0;

function smoothScrollTo(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const y = window.scrollY + target.getBoundingClientRect().top - headerOffset() - 10;
  window.scrollTo({ top: y, behavior: "smooth" });
}

$$("[data-scroll]").forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);

      // Close mobile menu if open
      closeNav();
    }
  });
});

/* Mobile nav toggle */
const toggle = $(".nav-toggle");
const links = $("#navLinks");
const languageToggle = $(".language-toggle");

function openNav() {
  links?.classList.add("is-open");
  toggle?.setAttribute("aria-expanded", "true");
}
function closeNav() {
  links?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
}

toggle?.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  expanded ? closeNav() : openNav();
});

// Language toggle functionality
languageToggle?.addEventListener("click", () => {
  // This will be handled by the lang.js file
  // But we need to close the mobile menu after language change
  closeNav();
});

document.addEventListener("click", (e) => {
  if (!links || !toggle) return;
  const clickedInside = links.contains(e.target) || toggle.contains(e.target) || languageToggle?.contains(e.target);
  if (!clickedInside) closeNav();
});

/* Ripple effect on buttons/links */
function addRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  el.style.setProperty("--ripple-x", `${x}px`);
  el.style.setProperty("--ripple-y", `${y}px`);

  el.classList.remove("rippling");
  // Force reflow to restart animation
  void el.offsetWidth;
  el.classList.add("rippling");

  // Cleanup
  setTimeout(() => el.classList.remove("rippling"), 650);
}

$$(".ripple").forEach(el => {
  el.addEventListener("pointerdown", addRipple);
});

/* Intersection Observer reveal */
const revealEls = $$(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

/* Floating elements: subtle drift using JS (extra softness) */
const floatItems = $$(".float-item");
let t = 0;

function animateFloat() {
  t += 0.008;
  floatItems.forEach((el, idx) => {
    const amp = 6 + (idx % 3) * 2;      // small amplitude
    const speed = 0.8 + (idx % 4) * 0.2;
    const x = Math.sin(t * speed + idx) * amp;
    el.style.transform = `translateX(${x}px)`;
  });
  requestAnimationFrame(animateFloat);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reduceMotion.matches) animateFloat();