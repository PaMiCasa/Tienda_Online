document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gestor-form");
  const resultDiv = document.getElementById("result");

  // Mostrar link si ya existe
  const gestorGuardado = JSON.parse(localStorage.getItem("gestor"));
  if (gestorGuardado && gestorGuardado.link) {
    form.style.display = "none";
    mostrarLink(gestorGuardado.link);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const ci = document.getElementById("ci").value.trim();
    const telefono = document.getElementById("phone").value.trim();

    if (!nombre || !ci || !telefono) {
      alert("Por favor complete todos los campos");
      return;
    }

    const id = `${ci}-${Date.now()}`;
    const link = `https://pamicasa.github.io/Tienda_Online/index.html?ref=${encodeURIComponent(id)}`;
    const gestorData = { nombre, ci, telefono, link };

    // Guardar gestor actual
    localStorage.setItem("gestor", JSON.stringify(gestorData));

    // Agregar a lista de gestores sin duplicados
    const gestores = JSON.parse(localStorage.getItem("gestores")) || [];

    // Eliminar si ya existe un registro con la misma CI
    const gestoresFiltrados = gestores.filter(g => g.ci !== ci);
    gestoresFiltrados.push(gestorData);

    localStorage.setItem("gestores", JSON.stringify(gestoresFiltrados));

    form.style.display = "none";
    mostrarLink(link);
  });

  function mostrarLink(link) {
    resultDiv.innerHTML = `
      <p><strong>Este es tu link de gestor:</strong></p>
      <input type="text" id="linkField" value="${link}" readonly style="width: 100%; padding: 0.5rem; margin-top: 0.5rem; border-radius: 6px; border: 1px solid #ccc;" />
      <button id="copyBtn" style="margin-top: 1rem; background: #0077b6; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer;">Copiar enlace</button>
      <button id="resetBtn" style="margin-top: 1rem; background: #999; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer;">Volver a generar</button>
    `;

    document.getElementById("copyBtn").addEventListener("click", () => {
      const input = document.getElementById("linkField");
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand("copy");
      alert("¡Enlace copiado al portapapeles!");
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      localStorage.removeItem("gestor");
      form.reset();
      form.style.display = "block";
      resultDiv.innerHTML = "";
    });
  }
});
