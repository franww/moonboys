const enterScreen = document.getElementById('enter-screen');
const heroAudio = document.getElementById('hero-audio');

async function enterSite() {
  if (!enterScreen) return;

  if (heroAudio) {
    heroAudio.volume = 0.82;

    try {
      await heroAudio.play();
    } catch (error) {
      console.log('Audio blocked or file not found:', error);
    }
  }

  enterScreen.classList.add('hide');
  document.body.classList.remove('entering');

  setTimeout(() => {
    enterScreen.style.display = 'none';
  }, 800);
}

if (enterScreen) {
  enterScreen.addEventListener('click', enterSite);
}

const nav = document.querySelector('.nav');
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function updateNavBackground() {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 40);
}

window.addEventListener('scroll', updateNavBackground, { passive: true });
updateNavBackground();

if (mobileBtn && mobileMenu) {
  let open = false;

  const toggleMenu = () => {
    open = !open;
    mobileBtn.classList.toggle('open', open);
    mobileBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.style.maxHeight = open ? `${mobileMenu.scrollHeight}px` : '0px';
  };

  mobileBtn.addEventListener('click', toggleMenu);

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (open) toggleMenu();
    });
  });
}

const revealEls = document.querySelectorAll('.fade-in, .fade-in-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  revealObserver.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const y = window.scrollY + 150;
  let active = '';

  sections.forEach((section) => {
    if (y >= section.offsetTop && y < section.offsetTop + section.offsetHeight) {
      active = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === `#${active}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();