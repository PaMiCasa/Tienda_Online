// cargar-productos.js

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("category-container");

  try {
    // 1. Traer productos desde la API
    const res = await fetch("https://pamicasa-bot-production.up.railway.app/api/productos");
    const productos = await res.json();

    // 2. Agrupar productos por categoría
    const productosPorCategoria = {};
    productos.forEach(prod => {
      if (!productosPorCategoria[prod.categoria]) {
        productosPorCategoria[prod.categoria] = [];
      }
      productosPorCategoria[prod.categoria].push(prod);
    });

    // 3. Generar HTML
    for (const categoria in productosPorCategoria) {
      // Crear título de categoría
      const catTitle = document.createElement("h3");
      catTitle.textContent = categoria;
      catTitle.className = "categoria-title";
      container.appendChild(catTitle);

      // Crear grid de productos
      const grid = document.createElement("div");
      grid.className = "product-grid";

      productosPorCategoria[categoria].forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${prod.imagen}" alt="${prod.nombre}">
          <h3>${prod.nombre}</h3>
          <p>${prod.descripcion}</p>
          <p><strong>$${prod.precio}</strong></p>
          <button 
            class="add-to-cart" 
            data-name="${prod.nombre}" 
            data-price="${prod.precio}"
            data-image="${prod.imagen}"
          >
            Añadir al carrito
          </button>
        `;

        grid.appendChild(card);
      });

      container.appendChild(grid);
    }

    // 4. Agregar eventos a botones de carrito
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", e => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        const image = btn.dataset.image;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.nombre === name);
        if (existing) {
          existing.cantidad += 1;
        } else {
          cart.push({
            nombre: name,
            precio: price,
            cantidad: 1,
            imagen: image
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} añadido al carrito ✅`);
      });
    });

  } catch (error) {
    console.error("Error al cargar productos:", error);
    container.innerHTML = "<p>Error al cargar productos. Intenta más tarde.</p>";
  }
});
