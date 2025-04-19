document.getElementById("gestor-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Por favor complete todos los campos");
    return;
  }

  const id = Date.now().toString(36); // ID simple para ejemplo
  const refLink = `https://pamicasa.github.io/Tienda_Online/index.html?ref=${id}`;

  // Mostrar link generado
  document.getElementById("result").innerHTML = `
    <p><strong>Este es tu link de gestor:</strong></p>
    <a href="${refLink}" target="_blank">${refLink}</a>
  `;

  // Aquí podrías guardar los datos a backend o Google Sheets
});
