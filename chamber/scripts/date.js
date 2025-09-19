const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const lastMod = document.getElementById("lastModified");
  if (lastMod) lastMod.textContent = `Last Modified: ${document.lastModified}`;


