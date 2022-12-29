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
app.use('/styles', express.static(`${__dirname}/styles`));

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('articles')
      .find()
      .toArray();
    await con.close();
    console.log(data);
    res.render('front', {
      data,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
