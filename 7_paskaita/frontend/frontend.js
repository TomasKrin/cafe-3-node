// eslint-disable-next-line
const dogBtn = document.querySelector('#dog');
// eslint-disable-next-line
const catBtn = document.querySelector('#cat');
// eslint-disable-next-line
const bunnyBtn = document.querySelector('#bunny');
// eslint-disable-next-line
const age = document.querySelector(`#age`);
const table = document.createElement('table');
const active = true;

fetch('http://localhost:3000/pets')
  .then((response) => response.json())
  .then((data) => {
    const pets = data;
    //   pets.forEach((pet) => {

    //     drawTable(pet, type);
    //   });
    const sortedPets = pets.sort((petType) => petType === type);

    sortedPets.forEach((pet) => {
      drawTable(pet, type);
    });
  });

const drawTable = (pet, type) => {
  if (pet.type.toLowerCase() === type) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    td1.textContent = pet.name;
    td2.textContent = pet.type;
    td3.textContent = pet.age;

    const main = document.querySelector('main');
    main.appendChild(table);
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
  }
};

// const btnEvent = (btn, type) => {
// //   btn.addEventListener('click', fetchGet(btn, type));
//   fetchGet(btn, type);
//   btn.removeEventListener('click', btnEvent);
// };

// dogBtn.addEventListener('click', () => {
//   btnEvent(dogBtn, 'dog');
// });
// catBtn.addEventListener('click', () => {
//   btnEvent(catBtn, 'cat');
// });
// bunnyBtn.addEventListener('click', () => {
//   btnEvent(bunnyBtn, 'bunny');
// });
