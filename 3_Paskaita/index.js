// npm init - sukuria package.json faila.

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Ka daro express.json()

// const JSON = {
//     "name": "Tomas"
// }

// const js = {
//     name: "Tomas"
// }

const cars = [
    {
        id: 1,
        make: "BMW",
        model: "530",
        color: "Black"
    },
    {
        id: 2,
        make: "Audi",
        model: "A6",
        color: "White"
    }
];

app.get("/cars", (req, res) => {
    res.send(cars);
});

app.get("/cars/:id", (req, res) => {
    const id = Number(req.params.id); //arba +req.params.id;
    const car = cars.find(car => car.id === id);

    if (car) {
        res.send(car);
    } else {
        res.status(404).send({
            error: "Car Not Found"
        });
    };
    console.log(id);
    console.log(car);
});

// atsiuncia{make, model, color}
// gauna {id, make, model, color}
app.post("/cars", (req, res) => {
    const car = req.body;
    const newCar = { id: Date.now(), ...car };
    console.log(newCar);
    if (newCar.make && newCar.model && newCar.color) {
        cars.push(newCar);
        res.send(newCar);
    } else {
        res.status(400).send({
            error: "Invalid request"
        })
    }

})

app.put("/cars/:id", (req, res) => {
    const id = Number(req.params.id); //arba +req.params.id;
    const car = cars.find(car => car.id === id);

    if (car) {
        res.send(car);
    } else {
        res.status(404).send({
            error: "Car Not Found"
        });
    };

    const edit = req.body;

    console.log(`car`, car);

    if (edit) {
        car.make = edit.make;
        car.model = edit.model;
        car.color = edit.color;
    } else {
        res.status(400).send({
            error: "Invalid request"
        })
    }

    console.log(`edit`, edit);
    console.log(`car`, car);
})

app.delete("/cars/:id", (req, res) => {
    const id = Number(req.params.id); //arba +req.params.id;
    const car = cars.find(car => car.id === id);

    if (car) {
        const carId = cars.indexOf(car);
        cars.splice(carId, 1);
        console.log(`carId`, carId);
        console.log(`cars`, cars);
        res.send(cars);

    } else {
        res.status(404).send({
            error: "Car Not Found"
        });
    };
})

app.listen(port, () => {
    console.log(`Server is running on the ${port} port`);
});