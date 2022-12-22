/* eslint-disable no-console */
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

app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('projektas')
      .collection('memberships')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/memberships', async (req, res) => {
  try {
    if (req.body.name && req.body.price && req.body.description) {
      const con = await client.connect();
      const data = await con
        .db('projektas')
        .collection('memberships')
        .insertOne({
          name: req.body.name,
          price: Number(req.body.price),
          description: req.body.description,
        });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    if (req.body.name && req.body.surname && req.body.email && req.body.membership_id) {
      const con = await client.connect();
      const data = await con
        .db('projektas')
        .collection('users')
        .insertOne({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          membership_id: ObjectId(req.body.membership_id),
        });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/memberships/:id', async (req, res) => {
  try {
    const key = req.params;
    const con = await client.connect();
    if (key) {
      const data = await con
        .db('projektas')
        .collection('memberships')
        .deleteOne({ _id: ObjectId(key) });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/users/asc', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('projektas')
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'memberships',
            localField: 'membership_id',
            foreignField: '_id',
            as: 'membership_id',
          },
        },
        { $unwind: '$membership_id' },
        {
          $project: {
            name: '$name',
            surname: '$surname',
            email: '$email',
            membership_id: '$membership_id.name',
          },
        },
        { $sort: { name: 1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/users/desc', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('projektas')
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'memberships',
            localField: 'membership_id',
            foreignField: '_id',
            as: 'membership_id',
          },
        },
        { $unwind: '$membership_id' },
        {
          $project: {
            name: '$name',
            surname: '$surname',
            email: '$email',
            membership_id: '$membership_id.name',
          },
        },
        { $sort: { name: -1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('projektas')
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'memberships',
            localField: 'membership_id',
            foreignField: '_id',
            as: 'membership_id',
          },
        },
        { $unwind: '$membership_id' },
        {
          $project: {
            name: '$name',
            surname: '$surname',
            email: '$email',
            membership_id: '$membership_id.name',
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
