// cargar-global.js

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("category-container");

  try {
    // 1. Traer productos de Global Imports desde la API correcta
    const res = await fetch("https://pamicasa-bot-production.up.railway.app/api/productos-global");
    const productos = await res.json();

    const productosPorCategoria = {};
    productos.forEach(prod => {
      if (!productosPorCategoria[prod.categoria]) {
        productosPorCategoria[prod.categoria] = [];
      }
      productosPorCategoria[prod.categoria].push(prod);
    });

    // 2. Generar HTML dinámico
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
          <p><strong>$${prod.precio}</strong></p>
          <button 
            class="add-to-cart" 
            data-name="${prod.nombre}" 
            data-price="${prod.precio}"
            data-image="${prod.imagen}"
          >
            Añadir al carrito
          </button>
          <button class="ver-mas" data-descripcion="${encodeURIComponent(prod.descripcion)}" data-nombre="${encodeURIComponent(prod.nombre)}">
            Ver más
          </button>
        `;

        grid.appendChild(card);
      });

      container.appendChild(grid);
    }

    // 3. Agregar eventos a botones de carrito
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
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

    // 4. Agregar eventos para mostrar "Ver más" (Modal)
    document.querySelectorAll(".ver-mas").forEach(btn => {
      btn.addEventListener("click", () => {
        const descripcion = decodeURIComponent(btn.dataset.descripcion);
        const nombre = decodeURIComponent(btn.dataset.nombre);

        document.getElementById("modal-nombre").innerText = nombre;
        document.getElementById("modal-descripcion-texto").innerText = descripcion;
        document.getElementById("modal-descripcion").style.display = "flex";
      });
    });

    // 5. Cerrar modal
    document.getElementById("cerrar-modal").addEventListener("click", () => {
      document.getElementById("modal-descripcion").style.display = "none";
    });

    // Cerrar modal al hacer click fuera
    document.getElementById("modal-descripcion").addEventListener("click", (e) => {
      if (e.target.id === "modal-descripcion") {
        document.getElementById("modal-descripcion").style.display = "none";
      }
    });

  } catch (error) {
    console.error("Error al cargar productos:", error);
    container.innerHTML = "<p>Error al cargar productos. Intenta más tarde.</p>";
  }
});
