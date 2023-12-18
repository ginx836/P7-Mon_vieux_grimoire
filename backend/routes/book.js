const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
