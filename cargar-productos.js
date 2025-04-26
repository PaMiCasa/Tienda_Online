// cargar-productos.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");

  if (!container) return; // Si no hay contenedor, no hacemos nada

  fetch("https://pamicasa-bot-production.up.railway.app/api/productos")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      // Agrupar productos por categoría
      const agrupado = {};

      data.forEach(p => {
        const cat = p.categoria || "Sin categoría";

        if (!agrupado[cat]) agrupado[cat] = [];
        agrupado[cat].push(p);
      });

      // Renderizar agrupado por categoría
      Object.entries(agrupado).forEach(([categoria, productos]) => {
        const catTitle = document.createElement("h2");
        catTitle.textContent = `📁 ${categoria}`;
        container.appendChild(catTitle);

        const grid = document.createElement("div");
        grid.className = "product-grid";

        productos.forEach(prod => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" style="width:100%;height:auto;">
            <h3>${prod.nombre}</h3>
            <p><strong>$${prod.precio}</strong></p>
            <p>${prod.descripcion}</p>
          `;
          grid.appendChild(card);
        });

        container.appendChild(grid);
      });
    })
    .catch(err => {
      console.error("Error cargando productos:", err);
    });
});
