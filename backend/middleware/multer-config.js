const multer = require('multer');

// Pour générer des noms de fichiers aléatoires
const {v4: uuidv4} = require('uuid');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const nameWithoutExtension = file.originalname.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    const filename = `${nameWithoutExtension}_${uuidv4()}.${extension}`;
    callback(null, filename);
  }
});

module.exports = multer({ storage: storage }).single('image');
