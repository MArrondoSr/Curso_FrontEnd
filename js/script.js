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

//codigo de personalizacion


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-custom");
  const nombreInput = document.getElementById("nombre");
  const colorSelect = document.getElementById("color");
  const mensajeDiv = document.getElementById("mensaje");
  const resetBtn = document.getElementById("reset");

  resetBtn.style.display = "none";


  // 🔹 Función para mostrar el saludo
  function mostrarSaludo(nombre, color) {
    document.body.style.backgroundColor = color;
    form.style.display = "none"; // ocultar formulario
    mensajeDiv.textContent = `Hola, ${nombre} 👋`;
    mensajeDiv.style.display = "block";
    resetBtn.style.display = "inline-block";

  }

  // 🔹 Al cargar la página, aplicar preferencias guardadas
  const savedName = localStorage.getItem("nombre");
  const savedColor = localStorage.getItem("color");

  if (savedName && savedColor) {
    mostrarSaludo(savedName, savedColor);
  }

  // 🔹 Escuchar envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    const nombre = nombreInput.value.trim();
    const color = colorSelect.value;

    if (!nombre || !color) {
      alert("Por favor, completá tu nombre y elegí un color.");
      return;
    }

    // Guardar en localStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("color", color);

    // Mostrar saludo
    mostrarSaludo(nombre, color);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear();
  document.getElementById("form-custom").style.display = "block";
  document.getElementById("mensaje").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.body.style.backgroundColor = "";
});






