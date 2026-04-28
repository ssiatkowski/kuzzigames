document.addEventListener('DOMContentLoaded', () => {
  // ── Star rating renderer ──────────────────────────────────────────
  function renderStars(container) {
    const rating = parseFloat(container.dataset.rating);
    container.querySelectorAll('.star').forEach((star, i) => {
      const fill = Math.max(0, Math.min(1, rating - i));
      star.classList.remove('full', 'three-quarter', 'half', 'quarter');
      if      (fill >= 1)    star.classList.add('full');
      else if (fill >= 0.75) star.classList.add('three-quarter');
      else if (fill >= 0.5)  star.classList.add('half');
      else if (fill >= 0.25) star.classList.add('quarter');
    });
  }

  // ── Animate progress fill ─────────────────────────────────────────
  function animateProgress(card) {
    card.querySelectorAll('.progress-fill').forEach(fill => {
      // Store the target width then reset & animate
      const target = fill.style.width;
      fill.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.width = target;
        });
      });
    });
  }

  // ── Intersection Observer for scroll reveals ──────────────────────
  const cards = document.querySelectorAll('.game-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        card.classList.add('visible');

        // Slight delay so the card CSS transition fires first
        setTimeout(() => {
          card.querySelectorAll('.stars').forEach(renderStars);
          animateProgress(card);
        }, 200);

        obs.unobserve(card);
      });
    }, { root: null, rootMargin: '0px', threshold: 0.08 });

    cards.forEach(card => observer.observe(card));
  } else {
    // Fallback for old browsers
    cards.forEach(card => {
      card.classList.add('visible');
      card.querySelectorAll('.stars').forEach(renderStars);
      animateProgress(card);
    });
  }
});
