document.addEventListener("DOMContentLoaded", () => {
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

      <div id="municipality-container" style="display: none;">
        <h3>Seleccione su municipio</h3>
        <select id="municipality-select">
          <option value="">Seleccione un municipio</option>
        </select>
      </div>

      <button id="confirm-btn">Confirmar</button>
    </div>
  `;
  document.body.appendChild(modal);

  const provinceSelect = document.getElementById("province-select");
  const municipalityContainer = document.getElementById("municipality-container");
  const municipalitySelect = document.getElementById("municipality-select");
  const confirmBtn = document.getElementById("confirm-btn");

  const artemisaMunicipios = [
    "Alquízar", "Artemisa", "Bahía Honda", "Bauta", "Caimito",
    "Candelaria", "Guanajay", "Güira de Melena", "Mariel", 
    "San Antonio de los Baños", "San Cristóbal"
  ];

  provinceSelect.addEventListener("change", () => {
    const selectedProvince = provinceSelect.value;
    if (selectedProvince === "Artemisa") {
      municipalityContainer.style.display = "block";
      municipalitySelect.innerHTML = '<option value="">Seleccione un municipio</option>';
      artemisaMunicipios.forEach(m => {
        const option = document.createElement("option");
        option.value = option.textContent = m;
        municipalitySelect.appendChild(option);
      });
    } else {
      municipalityContainer.style.display = "none";
    }
  });

  confirmBtn.addEventListener("click", () => {
    const prov = provinceSelect.value;
    const mun = municipalitySelect.value;
    if (prov && mun) {
      localStorage.setItem("provincia", prov);
      localStorage.setItem("municipio", mun);
      modal.style.display = "none";
    } else {
      alert("Por favor seleccione ambos campos.");
    }
  });

  // Mostrar modal solo si no está guardado
  if (!localStorage.getItem("provincia") || !localStorage.getItem("municipio")) {
    modal.style.display = "flex";
  }
  // Mostrar provincia y municipio en el header
function mostrarUbicacionEnHeader() {
  const prov = localStorage.getItem("provincia");
  const mun = localStorage.getItem("municipio");
  const zona = document.getElementById("provincia-info");

  if (prov && mun && zona) {
    zona.innerHTML = `📍 <strong>${mun}, ${prov}</strong>`;
  }
}

// Ejecutarlo si ya están los datos
if (localStorage.getItem("provincia") && localStorage.getItem("municipio")) {
  mostrarUbicacionEnHeader();
}

});
