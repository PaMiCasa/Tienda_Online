document.addEventListener("DOMContentLoaded", () => {
  const provincia = localStorage.getItem("provincia");
  const municipio = localStorage.getItem("municipio");

  const zona = document.getElementById("provincia-info");
  const modal = document.getElementById("ubicacion-modal"); // Usamos el modal del HTML
  const provinceSelect = document.getElementById("select-provincia");
  const municipalitySelect = document.getElementById("select-municipio");
  const confirmBtn = document.getElementById("confirm-btn");

  const municipios = {
    "Artemisa": [
      "Alquízar", "Artemisa", "Bahía Honda", "Bauta", "Caimito",
      "Candelaria", "Guanajay", "Güira de Melena", "Mariel",
      "San Antonio de los Baños", "San Cristóbal"
    ],
    "La Habana": [
      "10 de Octubre", "Arroyo Naranjo", "Centro Habana", "Cerro",
      "Cotorro", "Guanabacoa", "Habana del Este", "Habana Vieja",
      "La Lisa", "Marianao", "Playa", "Plaza de la Revolución",
      "Regla", "San Miguel del Padrón"
    ],
    "Mayabeque": [
      "Bejucal", "Güines", "Jaruco", "Madruga", "Melena del Sur",
      "Nueva Paz", "Quivicán", "San José de las Lajas", "Santa Cruz del Norte"
    ]
  };

  if (provinceSelect) {
    provinceSelect.addEventListener("change", () => {
      const prov = provinceSelect.value;
      municipalitySelect.innerHTML = '<option value="">Seleccione un municipio</option>';

      if (municipios[prov]) {
        municipios[prov].forEach(muni => {
          const option = document.createElement("option");
          option.value = muni;
          option.textContent = muni;
          municipalitySelect.appendChild(option);
        });
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const prov = provinceSelect.value;
      const mun = municipalitySelect.value;

      if (!prov || !mun) {
        alert("Por favor seleccione ambos campos.");
        return;
      }

      localStorage.setItem("provincia", prov);
      localStorage.setItem("municipio", mun);

      if (modal) modal.style.display = "none";

      if (zona) {
        zona.innerHTML = `📍 <strong>${mun}, ${prov}</strong>`;
        zona.style.display = "inline-block";
      }
    });
  }

  // Configurar la burbuja según si hay ubicación o no
  if (zona) {
    if (provincia && municipio) {
      zona.innerHTML = `📍 <strong>${municipio}, ${provincia}</strong>`;
      zona.style.display = "inline-block";
    } else {
      zona.innerHTML = `📍 <strong>Seleccionar ubicación</strong>`;
      zona.style.display = "inline-block";

      // Solo mostrar modal automáticamente si no hay ubicación
      if (modal) {
        modal.style.display = "flex";
      }
    }

    zona.style.cursor = "pointer";
    zona.addEventListener("click", () => {
      if (modal) {
        modal.style.display = "flex";
      }
    });
  }
});
