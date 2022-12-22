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

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     // get info about specific customers
//     const data = await con
//       .db('First')
//       .collection('purchase_orders')
//       .aggregate(
//         [
//           { $match: { customer: { $in: ['Mike', 'Karen'] } } },
//           { $group: { _id: '$customer', total: { $sum: '$total' } } },
//           //   { $sort: { total: 1 } },
//           { $sort: { total: -1 } },
//         ],
//       ).toArray();
//     await con.close();
//     console.log(data);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

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

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('First')
      .collection('products')
      .find()
      .toArray();
    await con.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/categoryvalue', async (req, res) => {
  try {
    const con = await client.connect();
    // const data = await con
    //   .db('First')
    //   .collection('products')
    //   .aggregate(
    //     [
    //       { $match: {} },
    //       {
    //         $lookup: {
    //           from: 'categories',
    //           localField: 'category',
    //           foreignField: 'title',
    //           as: 'title',
    //         },
    //       },
    //       { $group: { _id: '$category', total: { $sum: '$price' } } },
    //       { $sort: { total: -1 } },
    //     ],
    //   )
    //   .toArray();
    const data = await con
      .db('First')
      .collection('categories')
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'title',
            foreignField: 'category',
            as: 'products',
          },
        },
        {
          $project: {
            category: '$title',
            total: {
              $sum: '$products.price',
            },
          },
        },
      ])
      .toArray();
    await con.close();
    console.log(
      [
        { category: `${data}` },
      ],
    );
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port, for task2`);
});
