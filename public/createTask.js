const overlay = document.getElementById("overlay");
const input = document.getElementById("modalInput");

function openModal() {
  overlay.classList.add("active");
  input.focus();
}
function closeModal() {
  overlay.classList.remove("active");
  input.value = "";
}

function handleCreate() {
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  alert(`Created: "${value}"`);
  closeModal();
}

// Close on overlay click
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Open overlay
document.addEventListener("keydown", (e) => {
  if (e.key === "." && !overlay.classList.contains("active")) {
    e.preventDefault();
    openModal();
  }
});
