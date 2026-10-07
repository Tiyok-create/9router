const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const navbar = document.getElementById('navbar');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const backToTop = document.getElementById('backToTop');
const typedText = document.getElementById('typedText');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');
const revealItems = document.querySelectorAll('.fade-in-up');

const roles = ['Designer', 'Developer', 'Creator'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedText) return;

  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    charIndex++;
    typedText.textContent = currentWord.slice(0, charIndex);

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    charIndex--;
    typedText.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const delay = isDeleting ? 60 : 120;
  setTimeout(typeLoop, delay);
}

if (typedText) {
  typeLoop();
}

function handleScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  if (navbar) {
    if (window.scrollY > 120) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (backToTop) {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

if (mobileToggle && navLinksContainer) {
  mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');

    if (navLinksContainer && navLinksContainer.classList.contains('open')) {
      navLinksContainer.classList.remove('open');
    }
  });
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

try {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
} catch (error) {
  console.warn('Theme preference could not be loaded:', error);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle('active', item === button));

    skillCards.forEach((card) => {
      const shouldShow = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.style.display = shouldShow ? 'flex' : 'none';
    });
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const projectData = {
  'pulse-finance': {
    title: 'Pulse Finance',
    subtitle: 'Mobile App Design',
    image: 'assets/images/project-mobile.jpg',
    description:
      'A mobile-first personal finance app designed to help users understand spending habits, plan budgets, and take control of their financial goals with less friction.',
    features: [
      'Smart budget dashboard',
      'Subscription tracking',
      'Goal-based financial planning',
      'Minimal, intuitive interface'
    ],
    cta: 'Start your mobile app project'
  },
  'nova-cart': {
    title: 'Nova Cart',
    subtitle: 'E-commerce Experience',
    image: 'assets/images/project-ecommerce.jpg',
    description:
      'A premium storefront built to improve product discovery, strengthen trust, and turn browsing into conversions with a refined shopping journey.',
    features: [
      'Responsive storefront design',
      'High-converting product flow',
      'Brand-centered visual direction',
      'SEO-friendly structure'
    ],
    cta: 'Build a stronger storefront'
  },
  'signal-insights': {
    title: 'Signal Insights',
    subtitle: 'Analytics Dashboard',
    image: 'assets/images/project-analytics.jpg',
    description:
      'A data dashboard concept for teams who need an immediate view of performance indicators, growth trends, and operational health in one place.',
    features: [
      'Unified KPI overview',
      'Clean data visualization',
      'Decision-focused layout',
      'Simplified analysis workflows'
    ],
    cta: 'Design a smarter dashboard'
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const modalFeatures = document.getElementById('modalFeatures');
const modalCta = document.getElementById('modalCta');
const closeModalButton = document.getElementById('closeModal');

function openModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalSubtitle.textContent = project.subtitle;
  modalDescription.textContent = project.description;
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalCta.textContent = project.cta;
  modalCta.href = '#contact';

  modalFeatures.innerHTML = project.features
    .map((feature) => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5L9.5 17L19 7.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>${feature}</li>`)
    .join('');

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-modal-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    openModal(button.dataset.project);
  });
});

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});

if (contactForm && toast) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    toast.classList.add('show');
    contactForm.reset();

    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  });
}
