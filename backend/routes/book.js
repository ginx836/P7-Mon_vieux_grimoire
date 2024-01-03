const express = require('express');
const router = express.Router();

//Importe les middlewares utilisés pour les routes des livres
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');

//Importe le controller pour associer les fonctions aux différentes routes
const bookCtrl = require('../controllers/book');

//Définit les routes avec le chemin de base /api/books
router.get('/bestrating', bookCtrl.getBestBooks);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);
router.post('/', auth, multer, sharp, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);
router.put('/:id', auth, multer, sharp, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

//Exporte le router pour utilisation dans app.js
module.exports = router;
