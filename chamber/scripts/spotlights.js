// Get the container in the HTML
const spotlightContainer = document.getElementById("spotlight-container");

async function fetchMembers() {
  try {
    // Fetch the JSON file with your member data
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error('Members data not available');
    const data = await response.json();
    // Use data.members if your JSON has a "members" property
    const membersArray = data.members; // change to simply "data" if no wrapper

    // Filter silver (2) and gold (3) members
    const silverGold = membersArray.filter(
      m => m.membershipLevel === 2 || m.membershipLevel === 3
    );

    // Randomly pick 2 or 3 members
    const numberToShow = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selected = silverGold
      .sort(() => 0.5 - Math.random())
      .slice(0, numberToShow);

    // Create and append cards
    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.image}" alt="${member.name}">
        <p>${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    spotlightContainer.innerHTML = "<p>Spotlights unavailable.</p>";
  }
}

// Call the function
fetchMembers();
