document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cart-count');
  const container = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

  function renderCart() {
    if (!container || !totalContainer) return;

    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalContainer.innerHTML = "";
      return;
    }

    let html = "<ul>";
    let total = 0;

    cart.forEach((item, index) => {
      html += `
        <li>
          <strong>${item.name}</strong> - $${item.price.toFixed(2)}
          <button onclick="removeItem(${index})">❌</button>
        </li>`;
      total += item.price;
    });

    html += "</ul>";
    container.innerHTML = html;
    totalContainer.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  }

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

  // Añadir al carrito
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);

      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${name} added to cart!`);
    });
  });

  updateCartCount();
  renderCart();
});
