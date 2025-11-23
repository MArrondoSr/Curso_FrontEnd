// =========================
// CARRITO DE COMPRAS DINÁMICO
// =========================

document.addEventListener('DOMContentLoaded', () => {
  // === 1) Array de productos ===
  let productos = [
    {
      id: "001",
      name: "Recetarios / Blocks",
      description:
        "10 Blocks de 100 recetarios / orden de laboratorio / notas , (1000 hojas en total). Impresos 1/0 tinta negra sobre papel obra de 80 grs., medida 15 x 21 cm. Calidad y buena presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "60000",
      image: "../imagenes/recetas.png",
    },
    {
      id: "002",
      name: "Tarjetas Full Color",
      description:
        "100 tarjetas impresión láser full color en cartulina 330 grs. Medidas 9 x 5 cm. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "25000",
      image: "../imagenes/tarjetas.png",
    },
    {
      id: "003",
      name: "Tarjetas Clásicas 1/0",
      description:
        "100 tarjetas impresión offset tinta negra en cartulina 240 grs. Medidas 9 x 5 cm. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "20000",
      image: "../imagenes/tarjetas2.jpg",
    },
    {
      id: "004",
      name: "Turneros",
      description:
        "10 blocks de turneros, formato 6 x 8 cm., impresos en 1 color. Cada block trae 100 formularios. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "90000",
      image: "../imagenes/turneros.png",
    },
    {
      id: "005",
      name: "Talonarios de facturas / recibos",
      description:
        "5 talonarios de factura / recibo / remito, formato 17 x 21 cm., con duplicado en papel color. Numerado. Cumplen normas fiscales vigentes. Cada talonario trae 50 formularios, original y duplicado.",
      amount: "90000",
      image: "../imagenes/facturas.jpg",
    },
    {
      id: "006",
      name: "Volantes comerciales / Flyers",
      description:
        "1000 volantes formato A5, impresos a un color sobre papel obra de 70 grs., simple faz. Incluye armado de original y entrega en CABA o Zona Norte.",
      amount: "40000",
      image: "../imagenes/volantes.jpg",
    },
  ];

  // === 2) Render dinámico de cards ===
  const contenedorProductos = document.querySelector(".productos");
  if (contenedorProductos) {
    productos.forEach((p) => {
      const article = document.createElement('article');
      article.className = 'articulo';

      const img = document.createElement('img');
      img.className = 'articulo__img';
      img.src = p.image;
      img.alt = p.name;
      img.loading = 'lazy';

      const desc = document.createElement('p');
      desc.className = 'articulo__desc';
      desc.textContent = p.description;

      const h3 = document.createElement('h3');
      h3.className = 'articulo__titulo';
      h3.textContent = p.name;

      const btn = document.createElement('button');
      btn.className = 'articulo__btn agregar-carrito';
      btn.dataset.id = p.id;
      btn.dataset.nombre = p.name;
      btn.dataset.precio = p.amount;
      btn.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping"></i>`;

      const price = document.createElement('p');
      price.className = 'articulo__precio';
      price.textContent = '$ ' + (p.amount);

      article.appendChild(img);
      article.appendChild(desc);
      article.appendChild(h3);
      article.appendChild(price);
      article.appendChild(btn);

      contenedorProductos.appendChild(article);
      // document.querySelector('.productos').appendChild(article);
    });
  }

  // === 3) Delegación de eventos (para las cards generadas) ===
  contenedorProductos?.addEventListener("click", (e) => {
    const btn = e.target.closest(".agregar-carrito");
    if (!btn) return;

    const producto = {
      id: btn.dataset.id,
      nombre: btn.dataset.nombre,
      precio: Number(btn.dataset.precio),
    };

    agregarProducto(producto);
    cargarCarrito();
  });

  // === 4) Botón Vaciar Carrito ===
  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar?.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    cargarCarrito();
  });

  // === 5) Cargar carrito al inicio ===
  cargarCarrito();
});

// =========================
// FUNCIONES DE CARRITO
// =========================

function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function setCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProducto(producto) {
  const carrito = getCarrito();
  const existente = carrito.find((p) => p.id === producto.id);

  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }

  setCarrito(carrito);
}

function cargarCarrito() {
  const lista = document.getElementById("lista-carrito");
  if (!lista) return;
  lista.innerHTML = "";

  const carrito = getCarrito();
  carrito.forEach((p) => {
    const li = document.createElement("li");
    const qty = p.cantidad || 1;
    li.textContent = `${p.nombre} x${qty} - $ ${p.precio * qty}`;
    lista.appendChild(li);
  });
}
