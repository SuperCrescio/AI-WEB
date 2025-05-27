// backend/routes/fileRouter.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fileApi = require('../utils/fileApi');

const router = express.Router();

// Configurazione Multer per storage dinamico per utente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.id;
    const uploadPath = path.join(process.cwd(), 'uploads', userId);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + file.originalname;
    cb(null, uniqueName);
  },
});

// Filtro estensioni consentite
const fileFilter = (req, file, cb) => {
  const allowedExt = ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.png', '.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo di file non consentito'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Upload singolo file
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nessun file ricevuto' });
  }
  res.json({ message: 'File caricato con successo', filename: req.file.filename });
});

// Lista dei file dell'utente
router.get('/list', async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await fileApi.listFiles(userId);
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Errore nella lista dei file' });
  }
});

// Download di un file
router.get('/download/:filename', (req, res) => {
  const userId = req.user.id;
  const filename = req.params.filename;
  const filePath = fileApi.getFilePath(userId, filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        res.status(500).json({ error: 'Errore nel download del file' });
      }
    });
  } else {
    res.status(404).json({ error: 'File non trovato' });
  }
});

module.exports = router;
