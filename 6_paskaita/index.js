require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 8080;
const articleRouter = require('./routes/articles');
// const uri = process.env.URI;

// const client = new MongoClient(uri);

// app.use(cors());
mongoose.connect('mongodb://localhost/blog');
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
  const articless = [
    {
      title: 'Test article',
      createdAt: new Date(),
      description: 'Test description',
    },
    {
      title: 'Test article 2',
      createdAt: new Date(),
      description: 'Test description 2',
    },
  ];
  res.render('articles/index', { articles: articless });
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
