
(function(){
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 650));

  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const compact = window.scrollY > 40;
    header.classList.toggle('compact', compact);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const sections = Array.from(document.querySelectorAll('.section-observed'));
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', active);
        });
      }
    });
  }, { threshold: 0.45, rootMargin: '-10% 0px -40% 0px' });
  sections.forEach(section => activeObserver.observe(section));

  const spotlightLabel = document.getElementById('spotlightLabel');
  const spotlightTitle = document.getElementById('spotlightTitle');
  const spotlightText = document.getElementById('spotlightText');
  const originCards = Array.from(document.querySelectorAll('.origin-card'));

  const setSpotlight = (card) => {
    originCards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');
    spotlightLabel.textContent = card.dataset.label || '';
    spotlightTitle.textContent = card.dataset.title || '';
    spotlightText.textContent = card.dataset.text || '';
  };

  originCards.forEach(card => {
    ['mouseenter','focus','click'].forEach(evt => {
      card.addEventListener(evt, () => setSpotlight(card));
    });
  });

  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    feedback.textContent = 'Thank you — your email draft is opening now.';
    feedback.classList.add('success');
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}
Email: ${email}

${message}`);
    setTimeout(() => {
      window.location.href = `mailto:hello@drestee.com?subject=${subject}&body=${body}`;
    }, 250);
  });
})();
