const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = (req, res, next) => {
  User.findOne({ // recherche de l'utilisateur dans la base de données
    email: req.body.email
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' });
      }
      bcrypt
        .compare(req.body.password, user.password) // comparaison du mot de passe entré avec le hash enregistré dans la base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( // création d'un token d'authentification
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
