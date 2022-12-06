const express = require("express");
const cors = require("cors");
const app = express(); //app yra express instance
const port = 3000;

// cors //funkcijos refference
// cors() //funkcijos returnas(instance)

app.use(cors());

const cars = [`BMW`, `Porsche`, `VW`];

//req - request - Duomenys kuriuos paduoda kvieciantysis, pvz.:POST user duomenys ar validacijos raktas.

//res - response - duomenys kuriuos grazinam, kai kviecia musu API keliu "/".

// Pirmas argumentas - kelias i musu API "/"

app.get("/", (req, res) => {
    res.send(cars);
})

app.listen(port, () => {
    console.log(`Server is running on the localhost:${port} port`);
})

//CTRL + C, isjungia paleista serveri, serveris issijungia, kai terminale rodo path.