const productosLocales = [
    {
      id: "001",
      name: "Recetarios / Blocks",
      description:
        "10 Blocks de 100 recetarios / orden de laboratorio / notas , (1000 hojas en total). Impresos 1/0 tinta negra sobre papel obra de 80 grs., medida 15 x 21 cm. Calidad y buena presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "60000",
      image: "recetas.png",
    },
    {
      id: "002",
      name: "Tarjetas Full Color",
      description:
        "100 tarjetas impresión láser full color en cartulina 330 grs. Medidas 9 x 5 cm. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "25000",
      image: "tarjetas.png",
    },
    {
      id: "003",
      name: "Tarjetas Clásicas 1/0",
      description:
        "100 tarjetas impresión offset tinta negra en cartulina 240 grs. Medidas 9 x 5 cm. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "20000",
      image: "tarjetas2.png",
    },
    {
      id: "004",
      name: "Turneros",
      description:
        "10 blocks de turneros, formato 6 x 8 cm., impresos en 1 color. Cada block trae 100 formularios. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
      amount: "90000",
      image: "turneros.png",
    },
    {
      id: "005",
      name: "Talonarios de facturas / recibos",
      description:
        "5 talonarios de factura / recibo / remito, formato 17 x 21 cm., con duplicado en papel color. Numerado. Cumplen normas fiscales vigentes. Cada talonario trae 50 formularios, original y duplicado.",
      amount: "90000",
      image: "facturas.jpg",
    },
    {
      id: "006",
      name: "Volantes comerciales / Flyers",
      description:
        "1000 volantes formato A5, impresos a un color sobre papel obra de 70 grs., simple faz. Incluye armado de original y entrega en CABA o Zona Norte.",
      amount: "40000",
      image: "volantes.jpg",
    },
  ];
  

// =========================
// PÁGINA DE PRODUCTOS
// =========================

function copiaProductosLocales(lista) {
  return [...lista]
}

const productosCopia = copiaProductosLocales(productosLocales);

// 2) Función que decide entre local y remoto
async function obtenerProductos() {
  const usarRemoto = window.confirm(
    "¿Querés ver los productos del sitio remoto (fakestoreapi.com)?\n\n" +
    "Ok = productos remotos\nCancel = productos locales"
  );

  if (!usarRemoto) {
    console.log("Usando catálogo LOCAL de imprenta.");
    return productosCopia;
  }

  const url = "https://fakestoreapi.com/products";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener productos de la API: " + response.status);
    }

    const productosAPI = await response.json();

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
    return productosCopia;
  }
}

// 3) Renderizar las cards en .productos
function renderizarProductos(productos) {
  const contenedorProductos = document.querySelector(".productos");
  if (!contenedorProductos) return;

  contenedorProductos.innerHTML = ""; // por si había algo

  productos.forEach((p) => {
    const article = document.createElement('article');
    article.className = 'articulo';

    const srcImagen = p.image.startsWith("http")
      ? p.image
      : "../imagenes/" + p.image;

    const img = document.createElement('img');
    img.className = 'articulo__img';
    img.src = srcImagen;
    img.alt = p.name;
    img.loading = 'lazy';

    const desc = document.createElement('p');
    desc.className = 'articulo__desc';
    desc.textContent = p.description;

    const h3 = document.createElement('h3');
    h3.className = 'articulo__titulo';
    h3.textContent = p.name;

    const price = document.createElement('p');
    price.className = 'articulo__precio';
    price.textContent = '$ ' + p.amount;

    const btn = document.createElement('button');
    btn.className = 'articulo__btn agregar-carrito';
    btn.dataset.id = p.id;
    btn.dataset.nombre = p.name;
    btn.dataset.precio = p.amount;
    btn.dataset.descripcion = p.description;  //NUEVO
    btn.dataset.imagen = srcImagen;  //NUEVO

    btn.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping"></i>`;

    article.appendChild(img);
    article.appendChild(desc);
    article.appendChild(h3);
    article.appendChild(price);
    article.appendChild(btn);

    contenedorProductos.appendChild(article);
  });

  // Delegación de eventos para los botones "Agregar al carrito"
  contenedorProductos.addEventListener("click", (e) => {
    const btn = e.target.closest(".agregar-carrito");
    if (!btn) return;

    const producto = {
      id: btn.dataset.id,
      nombre: btn.dataset.nombre,
      precio: Number(btn.dataset.precio),
      descripcion: btn.dataset.descripcion,  //NUEVO
      imagen: btn.dataset.imagen,  //NUEVO
    };

    agregarProducto(producto);  // viene de carrito_base.js

    // Leer del carrito cuántas unidades hay de este producto
    const carrito = getCarrito();
    const item = carrito.find(p => p.id === producto.id);
    const qty = item ? (item.cantidad || 1) : 1;

    // Actualizar botón
    btn.innerHTML = `${qty} en el carrito, ¿agregar otro? <i class="fa-solid fa-cart-shopping"></i>`;
    btn.classList.add("articulo__btn--added");
  });
}

// 4) Vaciar carrito en esta página
function configurarBotonVaciar() {
  const btnVaciar = document.getElementById("vaciar-carrito");
  if (!btnVaciar) return;

  btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");

    // Resetear botones de productos
    const botones = document.querySelectorAll(".agregar-carrito");
    botones.forEach(boton => {
      boton.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping"></i>`;
      boton.classList.remove("articulo__btn--added");
    });

    alert("Carrito vaciado.");
  });
}

// 5) Botón para ir a la página aparte del carrito
function configurarBotonIrCarrito() {
  const btnIrCarrito = document.getElementById("btn-ir-al-carrito");
  if (!btnIrCarrito) return;

  btnIrCarrito.addEventListener("click", () => {
    window.location.href = "carrito_compra.html"; // la página aparte del carrito
  });
}

// 6) Inicializar solo si estamos en la página de productos
document.addEventListener("DOMContentLoaded", async () => {
  const contenedorProductos = document.querySelector(".productos");
  if (!contenedorProductos) return;  // si no existe .productos, no es esta página

  const productos = await obtenerProductos();
  renderizarProductos(productos);
  configurarBotonVaciar();
  configurarBotonIrCarrito();
});
