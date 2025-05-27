// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const authRouter = require('./routes/authRouter');
const fileRouter = require('./routes/fileRouter');
const aiRouter = require('./routes/aiRouter');
const authenticateToken = require('./utils/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Crea la cartella 'uploads' se non esiste
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Router per autenticazione (login, register)
app.use('/api/auth', authRouter);

// Rotte protette (richiedono JWT valido)
app.use('/api/file', authenticateToken, fileRouter);
app.use('/api/ai', authenticateToken, aiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
