// =====================
// SCROLL REVEAL
// =====================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-fade');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// =====================
// NAVBAR SCROLL STYLE
// =====================
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 40
      ? 'rgba(10,10,10,0.98)'
      : 'rgba(10,10,10,0.85)';
  });
}

// =====================
// "MY WORK" — smooth scroll to #projects on homepage
// On other pages it navigates to index.html#projects normally
// =====================
document.querySelectorAll('.nav-scroll').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.dataset.target;
    const target = document.getElementById(targetId);
    if (target) {
      // We're on the homepage — scroll smoothly
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      // We're on another page — navigate to homepage and let it scroll
      this.href = 'index.html#projects';
    }
  });
});

// If page loads with #projects in URL, scroll to it after a tiny delay
window.addEventListener('load', () => {
  if (window.location.hash === '#projects') {
    setTimeout(() => {
      const target = document.getElementById('projects');
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 300);
  }
});

// =====================
// HERO SLIDESHOW
// =====================
const slides     = document.querySelectorAll('.slide');
const dots       = document.querySelectorAll('.slide-dot');
const slideLabel = document.getElementById('slideLabel');

const labels = ['BACKEND', 'DEVELOPER', 'BUILDER'];

let current = 0;
let timer   = null;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  if (slideLabel) {
    slideLabel.style.opacity = '0';
    setTimeout(() => {
      slideLabel.textContent = labels[current];
      slideLabel.style.opacity = '1';
    }, 300);
  }
}

function nextSlide() {
  goToSlide((current + 1) % slides.length);
}

function startTimer() {
  timer = setInterval(nextSlide, 4500);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.index));
    resetTimer();
  });
});

if (slides.length > 0) {
  if (slideLabel) slideLabel.style.transition = 'opacity 0.4s ease';
  startTimer();
}
