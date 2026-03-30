/**
 * Toggles the 'hidden' class on the sidebar element.
 */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}

const sidebarBtn = document.getElementById("sidebar-btn");
sidebarBtn.onclick = toggleSidebar;
