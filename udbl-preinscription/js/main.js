/**
 * UDBL PreInscription - point d'entree JS
 * Initialise les comportements globaux
 */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 24px rgba(15,31,61,.25)'
        : 'none';
    });
  }

  const currentPage = decodeURIComponent(window.location.pathname.split('/').pop().toLowerCase() || 'index.html');
  document.querySelectorAll('.nav-links a[href]').forEach(link => {
    const href = decodeURIComponent(link.getAttribute('href').split('#')[0]);
    if (!href) return;
    const linkPage = href.split('/').pop().toLowerCase();
    if (linkPage === currentPage) {
      link.classList.add('nav-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.step-card, .feature-card, .stat-item, .quick-link-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });

  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .step-card.visible,
      .feature-card.visible,
      .stat-item.visible,
      .quick-link-card.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);
});
