// Optimisations de lazy loading avec Intersection Observer

document.addEventListener('DOMContentLoaded', function() {
  // Configuration de l'Intersection Observer
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Charger l'image si elle n'est pas déjà chargée
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }

        // Ajouter la classe loaded pour l'animation
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });

        // Si l'image est déjà chargée (cache), ajouter la classe immédiatement
        if (img.complete) {
          img.classList.add('loaded');
        }

        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px', // Commencer le chargement 50px avant que l'image soit visible
    threshold: 0.01
  });

  // Observer toutes les images avec loading="lazy"
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // Optimisation spéciale pour les images du carousel
  const carouselImages = document.querySelectorAll('.carousel-item img');
  carouselImages.forEach(img => {
    img.addEventListener('load', function() {
      img.classList.add('loaded');
    });

    // Si l'image est déjà chargée
    if (img.complete) {
      img.classList.add('loaded');
    }
  });

  // Optimisation pour les images de la section about
  const aboutImages = document.querySelectorAll('.picture img');
  aboutImages.forEach(img => {
    img.addEventListener('load', function() {
      img.classList.add('loaded');
    });

    if (img.complete) {
      img.classList.add('loaded');
    }
  });

  // Fallback pour les navigateurs qui ne supportent pas Intersection Observer
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
});

// Optimisation pour les images critiques (above the fold)
document.addEventListener('DOMContentLoaded', function() {
  const criticalImages = document.querySelectorAll('img[fetchpriority="high"]');
  criticalImages.forEach(img => {
    img.addEventListener('load', function() {
      img.classList.add('loaded');
      // Optimisation LCP : forcer le rendu
      img.style.opacity = '1';
    });

    if (img.complete) {
      img.classList.add('loaded');
      img.style.opacity = '1';
    }
  });

  // Optimisation LCP : prioriser le rendu du titre
  const title = document.querySelector('.top-header .name');
  if (title) {
    title.style.opacity = '1';
    title.style.transform = 'translateZ(0)';
  }
});

// Optimisation LCP : chargement prioritaire des éléments critiques
window.addEventListener('load', function() {
  // Forcer le rendu des éléments critiques
  const criticalElements = document.querySelectorAll('.top-header, #about, .carousel-item.active');
  criticalElements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateZ(0)';
  });
});
