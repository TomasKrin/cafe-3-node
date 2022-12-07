const carCard = document.createElement(`table`);
document.body.append(carCard);
const pMakeHead = document.createElement(`th`);
const pModelHead = document.createElement(`th`);
const pColorHead = document.createElement(`th`);
carCard.appendChild(pMakeHead);
carCard.appendChild(pModelHead);
carCard.appendChild(pColorHead);

const createCard = (car) => {
    const pMake = document.createElement(`td`);
    const pModel = document.createElement(`td`);
    const pColor = document.createElement(`td`);
    const tr = document.createElement(`tr`);
    const delBtn = document.createElement(`button`);
    const editBtn = document.createElement(`button`);
    const btnCont = document.createElement(`td`);

    pMakeHead.textContent = `Manufacturer`;
    pModelHead.textContent = `Model`;
    pColorHead.textContent = `Color`;

    delBtn.textContent = `Del`;
    editBtn.textContent = `Edit`;
    pMake.textContent = car.make;
    pModel.textContent = car.model;
    pColor.textContent = car.color;

    carCard.style.border = `1px solid black`;
    carCard.style.maxWidth = `fit-content`;
    carCard.style.padding = `10px`;
    pMake.style.border = `1px solid black`;
    pModel.style.border = `1px solid black`;
    pColor.style.border = `1px solid black`;
    editBtn.style.marginLeft = `10px`;
    btnCont.style.paddingLeft = `10px`;

    btnCont.appendChild(delBtn);
    btnCont.appendChild(editBtn);
    carCard.append(tr);
    carCard.appendChild(pMake);
    carCard.appendChild(pModel);
    carCard.appendChild(pColor);
    carCard.appendChild(btnCont);

    delBtn.addEventListener(`click`, () => {
        fetch(`http://localhost:3000/cars/${car.id}
        `, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json'
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

    editBtn.addEventListener(`click`, () => {
        pMake.textContent = ``;
        pModel.textContent = ``;
        pColor.textContent = ``;

        const editMake = document.createElement(`input`);
        const editModel = document.createElement(`input`);
        const editColor = document.createElement(`input`);
        const saveEditBtn = document.createElement(`button`);

        saveEditBtn.textContent = `Save Changes`;
        editMake.value = car.make;
        editModel.value = car.model;
        editColor.value = car.color;

        pMake.appendChild(editMake);
        pModel.appendChild(editModel);
        pColor.appendChild(editColor);

        btnCont.textContent = ``;

        btnCont.appendChild(saveEditBtn);

        saveEditBtn.addEventListener(`click`, () => {
            fetch(`http://localhost:3000/cars/${car.id}`,
                {
                    method: `PUT`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        make: editMake.value,
                        model: editModel.value,
                        color: editColor.value,
                    })
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((result) => {
                    console.log(`PUT`, result);
                    location.reload();
                })
                .catch(() => {
                    console.warn(`PUT Fetch Failed`);
                });
        });

    });
}

fetch("http://localhost:3000/cars/")
    .then((resp) => resp.json())
    .then((response) => {
        const cars = response;
        console.log(cars);
        cars.forEach((car) => {
            createCard(car);
        })
    })
    .catch((err) => {
        console.warn(err);
    })

