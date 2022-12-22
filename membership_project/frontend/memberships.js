const membershipList = document.querySelector('#membershipList');
const addNewMemb = document.querySelector('#addNewMemb');

const drawMembershipCards = (name, price, description, id) => {
  const container = document.createElement('div');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const btnDiv = document.createElement('div');
  const delBtn = document.createElement('button');
  const i = document.createElement('i');
  i.setAttribute('class', 'fa-solid fa-trash');

  h2.textContent = `$${price} ${name}`;
  p.textContent = description;
  delBtn.appendChild(i);

  btnDiv.style.borderTop = '1px solid lightgray';
  btnDiv.style.width = '100%';
  btnDiv.style.display = 'flex';
  btnDiv.style.justifyContent = 'flex-end';
  btnDiv.style.marginTop = '30px';

  delBtn.style.margin = '30px';
  delBtn.style.color = 'red';
  delBtn.style.backgroundColor = '#FFE4E1';
  delBtn.style.border = 'none';
  delBtn.style.borderRadius = '5px';
  delBtn.style.padding = '13px 15px';
  delBtn.style.cursor = 'pointer';

  container.style.backgroundColor = 'white';
  container.style.margin = '10px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.boxShadow = '0.5px 0.5px 5px lightgray';

  p.style.margin = '0';

  btnDiv.appendChild(delBtn);
  container.appendChild(h2);
  container.appendChild(p);
  container.appendChild(btnDiv);
  membershipList.appendChild(container);

  delBtn.addEventListener('click', () => {
    fetch(`http://localhost:3000/memberships/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.warn(err);
      });
  });
};

addNewMemb.addEventListener('click', () => {
  location.href = 'addmemb.html';
});

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
      drawMembershipCards(service.name, service.price, service.description, service._id);
    });
  })
  .catch((err) => {
    console.warn(err);
  });
