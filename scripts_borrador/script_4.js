const productosLocales = [
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
  

// =====================================================
// 2) Función para obtener productos (API + opción local) 
// =====================================================
async function obtenerProductos() {
  // Preguntar al usuario qué quiere ver
  const usarRemoto = window.confirm(
    "¿Querés ver los productos del sitio remoto (fakestoreapi.com)?\n\n" +
    "Aceptar = productos remotos\nCancelar = productos locales"
  );

  // Si elige NO (Cancelar) → usamos tu base local
  if (!usarRemoto) {
    console.log("Usando catálogo LOCAL de imprenta.");
    return productosLocales;
  }

  // Si elige SÍ → intentamos usar la API remota
  const url = "https://fakestoreapi.com/products";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener productos de la API: " + response.status);
    }

    const productosAPI = await response.json();

    console.log("Productos obtenidos desde fakestore:", productosAPI);

    // Adapto el formato de fakestore a la estructura que tenía
    const adaptados = productosAPI.map(p => ({
      id: String(p.id).padStart(3, "0"),
      name: p.title,
      description: p.description,
      amount: Math.round(p.price * 1000),  
      image: p.image
    }));

    return adaptados;

  } catch (error) {
    console.warn("⚠️ Error en la API, vuelvo al catálogo local:", error.message);
    return productosLocales;
  }
}


  // =========================
// CARRITO DE COMPRAS DINÁMICO
// =========================

document.addEventListener('DOMContentLoaded', async () => {
  // === 1) Array de productos ===

  const productos = await obtenerProductos();

  

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

      //  👈 nuevo AGREGADOS PARA HACER CARRITO INDEPENDIENTE
      const estado = document.createElement('p');
      estado.className = 'articulo__estado';
      estado.textContent = ''; // comienza vacío


      article.appendChild(img);
      article.appendChild(desc);
      article.appendChild(h3);
      article.appendChild(price);
      article.appendChild(estado);   // 👈 nuevo
      article.appendChild(btn);

      contenedorProductos.appendChild(article);
      
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

      // 🔹 NUEVO AGREGADO PARA CARRITO INDEPENDIENTE
  // 🔹 Leer del carrito cuántos hay de este producto
  const carrito = getCarrito();
  const item = carrito.find(p => p.id === producto.id);
  const qty = item ? (item.cantidad || 1) : 1;

  // 🔹 Actualizar el texto del botón con esa cantidad
  btn.innerHTML = `
    ${qty} en el carrito, ¿agregar otro?
    <i class="fa-solid fa-cart-shopping"></i>
  `;
  btn.classList.add("articulo__btn--added");
  });

  // === 4) Botón Vaciar Carrito ===
  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar?.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    cargarCarrito();

  // 🔹 Resetear todos los botones "Agregar al carrito"
  const botones = document.querySelectorAll(".agregar-carrito");
  botones.forEach(boton => {
    boton.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping"></i>`;
    boton.classList.remove("articulo__btn--added");
    // si en algún momento volvemos a usar disabled:
    // boton.disabled = false;
  });

      const btnIrCarrito = document.getElementById("btn-ir-al-carrito");

      btnIrCarrito?.addEventListener("click", () => {
          // cambiá 'carrito.html' por el nombre de tu página de carrito
          window.location.href = "carrito_compra.html";
      });

  });

  // === 5) Cargar carrito al inicio ===
  cargarCarrito();
});


document.addEventListener("DOMContentLoaded", () => {
  // BOTÓN: Ver carrito y finalizar compra (desde la página de productos)
  const btnIrCarrito = document.getElementById("btn-ir-al-carrito");
  if (btnIrCarrito) {
    btnIrCarrito.addEventListener("click", (e) => {
      e.preventDefault();      // por si está dentro de un <form> o <a>
      window.location.href = "carrito_compra.html";  // 👈 nombre correcto
    });
  }

  // BOTÓN: Seguir comprando (desde la página carrito_compra)
  const btnSeguir = document.getElementById("btn-seguir-comprando");
  if (btnSeguir) {
    btnSeguir.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "prod_serv.html";       // o el nombre real de tu página de productos
    });
  }
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

// =========================
// PÁGINA CARRITO_COMPRAS
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarritoPage = document.getElementById("carrito-items");
  if (!contenedorCarritoPage) {
    // No estoy en carrito_compras.html, no hago nada extra
    return;
  }

  // Estamos en carrito_compras.html → inicializar la vista
  renderCarritoPage();

  const btnSeguir = document.getElementById("btn-seguir-comprando");
  btnSeguir?.addEventListener("click", () => {
    // Volver a la página de productos
    window.location.href = "prod_serv.html";   // ajustá el nombre si es otro
  });

  const btnVaciarPage = document.getElementById("btn-vaciar-carrito-page");
  btnVaciarPage?.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    renderCarritoPage();   // refrescar la vista de carrito
  });

  const btnPagar = document.getElementById("btn-ir-a-pagar");
  btnPagar?.addEventListener("click", () => {
    alert("Aquí iría el proceso de pago (futuro).");
  });
});

// Función que dibuja las cards + total en carrito_compras.html
function renderCarritoPage() {
  const contenedor = document.getElementById("carrito-items");
  const resumen = document.getElementById("carrito-resumen");
  if (!contenedor || !resumen) return;

  contenedor.innerHTML = "";
  resumen.innerHTML = "";

  const carrito = getCarrito();

  if (!carrito.length) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    resumen.innerHTML = "";
    return;
  }

  let total = 0;

  carrito.forEach((p) => {
    const qty = p.cantidad || 1;
    const subtotal = p.precio * qty;
    total += subtotal;

    const card = document.createElement("article");
    card.className = "carrito-card";

    const title = document.createElement("h3");
    title.textContent = p.nombre;

    const lineaCantidad = document.createElement("p");
    lineaCantidad.textContent = `Cantidad: ${qty}`;

    const lineaPrecio = document.createElement("p");
    lineaPrecio.textContent = `Precio unitario: $ ${p.precio}`;

    const lineaSubtotal = document.createElement("p");
    lineaSubtotal.textContent = `Subtotal: $ ${subtotal}`;

    card.appendChild(title);
    card.appendChild(lineaCantidad);
    card.appendChild(lineaPrecio);
    card.appendChild(lineaSubtotal);

    contenedor.appendChild(card);
  });

  const totalP = document.createElement("p");
  totalP.className = "carrito-total";
  totalP.textContent = `Total de la compra: $ ${total}`;

  resumen.appendChild(totalP);
}
