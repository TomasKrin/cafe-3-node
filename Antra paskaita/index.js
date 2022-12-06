// Pradzia uzduotis

// const express = require("express");
// const cors = require("cors");
// const app = express(); //app yra express instance
// const port = 3000;

// // cors //funkcijos refference
// // cors() //funkcijos returnas(instance)

// app.use(cors());

// // const cars = [`BMW`, `Porsche`, `VW`];

// //req - request - Duomenys kuriuos paduoda kvieciantysis, pvz.:POST user duomenys ar validacijos raktas.

// //res - response - duomenys kuriuos grazinam, kai kviecia musu API keliu "/".

// // Pirmas argumentas - kelias i musu API "/"

// // app.get("/", (req, res) => {
// //     res.send(cars);
// // })

// // app.listen(port, () => {
// //     console.log(`Server is running on the localhost:${port} port`);
// // })

// app.get("/", (req, res) => {
//     res.send(cars);
// })

// app.listen(port, () => {
//     console.log(`Server is running on the localhost:${port} port`);
// })

// //CTRL + C, isjungia paleista serveri, serveris issijungia, kai terminale rodo path.

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const names = [`Alex`, `Rose`, `Megan`];

app.get("/users/", (req, res) => {
    res.send(names);
})

app.get(`/users/:firstLetter`, (req, res) => {
    const firstLetter = req.params.firstLetter.toUpperCase();
    const filter = (names, firstLetter) => names.filter(user => user.startsWith(firstLetter));
    const result = filter(names, firstLetter);
    res.send(result);
})

app.post('/users/', (req, res) => {
    res.json({ name: req.body })
    let newUser = req.body.name;
    names.push(newUser);
    console.log(names);
})

app.listen(port, () => {
    console.log(`Server is listening on localhost:${3000} port`)
})