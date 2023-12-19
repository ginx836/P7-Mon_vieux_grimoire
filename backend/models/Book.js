const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: false},
  year: { type: Number, required: false },
  genre: { type: String, required: false },
  ratings: [
    {
      userId: { type: String, required: false },
      grade: { type: Number, required: false }
    }
  ],
  averageRating: { type: Number, required: false }
});

module.exports = mongoose.model('Book', bookSchema);
