document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gestor-form");
  const resultDiv = document.getElementById("result");

  // Revisar si ya hay datos guardados
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

    // Genera un ID único (puedes combinar CI + fecha + teléfono para hacerlo más único)
    const id = `${ci}-${Date.now()}`;
    const link = `https://pamicasa.github.io/Tienda_Online/index.html?gestor=${encodeURIComponent(id)}`;

    // Guardar en localStorage
    const gestorData = {
      nombre,
      ci,
      telefono,
      link
    };

    localStorage.setItem("gestor", JSON.stringify(gestorData));
    mostrarLink(link);
  });

  function mostrarLink(link) {
    resultDiv.innerHTML = `
      <p><strong>Este es tu link de gestor:</strong></p>
      <a href="${link}" target="_blank">${link}</a>
    `;
  }
});
