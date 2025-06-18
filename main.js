// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.game-card');

  // Function to animate star ratings
  function animateStars() {
    const starContainers = document.querySelectorAll('.stars');
    starContainers.forEach(container => {
      const rating = parseFloat(container.dataset.rating);
      const stars = container.querySelectorAll('.star');

      stars.forEach((star, index) => {
        const fillAmount = Math.max(0, Math.min(1, rating - index));

        // Remove existing classes
        star.classList.remove('full', 'three-quarter', 'half', 'quarter');

        // Add appropriate class based on fill amount
        if (fillAmount >= 1) {
          star.classList.add('full');
        } else if (fillAmount >= 0.75) {
          star.classList.add('three-quarter');
        } else if (fillAmount >= 0.5) {
          star.classList.add('half');
        } else if (fillAmount >= 0.25) {
          star.classList.add('quarter');
        }
      });
    });
  }

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
          // Animate stars when card becomes visible
          setTimeout(() => {
            animateStars();
          }, 300);
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
    // Animate stars immediately
    animateStars();
  }
});
