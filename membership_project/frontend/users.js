const userList = document.querySelector('#userList');
const addNewUser = document.querySelector('#addNewUser');
const order = document.querySelector('#order');
let asc = false;
let desc = false;
const changeOrder = document.querySelector('#changeOrder');

const drawUserCards = (name, surname, email, membership) => {
  const container = document.createElement('div');
  const h2 = document.createElement('h2');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');

  h2.textContent = `${name} ${surname}`;
  span1.textContent = email;
  span2.textContent = membership;

  p1.textContent = 'Email Adress: ';
  p2.textContent = 'Membership: ';

  span1.style.color = '#6b7de3';
  span2.style.color = '#6b7de3';
  container.style.backgroundColor = 'white';
  container.style.margin = '10px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.padding = '30px';
  container.style.boxShadow = '0.5px 0.5px 5px lightgray';

  h2.style.margin = '0 0 50px 0';
  h2.style.fontSize = '18px';
  h2.style.color = 'gray';
  p1.style.margin = '0 0 20px 0';
  p2.style.margin = '0 0 20px 0';

  p1.appendChild(span1);
  p2.appendChild(span2);
  container.appendChild(h2);
  container.appendChild(p1);
  container.appendChild(p2);
  userList.appendChild(container);
};

addNewUser.addEventListener('click', () => {
  location.href = 'adduser.html';
});

function orderDesc() {
  asc = false;
  desc = true;
  changeOrder.textContent = 'DESC';
  userList.innerHTML = '';
  fetch('http://localhost:3000/users/desc', {
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
      const users = response;
      users.forEach((user) => {
        drawUserCards(user.name, user.surname, user.email, user.membership_id);
      });
    })
    .catch((err) => {
      console.warn(err);
    });

  order.removeEventListener('click', orderDesc);
  order.addEventListener('click', orderAsc);
}

function orderAsc() {
  asc = true;
  desc = false;
  changeOrder.textContent = 'ASC';
  userList.innerHTML = '';
  fetch('http://localhost:3000/users/asc', {
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
      const users = response;
      users.forEach((user) => {
        drawUserCards(user.name, user.surname, user.email, user.membership_id);
      });
    })
    .catch((err) => {
      console.warn(err);
    });
  order.removeEventListener('click', orderAsc);
  order.addEventListener('click', orderDesc);
}

order.addEventListener('click', orderAsc);

fetch('http://localhost:3000/users/', {
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
    const users = response;
    users.forEach((user) => {
      drawUserCards(user.name, user.surname, user.email, user.membership_id);
    });
  })
  .catch((err) => {
    console.warn(err);
  });
