/* eslint-disable no-undef */
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name');
  const price = document.querySelector('#price');
  const description = document.querySelector('#description');

  fetch('http://localhost:3000/memberships/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      price: price.value,
      description: description.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(() => {
      location.href = 'memberships.html';
    })
    .catch((err) => {
      console.warn(err);
    });
});
