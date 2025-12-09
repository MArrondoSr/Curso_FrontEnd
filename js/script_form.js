const form = document.getElementById("form_contacto");

form.addEventListener("submit", () => {
  setTimeout(() => {
    form.reset();
  }, 300);
});
