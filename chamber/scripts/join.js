// Add timestamp
document.getElementById("timestamp").value = new Date().toLocaleString();

// Handle modals
const buttons = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closes = document.querySelectorAll(".close");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.modal).style.display = "flex";
  });
}); 

closes.forEach(c => {
  c.addEventListener("click", () => {
    modals.forEach(m => m.style.display = "none");
  });
});

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});







