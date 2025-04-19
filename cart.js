document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cart-count');

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");

  function renderCart() {
    if (cartItems.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalContainer.innerHTML = "";
      return;
    }

    let html = "<ul>";
    let total = 0;

    cartItems.forEach((item, index) => {
      html += `
        <li>
          ${item.nombre} - $${item.precio.toFixed(2)}
          <button onclick="removeItem(${index})">Remove</button>
        </li>`;
      total += item.price;
    });

    html += "</ul>";
    container.innerHTML = html;
    totalContainer.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  }

  window.removeItem = function(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  };

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  });

  renderCart();
});

  updateCartCount();

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
});

