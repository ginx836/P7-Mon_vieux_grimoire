const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

const dotenv = require('dotenv');
const result = dotenv.config();

const path = require('path');

const app = express();

//Définit helmet comme middleware global pour sécuriser les en-têtes HTTP. 
//La directive crossOriginResourcePolicy permet de définir la politique de partage des ressources pour les requêtes cross-origin.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));

mongoose
  .connect(
    `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER_URL}/${process.env.ATLAS_DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware qui permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.), d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.) et d'implémenter l' en-tête CORS comme il faut. Ce middleware est à utiliser avant les routes.

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
