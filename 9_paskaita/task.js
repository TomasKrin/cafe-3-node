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

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('users')
      .find()
      .toArray();
    await con.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('users')
      .find()
      .toArray();
    await con.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/users', async (req, res) => {
  try {
    console.log(req);
    const con = await client.connect();
    const data = await con.db('First').collection('users').insertOne({ name: req.body.name, email: req.body.email });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/comments', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('users')
      .aggregate([
        { $match: {} },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'user_id',
            as: 'comments',
          },
        },
        { $unwind: '$comments' },
        {
          $project: {
            user_name: '$name',
            comment: '$comments.comment',
          },
        },
      ])
      .toArray();
    await con.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const key = req.params;
    const con = await client.connect();
    if (key) {
      const data = await con
        .db('First')
        .collection('comments')
        .deleteOne({ _id: ObjectId(key) });
      await con.close();
      console.log(data);
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port, for task2`);
});
