// scripts.js – nav toggle, sliders, and auto year

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
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // GENERIC SLIDER LOGIC
  document.querySelectorAll("[data-slider]").forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    if (!slides.length) return;

    const prevBtn = slider.querySelector("[data-slider-prev]");
    const nextBtn = slider.querySelector("[data-slider-next]");
    const dotsContainer = slider.querySelector(".afpc-slider-dots");

    let current = 0;
    const total = slides.length;
    const dots = [];

    // Create dots if container exists
    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        if (index === 0) dot.classList.add("is-active");
        dotsContainer.appendChild(dot);
        dots.push(dot);

        dot.addEventListener("click", () => goToSlide(index));
      });
    }

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === current);
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === current);
      });
    }

    function goToSlide(index) {
      current = (index + total) % total; // wrap around
      updateSlides();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => goToSlide(current - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => goToSlide(current + 1));
    }

    // Autoplay
    const autoplay = slider.dataset.autoplay === "true";
    const interval = parseInt(slider.dataset.interval, 10) || 5000;

    if (autoplay) {
      setInterval(() => {
        goToSlide(current + 1);
      }, interval);
    }

    // INITIALIZE
    updateSlides();
  });
});
