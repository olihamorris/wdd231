const membersContainer = document.getElementById('members');
const gridButton = document.getElementById('grid-view');
const listButton = document.getElementById('list-view');

gridButton.addEventListener('click', () => {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
});

listButton.addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
});

// Fetch your JSON file of members (adjust path if needed)
fetch('data/members.json')
  .then(response => response.json())
  .then(data => {
    displayMembers(data.members);
  });

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    membersContainer.appendChild(card);
  });
}

