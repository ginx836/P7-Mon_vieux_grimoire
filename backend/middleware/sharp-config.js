const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Fonction pour créer le nouveau nom de fichier avec l'extension "webp"
const createNewFilename = (filename) => filename.replace(/(\.[^.]+)?$/, '.webp');

// Middleware pour redimensionner et convertir les images en webp
const convertAndResizeImage = async (req, res, next) => {
  try {
    if (req.file) {
      const newFilename = createNewFilename(req.file.filename);
      const newImagePath = path.join('images', newFilename);

      await sharp(req.file.path)
      .resize({ height: 400, fit: 'contain' })
      .webp({ quality: 80 })
      .toFile(newImagePath);

      // Supprime l'image originale
      await fs.unlink(req.file.path);

      req.file.filename = newFilename;
    }
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = convertAndResizeImage;
