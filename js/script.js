document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  if (!header) return; // Esta página no tiene ese header

  const button = header.querySelector('.hamburger');
  if (!button) return; // No hay botón hamburguesa

  const controlsId = button.getAttribute('aria-controls');
  const menu = controlsId ? document.getElementById(controlsId) : null;
  if (!menu) return; // No existe el nav con ese id

  const links = menu.querySelectorAll('a');

function toggleMenu(force) {
  const isOpen = force ?? (button.getAttribute('aria-expanded') === 'false');
  button.setAttribute('aria-expanded', String(isOpen));
  header.classList.toggle('open', isOpen);

  // bloqueo de scroll en móvil
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // manejar overlay clickeable
  const existing = document.getElementById('menu-overlay');
  if (isOpen) {
    if (!existing) {
      const ov = document.createElement('div');
      ov.id = 'menu-overlay';
      // cerrar al clickear el overlay
      ov.addEventListener('click', () => toggleMenu(false), { passive: true });
      document.body.appendChild(ov);
    }
  } else {
    existing && existing.remove();
  }
}

  button.addEventListener('click', () => toggleMenu());
  links.forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      button.focus();
    }
  });

  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', () => { if (mq.matches) toggleMenu(false); });
});
