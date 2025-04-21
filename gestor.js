document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gestor-form");
  const resultDiv = document.getElementById("result");

  // Mostrar link si ya existe en localStorage
  const gestorGuardado = JSON.parse(localStorage.getItem("gestor"));
  if (gestorGuardado && gestorGuardado.link) {
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

    // Generar ID único
    const id = `${ci}-${Date.now()}`;
    const link = `https://pamicasa.github.io/Tienda_Online/index.html?gestor=${encodeURIComponent(id)}`;

    const gestorData = { nombre, ci, telefono, link };
    localStorage.setItem("gestor", JSON.stringify(gestorData));

    mostrarLink(link);
  });

  function mostrarLink(link) {
    resultDiv.innerHTML = `
      <p><strong>Este es tu link de gestor:</strong></p>
      <input type="text" id="linkField" value="${link}" readonly style="width: 100%; padding: 0.5rem; margin-top: 0.5rem; border-radius: 6px; border: 1px solid #ccc;" />
      <button id="copyBtn" style="margin-top: 1rem; background: #0077b6; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer;">Copiar enlace</button>
    `;

    document.getElementById("copyBtn").addEventListener("click", () => {
      const input = document.getElementById("linkField");
      input.select();
      input.setSelectionRange(0, 99999); // Compatibilidad móvil
      document.execCommand("copy");
      alert("¡Enlace copiado al portapapeles!");
    });
  }
});
