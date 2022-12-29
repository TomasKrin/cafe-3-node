require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://randomuser.me/api/');

    const responseData = await response.json();
    const randomName = responseData.results;
    const newName = `${randomName[0].name.first} ${randomName[0].name.last} `;
    console.log(newName);
    const con = await client.connect();
    const data = await con
      .db('people')
      .collection('names')
      .insertOne({ name: newName });
    await con.close();
    console.log(data);

    const conGet = await client.connect();
    const dataGet = await conGet
      .db('people')
      .collection('names')
      .find()
      .toArray();
    await con.close();
    console.log(dataGet);
    res.render('index', {
      dataGet,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port, for task2`);
});
