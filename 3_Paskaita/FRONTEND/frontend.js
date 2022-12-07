const form = document.querySelector(`form`);

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const make = document.querySelector(`#make`);
    const model = document.querySelector(`#model`);
    const color = document.querySelector(`#color`);

    console.log(make.value, model.value, color.value);

    fetch(`http://localhost:3000/cars/
    `, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            make: make.value,
            model: model.value,
            color: color.value
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(() => {
            location.href = 'frontend_2.html';
        })
        .catch((err) => {
            console.warn(err);
        });

})

fetch("http://localhost:3000/cars/")
    .then((resp) => resp.json())
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.warn(err);
    })