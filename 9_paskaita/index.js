require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/categories', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('categories')
      .find()
      .toArray();
    await con.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const key = req.params;
    const con = await client.connect();
    if (key) {
      const data = await con
        .db('First')
        .collection('products')
        .deleteOne({ _id: ObjectId(key) });
      await con.close();
      console.log(data);
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('products')
      .deleteMany();
    await con.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port, for task2`);
});
