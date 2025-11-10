// LOADER
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1000);
});

// HEADER SCROLL EFFECT
const header = document.getElementById("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// MOBILE MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

function openMenu() {
  mobileMenu.classList.add("active");
  menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenuFunc() {
  mobileMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

hamburger.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFunc);
menuOverlay.addEventListener("click", closeMenuFunc);

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenuFunc);
});

// SCROLL REVEAL ANIMATION
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

reveals.forEach((reveal) => {
  revealObserver.observe(reveal);
});

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter-number");
let counterAnimated = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + (target === 999 ? "+" : "+");
            }
          };

          updateCounter();
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const counterSection = document.querySelector(".counter-section");
if (counterSection) {
  counterObserver.observe(counterSection);
}

// TESTIMONIAL CAROUSEL
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Auto advance testimonials every 5 seconds
setInterval(nextSlide, 5000);

// SMOOTH SCROLL FOR NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
