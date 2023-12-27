const Book = require('../models/Book');
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
  Book.find()
  .then((books) => res.status(200).json(books))
  .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
}

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book
    .save()
    .then(() => {
      res.status(201).json({ message: 'Livre enregistré !' });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const oldImagePath = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${oldImagePath}`, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
          }
          Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié!' }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Livre supprimé!' }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.rateBook = (req, res, next) => {
  const updatedRating = {
    userId: req.auth.userId,
    grade: req.body.rating
  };
  //Vérifie que la note est bien comprise entre 0 et 5
  if (updatedRating.grade < 0 || updatedRating.grade > 5) {
    return res.status(400).json({ message: 'rating must be between 0 and 5' });
  }
  //Récupère le livre à noter
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      //Vérifie que l'utilisateur n'a pas déjà noté le livre
      if (book.ratings.find((r) => r.userId === req.auth.userId)) {
        return res.status(400).json({ message: 'User already voted for this book' });
      } else {
        //Ajoute la note à la liste des notes
        book.ratings.push(updatedRating);
        //Calcule la nouvelle note moyenne
        //La note moyenne est calculée en faisant la moyenne de toutes les notes
        //Si on a 3 notes, la moyenne est (note1 + note2 + note3) / 3
        //Si on ajoute une 4ème note, la moyenne devient (note1 + note2 + note3 + note4) / 4
        book.averageRating = (book.averageRating * (book.ratings.length - 1) + updatedRating.grade) / book.ratings.length;
        // Arrondir vers l'entier inférieur 
        book.averageRating = Math.floor(book.averageRating);
        return book.save();
      }
      next();
    })
    .then((updatedBook) => res.status(201).json(updatedBook))
    .catch((error) => res.status(400).json({ error }));
};

//Ajoute une fonction pour récupérer les 3 meilleurs livres par leur note moyenne
exports.getBestBooks = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
