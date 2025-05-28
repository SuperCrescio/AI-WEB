// backend/utils/fileApi.js
const fs = require('fs');
const path = require('path');

/**
 * Restituisce la lista dei nomi dei file caricati dall'utente.
 * Se la cartella dell'utente non esiste, restituisce [].
 */
async function listFiles(userId) {
  const userDir = path.join(process.cwd(), 'uploads', userId);
  if (!fs.existsSync(userDir)) {
    return [];
  }
  return fs.readdirSync(userDir);
}

/**
 * Costruisce il percorso assoluto del file di un utente.
 */
function getFilePath(userId, filename) {
  return path.join(process.cwd(), 'uploads', userId, filename);
}

/**
 * Legge il contenuto di un file come Buffer.
 */
async function getFileContent(userId, filename) {
  const filePath = getFilePath(userId, filename);
  return fs.promises.readFile(filePath);
}

module.exports = { listFiles, getFilePath, getFileContent };
