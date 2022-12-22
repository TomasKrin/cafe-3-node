const form = document.querySelector('form');
const select = document.querySelector('#memb');

const selectOptions = (name, id) => {
  const membership = document.createElement('option');

  membership.value = id;
  membership.textContent = name;

  select.appendChild(membership);
};

fetch('http://localhost:3000/memberships/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((response) => {
    const memberships = response;
    memberships.forEach((service) => {
      selectOptions(service.name, service._id);
    });
  })
  .catch((err) => {
    console.warn(err);
  });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name');
  const surname = document.querySelector('#lastName');
  const email = document.querySelector('#email');

  fetch('http://localhost:3000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      surname: surname.value,
      email: email.value,
      membership_id: select.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(() => {
      location.href = 'users.html';
    })
    .catch((err) => {
      console.warn(err);
    });
});
