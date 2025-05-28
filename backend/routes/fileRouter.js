import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { supabaseAdmin } from '../utils/supabaseClient.js';
import { extractTextFromFile } from '../utils/fileUtil.js';
import { askOpenAI } from '../utils/openaiApi.js';

export const fileRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.id;
    const uploadDir = path.join(process.cwd(), 'uploads', userId);
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

fileRouter.get('/', async (req, res) => {
  const userId = req.user.id;
  try {
    const { data: files, error } = await supabaseAdmin
      .from('files')
      .select('id, filename, mimetype, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return res.json({ files });
  } catch (err) {
    return res.status(500).json({ error: 'Errore nel recuperare i file' });
  }
});

fileRouter.post('/', upload.single('file'), async (req, res) => {
  const userId = req.user.id;
  if (!req.file) {
    return res.status(400).json({ error: 'Nessun file inviato' });
  }
  try {
    const filePath = req.file.path;
    const { originalname, mimetype } = req.file;
    const { data: inserted, error: insertError } = await supabaseAdmin.from('files').insert({
      user_id: userId,
      filename: originalname,
      path: filePath,
      mimetype: mimetype
    }).select();
    if (insertError) throw insertError;
    const newFile = inserted[0];

    let extractedText = '';
    try {
      extractedText = await extractTextFromFile(filePath, mimetype);
    } catch {}
    let aiSummary = null;
    if (extractedText && extractedText.trim().length > 0) {
      const snippet = extractedText.substring(0, 2000);
      const prompt = `L'utente ha caricato un file "${originalname}". Ecco il contenuto:\n"${snippet}"\n\nFornisci un breve riassunto (massimo 5 frasi) di questo file.`;
      try {
        aiSummary = await askOpenAI([
          { role: 'system', content: 'Sei un assistente AI che aiuta a riassumere file caricati dall\'utente.' },
          { role: 'user', content: prompt }
        ]);
      } catch {}
    }

    return res.status(200).json({
      message: 'File caricato con successo',
      file: {
        id: newFile.id,
        filename: newFile.filename,
        mimetype: newFile.mimetype,
        created_at: newFile.created_at
      },
      summary: aiSummary
    });
  } catch (err) {
    return res.status(500).json({ error: 'Errore durante upload file' });
  }
});
