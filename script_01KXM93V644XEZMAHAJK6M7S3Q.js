// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  const backToTop = document.getElementById('backToTop');
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

// ===== Mobile menu toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Back to top =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Animated stat counters =====
const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  statNums.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));
    const step = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = current.toLocaleString();
        requestAnimationFrame(step);
      }
    };
    step();
  });
}

const statsSection = document.querySelector('.stats-strip');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      animateStats();
      statsAnimated = true;
    }
  });
}, { threshold: 0.4 });
if (statsSection) statsObserver.observe(statsSection);

// ===== Menu filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    menuCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ===== Newsletter form (front-end only demo) =====
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  if (email) {
    newsletterMsg.textContent = `Thanks! We'll send updates to ${email}.`;
    newsletterForm.reset();
  }
});

// ===== Fade-in on scroll for sections =====
const revealTargets = document.querySelectorAll('.menu-card, .mini-card, .location-card, .review-card');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ===== Smooth scroll for nav anchors (fallback for older browsers) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
