document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.getElementById('cart-count');

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

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
