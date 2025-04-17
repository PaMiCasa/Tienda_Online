function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}
