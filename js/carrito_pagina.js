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
    estado.textContent = `${qty} en el carrito`;

    const lineaPrecio = document.createElement("p");
    lineaPrecio.className = "carrito-card__precio";
    lineaPrecio.textContent = `Precio unitario: $ ${p.precio}`;

    const lineaSubtotal = document.createElement("p");
    lineaSubtotal.className = "carrito-card__subtotal";
    lineaSubtotal.textContent = `Subtotal: $ ${subtotal}`;


    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(estado);
    info.appendChild(lineaPrecio);
    info.appendChild(lineaSubtotal);

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
