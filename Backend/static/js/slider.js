document.addEventListener("DOMContentLoaded", function () {
  let currentImageIndex = 0;
  const images = document.querySelectorAll('.carousel-image');
  const carousel = document.getElementById('carousel');
  const dotsContainer = document.getElementById('carouselDots');

  function updateCarousel() {
      const angle = -90 * currentImageIndex;
      carousel.style.transform = `rotateY(${angle}deg)`;
      updateDots();
  }

  function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentImageIndex);
      });
  }

  function rotateCarousel(direction) {
      currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
      updateCarousel();
  }

  // Buttons
  document.getElementById('prevBtn').addEventListener('click', () => rotateCarousel(-1));
  document.getElementById('nextBtn').addEventListener('click', () => rotateCarousel(1));

  // Create Dots
  images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
          currentImageIndex = index;
          updateCarousel();
      });
      dotsContainer.appendChild(dot);
  });

  // Initialize
  updateCarousel();

  // Auto-rotate
  let autoRotateInterval = setInterval(() => rotateCarousel(1), 5000);

  // Pause auto-rotate on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
  carousel.addEventListener('mouseleave', () => {
      autoRotateInterval = setInterval(() => rotateCarousel(1), 5000);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') rotateCarousel(-1);
      if (e.key === 'ArrowRight') rotateCarousel(1);
  });

  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  });

  function handleSwipe() {
      if (touchEndX < touchStartX) rotateCarousel(1);
      if (touchEndX > touchStartX) rotateCarousel(-1);
  }
});
