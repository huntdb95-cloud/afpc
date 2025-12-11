// scripts.js
// Basic interactivity for All Florida Plumbing Contractors

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initYear();
  initSliders();
});

/**
 * Mobile nav toggle
 */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      toggle.classList.remove("is-open");
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * Footer year
 */
function initYear() {
  const span = document.getElementById("year");
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}

/**
 * Generic slider for hero & reviews
 * Markup requirements:
 * - Container with [data-slider]
 * - Children slides with class ".slide"
 * - Optional buttons with [data-slider-prev] & [data-slider-next]
 * - Optional dot container ".slider-dots"
 */
function initSliders() {
  const sliders = document.querySelectorAll("[data-slider]");
  sliders.forEach(setupSlider);
}

function setupSlider(sliderEl) {
  const slides = Array.from(sliderEl.querySelectorAll(".slide"));
  if (slides.length <= 1) return;

  const prevBtn = sliderEl.querySelector("[data-slider-prev]");
  const nextBtn = sliderEl.querySelector("[data-slider-next]");
  const dotsContainer = sliderEl.querySelector(".slider-dots");

  let current = slides.findIndex((s) => s.classList.contains("is-active"));
  if (current === -1) current = 0;

  // Dots
  let dots = [];
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    dots = slides.map((_, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      if (index === current) btn.classList.add("is-active");
      btn.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(btn);
      return btn;
    });
  }

  function goToSlide(index) {
    if (index === current) return;

    slides[current].classList.remove("is-active");
    slides[index].classList.add("is-active");
    if (dots.length) {
      dots[current].classList.remove("is-active");
      dots[index].classList.add("is-active");
    }
    current = index;
  }

  function goNext() {
    const nextIndex = (current + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function goPrev() {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goNext();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goPrev();
      restartAutoplay();
    });
  }

  // Autoplay
  let autoplayId = null;
  const autoplay = sliderEl.dataset.autoplay === "true";
  const interval = parseInt(sliderEl.dataset.interval, 10) || 7000;

  function startAutoplay() {
    if (!autoplay) return;
    stopAutoplay();
    autoplayId = setInterval(goNext, interval);
  }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause on hover (desktop-ish)
  sliderEl.addEventListener("mouseenter", stopAutoplay);
  sliderEl.addEventListener("mouseleave", startAutoplay);

  startAutoplay();
}
