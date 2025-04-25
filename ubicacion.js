document.addEventListener("DOMContentLoaded", () => {
  const provincia = localStorage.getItem("provincia");
  const municipio = localStorage.getItem("municipio");

  const zona = document.getElementById("provincia-info");
  if (zona) {
    zona.innerHTML = provincia && municipio 
      ? `📍 <strong>${municipio}, ${provincia}</strong>` 
      : `📍 <strong>Seleccionar ubicación</strong>`;
  }

  // Crear modal si no existe (¡siempre se crea!)
  if (!document.getElementById("locationModal")) {
    const modal = document.createElement("div");
    modal.className = "location-modal";
    modal.id = "locationModal";
    modal.style.display = "none"; // Oculto al inicio
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Seleccione su provincia</h3>
        <select id="province-select">
          <option value="">Seleccione una provincia</option>
          <option value="Artemisa">Artemisa</option>
        </select>

        <h3>Seleccione su municipio</h3>
        <select id="municipality-select">
          <option value="">Seleccione un municipio</option>
        </select>

        <button id="confirm-btn">Confirmar</button>
      </div>
    `;
    document.body.appendChild(modal);

    const artemisaMunicipios = [
      "Alquízar", "Artemisa", "Bahía Honda", "Bauta", "Caimito",
      "Candelaria", "Guanajay", "Güira de Melena", "Mariel",
      "San Antonio de los Baños", "San Cristóbal"
    ];

    const provinceSelect = modal.querySelector("#province-select");
    const municipalitySelect = modal.querySelector("#municipality-select");
    const confirmBtn = modal.querySelector("#confirm-btn");

    provinceSelect.addEventListener("change", () => {
      const prov = provinceSelect.value;
      municipalitySelect.innerHTML = '<option value="">Seleccione un municipio</option>';
      if (prov === "Artemisa") {
        artemisaMunicipios.forEach(m => {
          const opt = document.createElement("option");
          opt.value = m;
          opt.textContent = m;
          municipalitySelect.appendChild(opt);
        });
      }
    });

    confirmBtn.addEventListener("click", () => {
      const prov = provinceSelect.value;
      const mun = municipalitySelect.value;
      if (!prov || !mun) {
        alert("Por favor seleccione ambos campos.");
        return;
      }

      localStorage.setItem("provincia", prov);
      localStorage.setItem("municipio", mun);
      modal.style.display = "none";
      if (zona) {
        zona.innerHTML = `📍 <strong>${mun}, ${prov}</strong>`;
      }
    });
  }

  // Mostrar modal si no había datos guardados
  if (!provincia || !municipio) {
    document.getElementById("locationModal").style.display = "flex";
  }

  // Hacer clickeable la burbuja de ubicación para cambiarla
  if (zona) {
    zona.style.cursor = "pointer";
    zona.addEventListener("click", () => {
      const modal = document.getElementById("locationModal");
      if (modal) modal.style.display = "flex";
    });
  }
});
