(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  function closeMobileMenu() {
    mobileToggle?.setAttribute('aria-expanded', 'false');
    mobileToggle?.setAttribute('aria-label', 'Відкрити меню');
    if (mobileMenu) mobileMenu.hidden = true;
  }

  mobileToggle?.addEventListener('click', () => {
    const opening = mobileToggle.getAttribute('aria-expanded') !== 'true';
    mobileToggle.setAttribute('aria-expanded', String(opening));
    mobileToggle.setAttribute('aria-label', opening ? 'Закрити меню' : 'Open navigation');
    if (mobileMenu) mobileMenu.hidden = !opening;
  });
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileMenu();
  });
  window.addEventListener('scroll', () => {
    header?.classList.toggle('header-scrolled', window.scrollY > 18);
  }, {passive:true});

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-category]');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projects.forEach(project => {project.hidden = filter !== 'all' && project.dataset.category !== filter;});
    });
  });

  const config = window.STUDIO_CONFIG || {};
  const email = typeof config.contactEmail === 'string' ? config.contactEmail.trim() : '';
  const emailReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const studioEmail = document.querySelector('[data-studio-email]');
  if (emailReady && studioEmail) {
    studioEmail.textContent = email;
    studioEmail.setAttribute('href', 'mailto:' + email);
  }

  const form = document.querySelector('#inquiry-form');
  const status = document.querySelector('#form-status');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!emailReady) {
      if (status) {
        status.textContent = 'Форму ще не підключено. Власнику студії потрібно вказати email у studio-config.js.';
        status.className = 'form-status warning';
      }
      return;
    }
    const data = new FormData(form);
    const value = field => String(data.get(field) || '').trim();
    const subject = `Заявка на сайт — ${value('service')}`;
    const body = `Вітаю, ${config.studioName || 'NovaWeb Studio'}!\n\nХочу обговорити проєкт.\n\nІм’я: ${value('name')}\nEmail: ${value('email')}\nПослуга: ${value('service')}\n\nДеталі проєкту:\n${value('details')}\n\nЗ повагою,\n${value('name')}`;
    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) {
      status.textContent = 'Відкрийте поштовий застосунок та надішліть підготовлений лист для завершення звернення.';
      status.className = 'form-status success';
    }
    window.location.href = href;
  });
})();
