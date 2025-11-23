// =========================
// BASE DE CARRITO (compartida)
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
