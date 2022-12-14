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

app.get('/posts', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungimas prie DB
    if (req.query.title) {
      const data = await con.db('First').collection('posts').find({ title: req.query.title }).toArray();
      console.log('title', data);
    } else {
      const data = await con.db('First').collection('posts').find().toArray(); // duomenu istraukimas
      res.send(data);
    }
    await con.close(); // prisijungimo isjugimas
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const con = await client.connect(); // prisijungimas prie DB
    //   res.send({ message: 'works' });
    const data = await con.db('First').collection('posts').findOne(id).toArray(); // duomenu istraukimas
    await con.close(); // prisijungimo isjugimas
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/posts/title/:id', async (req, res) => {
  const key = req.params.id;
  try {
    const con = await client.connect();
    const data = await con.db('First').collection('posts').find(
      {
        title: `${key}`,
      },
    )
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/posts', async (req, res) => {
  try {
    const con = await client.connect();
    if (req.body.title && req.body.body) {
      const data = await con.db('First').collection('posts').insertOne({ title: req.body.title, body: req.body.body });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const edit = req.params.id;
    const data = await con.db('First').collection('posts').updateOne(
      { _id: ObjectId(edit) },
      { $set: req.body },
    );
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const edit = req.params.id;
    const data = await con.db('First').collection('posts').deleteOne({ _id: ObjectId(edit) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
