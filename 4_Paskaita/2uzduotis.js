require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

const posts = [
  {
    id: 1,
    title: 'hello world',
    body: 'i am body',
  },
];

app.use(cors());
app.use(express.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const getPost = posts.find((post) => post.id === id);

  if (getPost) {
    res.send(getPost);
  } else {
    res.status(404).send({
      error: 'Car Not Found',
    });
  }
});

app.get('/posts?title=randomTitle', (req, res) => {
  const titleSearch = req.query.title;

  if (titleSearch) {
    const getPost = posts.find((post) => post.title === titleSearch);
    if (getPost) {
      res.send(getPost);
    } else {
      res.status(404).send({
        error: 'Post Not Found',
      });
    }
  } else {
    res.status(404).send({
      error: 'Post Not Found',
    });
  }
});

app.post('/posts', (req, res) => {
  const newPost = req.body;
  const addNewPost = { id: Date.now(), ...newPost };
  if (addNewPost.title && addNewPost.body) {
    posts.push(addNewPost);
    res.send(posts);
  } else {
    res.status(400).send({
      error: 'Invalid request',
    });
  }
});

app.put('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const putPost = posts.find((post) => post.id === id);

  if (putPost) {
    res.send(putPost);
  } else {
    res.status(404).send({
      error: 'User Not Found',
    });
  }

  const edit = req.body;

  if (edit) {
    putPost.make = edit.make;
    putPost.model = edit.model;
    putPost.color = edit.color;
  } else {
    res.status(400).send({
      error: 'Invalid request',
    });
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const delPost = posts.find((post) => post.id === id);

  if (delPost) {
    const postId = posts.indexOf(delPost);
    posts.splice(postId, 1);
    res.send(posts);
  } else {
    res.status(404).send({
      error: 'Car Not Found',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
