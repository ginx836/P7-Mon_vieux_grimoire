const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const result = dotenv.config();

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER_URL}/${process.env.ATLAS_DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.get('/api/books', (req, res) => {
  const book = [
    {
      userId: '1',
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      imageUrl: 'https://m.media-amazon.com/images/I/81gOJoEgVoL._SL1500_.jpg',
      year: 1998,
      genre: 'Fantasy'
    }
  ];

  res.status(200).json(book);
});

module.exports = app;
