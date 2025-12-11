// scripts.js – slider, nav toggle, and auto-year updater

document.addEventListener("DOMContentLoaded", () => {
  // NAV TOGGLE
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-open");
      siteNav.classList.toggle("is-open");
    });
  }

  // AUTO YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // SLIDER LOGIC
  document.querySelectorAll("[data-slider]").forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const prev = slider.querySelector("[data-slider-prev]");
    const next = slider.querySelector("[data-slider-next]");
    const dotsContainer = slider.querySelector(".afpc-slider-dots");

    if (!slides.length) return;

    let current = 0;
    const total = slides.length;

    // create dots
    const dots = [];
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        if (i === 0) dot.classList.add("is-active");
        dotsContainer.appendChild(dot);
        dots.push(dot);
        dot.addEventListener("click", () => goToSlide(i));
      });
    }

    function showSlide(i) {
      slides.forEach((s, idx) => {
        s.classList.toggle("is-active", idx === i);
      });
      dots.forEach((d, idx) => {
        d.classList.toggle("is-active", idx === i);
      });
    }

    function goToSlide(i) {
      current = (i + total) % total;
      showSlide(current);
    }

    if (prev) prev.addEventListener("click", () => goToSlide(current - 1));
    if (next) next.addEventListener("click", () => goToSlide(current + 1));

    // autoplay
    const autoplay = slider.dataset.autoplay === "true";
    const interval = parseInt(slider.dataset.interval) || 5000;

    if (autoplay) {
      setInterval(() => {
        goToSlide(current + 1);
      }, interval);
    }

    // initialize
    showSlide(current);
  });
});
