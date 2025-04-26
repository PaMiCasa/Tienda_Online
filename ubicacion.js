document.addEventListener("DOMContentLoaded", () => {
  const provincia = localStorage.getItem("provincia");
  const municipio = localStorage.getItem("municipio");

  const zona = document.getElementById("provincia-info");
  if (zona) {
    if (provincia && municipio) {
      // ✅ Hay ubicación, OCULTAMOS la burbuja
      zona.style.display = "none";
    } else {
      // ❌ No hay ubicación, MOSTRAMOS "Seleccionar ubicación"
      zona.innerHTML = `📍 <strong>Seleccionar ubicación</strong>`;
      zona.style.display = "inline-block";
      zona.style.cursor = "pointer";

      zona.addEventListener("click", () => {
        const modal = document.getElementById("ubicacion-modal");
        if (modal) {
          modal.style.display = "flex";
        }
      });
    }
  }
});

  // Crear modal si no existe
  if (!document.getElementById("locationModal")) {
    const modal = document.createElement("div");
    modal.className = "location-modal";
    modal.id = "locationModal";
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
  }

  const artemisaMunicipios = [
    "Alquízar", "Artemisa", "Bahía Honda", "Bauta", "Caimito",
    "Candelaria", "Guanajay", "Güira de Melena", "Mariel",
    "San Antonio de los Baños", "San Cristóbal"
  ];

  const modal = document.getElementById("locationModal");
  const provinceSelect = document.getElementById("province-select");
  const municipalitySelect = document.getElementById("municipality-select");
  const confirmBtn = document.getElementById("confirm-btn");

  // Rellenar municipios al seleccionar provincia
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

  // Confirmar y guardar ubicación
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

  // 👉 Hacer clickeable la burbuja de ubicación
  if (zona) {
    zona.style.cursor = "pointer";
    zona.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  // Mostrar modal si no había datos
  if (!provincia || !municipio) {
    modal.style.display = "flex";
  }
});
