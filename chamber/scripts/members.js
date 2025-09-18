const membersContainer = document.querySelector('#members');

// Fetch and display all members
async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  membersContainer.innerHTML = ''; // clear existing
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
      <p>Membership Level: ${member.membershipLevel}</p>
    `;
    membersContainer.appendChild(card);
  });
}

// toggle buttons
document.querySelector('#grid-view').addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
});

document.querySelector('#list-view').addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
});

getMembers();
