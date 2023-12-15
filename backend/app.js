const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.use('/api/books', (req, res) => {
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

