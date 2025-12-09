// =========================
// PÁGINA CARRITO_COMPRA
// =========================

function renderCarritoPage() {
  const contenedor = document.getElementById("carrito-items");
  const resumen = document.getElementById("carrito-resumen");
  if (!contenedor || !resumen) return;

  contenedor.innerHTML = "";
  resumen.innerHTML = "";

  const carrito = getCarrito();  // de carrito_base.js

  if (!carrito.length) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;

  carrito.forEach((p) => {
    const qty = p.cantidad || 1;
    const subtotal = p.precio * qty;
    total += subtotal;

    const card = document.createElement("article");
    card.className = "carrito-card";

      // Imagen
    const img = document.createElement("img");
    img.className = "carrito-card__img";
    img.src = p.imagen;
    img.alt = p.nombre || "";
    img.loading = "lazy";

      // Contenedor de texto
    const info = document.createElement("div");
    info.className = "carrito-card__info";

    const title = document.createElement("h3");
    title.className = "carrito-card__titulo";
    title.textContent = p.nombre;

    const desc = document.createElement("p");
    desc.className = "carrito-card__desc";
    desc.textContent = p.descripcion || "";

    const estado = document.createElement("p");
    estado.className = "carrito-card__estado";
    estado.textContent = `${qty} en el carrito (v3)`;

    const lineaPrecio = document.createElement("p");
    lineaPrecio.className = "carrito-card__precio";
    lineaPrecio.textContent = `Precio unitario: $ ${p.precio}`;

    const lineaSubtotal = document.createElement("p");
    lineaSubtotal.className = "carrito-card__subtotal";
    lineaSubtotal.textContent = `Subtotal: $ ${subtotal}`;

    const controles = document.createElement("div");
    controles.className = "carrito-card__controles";

    controles.innerHTML = `
      <button class="carrito-btn carrito-btn--menos" data-id="${p.id}">−</button>
      <span class="carrito-card__cantidad">${qty}</span>
      <button class="carrito-btn carrito-btn--mas" data-id="${p.id}">+</button>
      <button class="carrito-btn carrito-btn--quitar" data-id="${p.id}">Quitar</button>
    `;

    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(estado);
    info.appendChild(lineaPrecio);
    info.appendChild(lineaSubtotal);
    info.appendChild(controles);

    card.appendChild(img);
    card.appendChild(info);

    contenedor.appendChild(card);
  });

  const totalP = document.createElement("p");
  totalP.className = "carrito-total";
  totalP.textContent = `Total de la compra: $ ${total}`;

  resumen.appendChild(totalP);
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarritoPage = document.getElementById("carrito-items");
  if (!contenedorCarritoPage) return;  // por seguridad

  // Mostrar carrito al entrar
  renderCarritoPage();

  contenedorCarritoPage.addEventListener("click", (e) => {
    const btnMas = e.target.closest(".carrito-btn--mas");
    const btnMenos = e.target.closest(".carrito-btn--menos");
    const btnQuitar = e.target.closest(".carrito-btn--quitar");

    if (!btnMas && !btnMenos && !btnQuitar) return;

    const btn = btnMas || btnMenos || btnQuitar;
    const id = btn.dataset.id;
    if (!id) return;

    let carrito = getCarrito();
    const item = carrito.find(p => String(p.id) === String(id));
    if (!item) return;

    // ➕ sumar unidad
    if (btnMas) {
      item.cantidad = (item.cantidad || 1) + 1;
    }

    // ➖ restar unidad
    if (btnMenos) {
      item.cantidad = (item.cantidad || 1) - 1;
      // si baja a 0 o menos, lo sacamos del carrito
      if (item.cantidad <= 0) {
        carrito = carrito.filter(p => String(p.id) !== String(id));
      }
    }

    // 🗑 quitar directamente
    if (btnQuitar) {
      carrito = carrito.filter(p => String(p.id) !== String(id));
    }

    setCarrito(carrito);       // guardamos cambios en localStorage
    renderCarritoPage();       // refrescamos la vista del carrito
  });

  const btnSeguir = document.getElementById("btn-seguir-comprando");
  btnSeguir?.addEventListener("click", () => {
    window.location.href = "prod_serv.html";   // o el nombre real de tu page de productos
  });

  const btnVaciarPage = document.getElementById("btn-vaciar-carrito-page");
  btnVaciarPage?.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    renderCarritoPage();
  });

  const btnPagar = document.getElementById("btn-ir-a-pagar");
  btnPagar?.addEventListener("click", () => {
    alert("Aquí iría el proceso de pago (futuro).");
  });

});

  
