require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 8080;
const users = db.data;
const editUsers = users.map((arr) => arr);

// Jeigu neimportavo env failo
// 1. patikrinti kintamuju pavadinimus
// 2. modulio importavima ir config paleidima
// 3. .env failas turi buti root folderyje prie package.json

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => { res.send(editUsers); });

app.get('/users/:search', (req, res) => {
  const key = req.params.search;
  const check = Number(key);
  if (key) {
    if (!check) {
      if (key === 'emails') {
        const emails = [];
        editUsers.forEach((user) => {
          const { email } = user;
          const userEmail = email;
          emails.push(userEmail);
        });
        res.send(emails);
      } else {
        const userGet = editUsers.filter((user) => user.car.toLowerCase() === key.toLowerCase());
        res.send(userGet);
      }
    } else {
      const userGet = editUsers.find((user) => user.id === check);
      res.send(userGet);
    }
  } else {
    res.status(404).send({
      error: 'User Not Found',
    });
  }
});

app.get('/users/gender/:search', (req, res) => {
  const key = req.params.search;
  if (key.toLowerCase() === 'female') {
    const females = editUsers.filter((user) => user.gender.toLowerCase() === 'female');
    const searchResult = [];
    females.forEach((female) => {
      const genderFemale = { firstName: female.first_name, lastName: female.last_name };
      searchResult.push(genderFemale);
    });
    res.send(searchResult);
  } else {
    res.status(404).send({
      error: 'This gender, you search for, is not a Female',
    });
  }
});

app.post('/users', (req, res) => {
  const user = req.body;
  const newUser = { id: Date.now(), ...user };
  if (newUser.first_name && newUser.last_name && newUser.email && newUser.gender && newUser.car) {
    editUsers.push(newUser);
    res.send(editUsers);
  } else {
    res.status(400).send({
      error: 'Invalid request',
    });
  }
});

app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userPut = editUsers.find((user) => user.id === id);

  if (userPut) {
    res.send(userPut);
  } else {
    res.status(404).send({
      error: 'User Not Found',
    });
  }

  const edit = req.body;

  if (edit) {
    userPut.make = edit.make;
    userPut.model = edit.model;
    userPut.color = edit.color;
  } else {
    res.status(400).send({
      error: 'Invalid request',
    });
  }
});

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userDel = editUsers.find((user) => user.id === id);

  if (userDel) {
    const userId = editUsers.indexOf(userDel);
    editUsers.splice(userId, 1);
    res.send(editUsers);
  } else {
    res.status(404).send({
      error: 'Car Not Found',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
