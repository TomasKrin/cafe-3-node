require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('First').collection('pets').find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('First').collection('pets').insertOne({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/pets/:type', async (req, res) => {
  const typeKey = req.params.type;
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('pets')
      .find({ type: `${typeKey}` })
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/byoldest', async (req, res) => {
  const sort = req.query;
  const typeKey = req.query;
  console.log(req.query);
  console.log(sort, typeKey);
  try {
    if (sort) {
      if (sort === 'asc') {
        const con = await client.connect();
        const data = await con
          .db('First')
          .collection('pets')
          // .find(type ? { $or: [{ type: { $in: type.split(',') } }] } : {})
          .find()
          .sort({ age: -1 })
          .toArray();
        console.log(data);
        res.send(data);
      }
      if (sort === 'dsc') {
        const con = await client.connect();
        const data = await con
          .db('First')
          .collection('pets')
        // .find(type ? { $or: [{ type: { $in: type.split(',') } }] } : {})
          .find()
          .sort({ age: 1 })
          .toArray();
        console.log(data);
        res.send(data);
      }
    } else {
      const con = await client.connect();
      const data = await con
        .db('First')
        .collection('pets')
        // .find(type ? { $or: [{ type: { $in: type.split(',') } }] } : {})
        .find({ $or: [{ type: typeKey }] })
        .sort({ age: sort === 'asc' ? 1 : -1 })
        .toArray();
      console.log(data);
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// pagal query filtruoja po klaustuko
// app.get("/", async (req, res) => {
//   const { brand } = req.query;

//   try {
//     const con = await client.connect();

//     const data = await con

//       .db("first")

//       .collection("cars")

//       .find(brand ? { brand } : {})

//       .toArray();

//     await con.close();

//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
