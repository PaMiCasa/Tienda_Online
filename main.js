function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    localStorage.setItem("ref", ref); // Guarda el identificador del gestor
  }
});
