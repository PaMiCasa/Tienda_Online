document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cart-count');
  const container = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    if (cartCount) {
      const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
      cartCount.textContent = totalItems;
    }
  }

  function renderCart() {
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalContainer.innerHTML = "";
      return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      html += `
        <div class="cart-item">
          <img src="${item.imagen}" alt="${item.nombre}" class="cart-thumb"/>
          <div class="cart-details">
            <strong>${item.nombre}</strong>
            <p>USD ${item.precio.toFixed(2)} x ${item.cantidad}</p>
          </div>
          <div class="cart-controls">
            <button onclick="updateQuantity(${index}, -1)">➖</button>
            <input type="text" value="${item.cantidad}" readonly />
            <button onclick="updateQuantity(${index}, 1)">➕</button>
            <button onclick="removeItem(${index})">🗑️</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    totalContainer.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  }

  window.updateQuantity = function(index, change) {
    if (cart[index].cantidad + change >= 1) {
      cart[index].cantidad += change;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    }
  };

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
      updateCartCount();
    });
  }

  // Añadir al carrito desde productos
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const imagen = button.dataset.image || "placeholder.jpg";

      // Revisar si ya existe el producto
      const existing = cart.find(p => p.nombre === name);
      if (existing) {
        existing.cantidad += 1;
      } else {
        cart.push({ nombre: name, precio: price, cantidad: 1, imagen });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${name} añadido al carrito`);
    });
  });

  updateCartCount();
  renderCart();
});
