document.addEventListener("DOMContentLoaded", () => {
  const provinciaInfo = document.getElementById("provincia-info");

  const provincia = localStorage.getItem("provincia");
  const municipio = localStorage.getItem("municipio");

  // Renderizar texto en la burbuja
  function renderBurbuja() {
    if (provincia && municipio && provinciaInfo) {
      provinciaInfo.innerHTML = `📍 <strong id="provincia-text">${municipio}, ${provincia}</strong>`;
    } else if (provinciaInfo) {
      provinciaInfo.innerHTML = `<strong id="provincia-text">Seleccionar ubicación</strong>`;
    }
  }

  // Crear modal de selección si no existe
  function crearModal() {
    if (document.getElementById("ubicacion-modal")) return; // Ya existe

    const modal = document.createElement("div");
    modal.className = "location-modal";
    modal.id = "ubicacion-modal";
    modal.style.display = "none";
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Seleccione su provincia</h3>
        <select id="province-select">
          <option value="">Seleccione una provincia</option>
          <option value="Artemisa">Artemisa</option>
          <option value="La Habana">La Habana</option>
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
    const municipalitySelect = document.getElementById("municipality-select");
    const municipalityContainer = document.getElementById("municipality-container");

    const confirmBtn = document.getElementById("confirm-btn");

    const municipiosPorProvincia = {
      "Artemisa": ["Alquízar", "Artemisa", "Bahía Honda", "Bauta", "Caimito", "Candelaria", "Guanajay", "Güira de Melena", "Mariel", "San Antonio de los Baños", "San Cristóbal"],
      "La Habana": ["Playa", "Plaza", "Centro Habana", "Habana Vieja", "Diez de Octubre", "Arroyo Naranjo", "Boyeros", "Cerro", "La Lisa", "Marianao", "Regla", "Guanabacoa", "San Miguel", "Habana del Este"]
    };

    provinceSelect.addEventListener("change", () => {
      const selectedProvince = provinceSelect.value;
      if (municipiosPorProvincia[selectedProvince]) {
        municipalitySelect.innerHTML = '<option value="">Seleccione un municipio</option>';
        municipiosPorProvincia[selectedProvince].forEach(m => {
          const option = document.createElement("option");
          option.value = option.textContent = m;
          municipalitySelect.appendChild(option);
        });
        municipalityContainer.style.display = "block";
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
        renderBurbuja();
      } else {
        alert("Por favor seleccione ambos campos.");
      }
    });
  }

  // Mostrar modal si no hay datos
  if (!provincia || !municipio) {
    crearModal();
    setTimeout(() => {
      document.getElementById("ubicacion-modal").style.display = "flex";
    }, 300);
  }

  // Evento clic para abrir modal
  if (provinciaInfo) {
    provinciaInfo.addEventListener("click", () => {
      crearModal();
      document.getElementById("ubicacion-modal").style.display = "flex";
    });
  }

  renderBurbuja();
});
