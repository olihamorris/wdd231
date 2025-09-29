// ====== Visit Message ======
const visitMessage = document.getElementById("visit-message");
if (visitMessage) {
  console.log("Found visit-message element");
} else {
  console.warn("No element with id 'visit-message' found!");
}

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (lastVisit) {
  const daysPassed = Math.floor(
    (now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24)
  );
  if (visitMessage) {
    visitMessage.textContent = `Welcome back! It's been ${daysPassed} day(s) since your last visit.`;
  }
} else {
  if (visitMessage) {
    visitMessage.textContent = "Welcome! This is your first visit.";
  }
}
localStorage.setItem("lastVisit", now);

// ====== Load Cards from JSON ======
async function loadCards() {
  console.log("loadCards() started");
  try {
    const response = await fetch("data/discover.json");
    console.log("Fetched JSON:", response.status);

    const places = await response.json();
    console.log("Parsed JSON:", places);

    const cardsContainer = document.getElementById("discover-cards");
    if (!cardsContainer) {
      console.warn("No element with id 'discover-cards' found!");
      return;
    }

    cardsContainer.innerHTML = ""; // clear any old content

    places.forEach(place => {
      console.log("Creating card for", place.name);
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${place.image}" alt="${place.name}">
        <div class="card-content">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <p><strong>Address:</strong> ${place.address}</p>
        </div>
      `;

      cardsContainer.appendChild(card);
    });
    console.log("All cards appended");
  } catch (error) {
    console.error("Error loading discover cards:", error);
  }
}

// run it
loadCards();

