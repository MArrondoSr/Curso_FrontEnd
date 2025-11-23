let  productos = [
        {id : "001",
        name :"Recetarios / Blocks",
        description : "10 Blocks de 100 recetarios / orden de laboratorio / notas , (1000 hojas en total).Impresos 1/0 tinta negra sobre papel obra de 80 grs., medida 15 x 21 cm. Calidad y buena presentación. Incluye diseño y entrega en CABA o Zona Norte.",
        amount : "60000",
        image: "../imagenes/recetas.png"},
        {id : "002",
        name :"Tarjetas Full Color",
        description : "100 tarjetas impresión laser full color en cartulina 330 grs. Medidas 9 x 5 cm.Excelente calidad y presentación.Incluye diseño y entrega en CABA o Zona Norte",
        amount : "25000",
        image: "../imagenes/tarjetas.png"},
        {id : "003",
        name :"Tarjetas Clásicas 1/0",
        description : "100 tarjetas impresión offset tinta negra en cartulina 240 grs. Medidas 9 x 5 cm. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
        amount : "20000",
        image: "../imagenes/tarjetas2.jpg"},
         {id : "004",
        name :"Turneros",
        description : "10 blocks de turneros, formato 6 x 8 cm., impresos en 1 color. Cada block trae 100 formularios. Excelente calidad y presentación. Incluye diseño y entrega en CABA o Zona Norte.",
        amount : "90000",
        image: "../imagenes/turneros.png"},
        {id : "005",
        name :"Talonarios de facturas / recibos",
        description : "5 talonarios de factura / recibo / remito, formato 17 x 21 cm., con duplicado en papel color. Numerado. Cumplen normas fiscales vigentes. Cada talonario trae 50 formularios, original y duplicado.",
        amount : "90000",
        image: "../imagenes/facturas.jpg"},
        {id : "006",
        name :"Volantes comerciales / Flyers",
        description : "1000 volantes formato A5, impresos a un color sobre papel obra de 70 grs., simple faz. Incluye armado de original y entrega en CABA o Zona Norte.",
        amount : "40000",
        image: "../imagenes/volantes.jpg"}
        
    ];

const contenedor = document.querySelector(".productos");

// 5–6) Construir y anexar cada card
productos.forEach(prod => {
  // article
  const article = document.createElement("article");
  article.className = "articulo";
  article.dataset.id = prod.id; // útil más tarde

 // título
  const h3 = document.createElement("h3");
  h3.className = "articulo__titulo";
  h3.textContent = prod.name;

  //imagen
  const img = document.createElement("img");
  img.className = "articulo__img";
  img.src = prod.image;
  img.alt = prod.name;


  // descripción
  const p = document.createElement("p");
  p.className = "articulo__desc";
  p.textContent = `${prod.description}. Precio: $ ${prod.amount}`;

  // botón
  const btn = document.createElement("button");
  btn.className = "articulo__btn";
  btn.type = "button";

  // texto + ícono (podés usar createElement('i') si no querés innerHTML)
  btn.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>`;

  // (Opcional) evento del botón
  btn.addEventListener("click", () => {
    // tu lógica de carrito
    console.log(`Agregar id=${prod.id}`);
  });

  // armar la card (orden compatible con tu CSS grid actual)
  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);
  article.appendChild(btn);

  // agregar la card al contenedor
  contenedor.appendChild(article);
}

)