const express = require('express');
const fileApi = require('../utils/fileApi');
const openaiApi = require('../utils/openaiApi');

const router = express.Router();

/**
 * Genera una risposta da OpenAI basata sul prompt fornito dall'utente.
 * Opzionalmente, include i contenuti di uno o più file allegati.
 * Corpo della richiesta (JSON): { prompt: string, filenames?: [string] }
 */
router.post('/generate', async (req, res) => {
  try {
    const userId = req.user.id;
    const { prompt, filenames } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Il prompt è obbligatorio' });
    }

    let finalPrompt = prompt;
    // Se ci sono file allegati, leggine il contenuto e aggiungilo al prompt
    if (filenames && Array.isArray(filenames) && filenames.length > 0) {
      let combinedContent = '';
      for (const name of filenames) {
        try {
          const contentBuffer = await fileApi.getFileContent(userId, name);
          combinedContent += '\n' + contentBuffer.toString();
        } catch {
          return res.status(400).json({ error: `Impossibile leggere il file: ${name}` });
        }
      }
      finalPrompt += '\n\nContenuto dei file allegati:\n' + combinedContent;
    }

    const result = await openaiApi.generate(finalPrompt);
    res.json({ result });
  } catch (error) {
    console.error('Errore AI /generate:', error);
    res.status(500).json({ error: 'Errore durante la generazione AI' });
  }
});

/**
 * Analizza il contenuto di un file utilizzando OpenAI (ad es. sommario o insight).
 * Corpo della richiesta (JSON): { filename: string }
 */
router.post('/analyze', async (req, res) => {
  try {
    const userId = req.user.id;
    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({ error: 'Il nome del file è obbligatorio' });
    }

    let contentBuffer;
    try {
      contentBuffer = await fileApi.getFileContent(userId, filename);
    } catch {
      return res.status(400).json({ error: `Impossibile leggere il file: ${filename}` });
    }
    const content = contentBuffer.toString();

    const analysis = await openaiApi.analyze(content);
    res.json({ analysis });
  } catch (error) {
    console.error('Errore AI /analyze:', error);
    res.status(500).json({ error: 'Errore durante l\'analisi AI' });
  }
});

module.exports = router;
