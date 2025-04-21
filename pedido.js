
document.addEventListener("DOMContentLoaded", () => {
  // Abrir formulario
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      document.getElementById("checkout-modal").style.display = "flex";
    });
  }

  // Cerrar modal
  window.closeCheckout = function () {
    document.getElementById("checkout-modal").style.display = "none";
  };

  // Enviar datos a WhatsApp
  const sendOrderBtn = document.getElementById("send-order");
  if (sendOrderBtn) {
    sendOrderBtn.addEventListener("click", () => {
      const name = document.getElementById("client-name").value.trim();
      const phone = document.getElementById("client-phone").value.trim();
      const address = document.getElementById("client-address").value.trim();
      const payment = document.getElementById("payment-type").value;

      const provincia = localStorage.getItem("provincia") || "";
      const municipio = localStorage.getItem("municipio") || "";

      // Obtener ref desde URL
      const ref = new URLSearchParams(window.location.search).get("ref");
      let gestorNombre = "Desconocido";

      // Buscar nombre de gestor desde localStorage si existe
      const gestores = JSON.parse(localStorage.getItem("gestores")) || [];
      const gestorEncontrado = gestores.find(g => ref && g.link.includes(ref));
      if (gestorEncontrado) {
        gestorNombre = gestorEncontrado.nombre;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      if (!name || !phone || !address) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const pedido = cart.map(item => `- ${item.nombre} x${item.cantidad}`).join("\n");
      const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);

      const mensaje = `👨🏻👩🏻‍🦱Nombre del Cliente: ${name}
📱 Número del Cliente: ${phone}
🏠 Dirección: ${address}, ${municipio}, ${provincia}
🛒 Pedido:
${pedido}

💰 Total: $${total}
💸 Tipo de pago: ${payment}
👤 Gestor: ${gestorNombre}`;

      const url = `https://wa.me/5354009985?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    });
  }
});
