// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.game-card');

  // If IntersectionObserver is available, use it to reveal cards on scroll
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cards.forEach(card => {
      revealOnScroll.observe(card);
    });
  } else {
    // Fallback: if IntersectionObserver isn't supported, simply make all cards visible
    cards.forEach(card => card.classList.add('visible'));
  }
});
