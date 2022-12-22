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
//     const data = await con.db('First').collection('purchase_orders').insertMany([
//       { product: 'toothbrush', total: 4.75, customer: 'Mike' },
//       { product: 'guitar', total: 199.99, customer: 'Tom' },
//       { product: 'milk', total: 11.33, customer: 'Mike' },
//       { product: 'pizza', total: 8.5, customer: 'Karen' },
//       { product: 'toothbrush', total: 4.75, customer: 'Karen' },
//       { product: 'pizza', total: 4.75, customer: 'Dave' },
//       { product: 'toothbrush', total: 4.75, customer: 'Mike' },
//     ]);
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     // find out how many toothbrushes were sold
//     const data = await con
//       .db('First')
//       .collection('purchase_orders')
//       .count({ product: 'toothbrush' });
//     await con.close();
//     res.send({ count: data });
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     // find list of all products sold
//     const data = await con
//       .db('First')
//       .collection('purchase_orders')
//       .distinct('product');
//     await con.close();
//     console.log(data);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     // find the total amount of money spent by each customer
//     const data = await con
//       .db('First')
//       .collection('purchase_orders')
//       .aggregate(
//         [
//           { $match: {} },
//           { $group: { _id: '$customer', total: { $sum: '$total' } } },
//         ],
//       ).toArray();
//     await con.close();
//     console.log(data);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     // find the total amount of money got from each product
//     const data = await con
//       .db('First')
//       .collection('purchase_orders')
//       .aggregate(
//         [
//           { $match: {} },
//           { $group: { _id: '$product', total: { $sum: '$total' } } },
//         ],
//       ).toArray();
//     await con.close();
//     console.log(data);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     // sort the info we got (asc, desc);
//     const data = await con
//       .db('First')
//       .collection('purchase_orders')
//       .aggregate(
//         [
//           { $match: {} },
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

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    // get info about specific customers
    const data = await con
      .db('First')
      .collection('purchase_orders')
      .aggregate(
        [
          { $match: { customer: { $in: ['Mike', 'Karen'] } } },
          { $group: { _id: '$customer', total: { $sum: '$total' } } },
          //   { $sort: { total: 1 } },
          { $sort: { total: -1 } },
        ],
      ).toArray();
    await con.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
