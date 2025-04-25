function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    localStorage.setItem("ref", ref); // Guarda el identificador del gestor
  }
});

<script>
fetch("https://pamicasa-bot-production.up.railway.app/api/productos")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    data.forEach(producto => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%;height:auto;">
        <h3>${producto.nombre}</h3>
        <p><strong>$${producto.precio}</strong></p>
        <p>${producto.descripcion}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error cargando productos desde API:", err);
  });
</script>
