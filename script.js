document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('#choreGrid input[type="checkbox"]');
  const progressText = document.getElementById('progressText');
  const total = checkboxes.length;

  function updateProgress() {
    const done = document.querySelectorAll('#choreGrid input[type="checkbox"]:checked').length;
    progressText.textContent = `${done} of ${total} chores complete`;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const card = cb.closest('.chore-card');
      card.style.opacity = cb.checked ? '0.6' : '1';
      card.style.textDecoration = cb.checked ? 'line-through' : 'none';
      updateProgress();
    });
  });

  updateProgress();

  // Smooth scroll for nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
