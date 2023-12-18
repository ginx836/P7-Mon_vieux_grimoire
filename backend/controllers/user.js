const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // hashage du mot de passe
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save() // enregistrement de l'utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {};
