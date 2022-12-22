require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());

app.get('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('First').collection('pets').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('First').collection('pets').insertOne({ name: req.body.name, type: req.body.type, age: req.body.age });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/pets/:type', async (req, res) => {
  try {
    const key = req.params.type;
    if (key === 'byoldest') {
      const con = await client.connect();
      const data = await con.db('First').collection('pets').find({ }).sort({ age: -1 })
        .toArray();
      await con.close();
      res.send(data);
    } else {
      const con = await client.connect();
      const data = await con.db('First').collection('pets').find({ type: `${key}` }).toArray();
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
