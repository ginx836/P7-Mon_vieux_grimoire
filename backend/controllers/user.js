const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require ('dotenv').config();

exports.signup = (req, res, next) => {
  //Vérification du format du mot de passe avec une expression régulière
  //Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  const emailRegex = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/;

  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      error: 'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial',
      password: req.body.password
    });
  }

  //Vérification du format de l'adresse e-mail avec une expression régulière

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      error: 'Adresse e-mail invalide',
      email: req.body.email
    });
  }

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
  
  const secretKey = process.env.JWT_SECRET_KEY || 'RANDOM_TOKEN_SECRET';

  User.findOne({
    // recherche de l'utilisateur dans la base de données
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
            token: jwt.sign(
              // création d'un token d'authentification
              { userId: user._id },
              secretKey,
              { expiresIn: '24h' }
            )
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
