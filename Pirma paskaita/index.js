const casual = require("casual");
let random = Math.floor(Math.random() * 10) + 1;
// let randomNode = Math.floor(casual.random * 10) + 1;

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + 1) + min
}

// const name = "Rokas";

// const surname = "Andreikenas";

// const fullName = name + " " + surname; // bad

// const newFullName = `${name} ${surname}` // good

console.log(casual.city, random, casual.integer(1, 10), `${casual.name_prefix} ${casual.first_name} ${casual.last_name}`);