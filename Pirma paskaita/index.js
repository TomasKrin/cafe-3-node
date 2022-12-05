const casual = require("casual");
let random = Math.floor(Math.random() * 10) + 1;
let randomNode = Math.floor(casual.random * 10) + 1;

console.log(casual.city, random, randomNode, casual.name_prefix, casual.first_name, casual.last_name);