import express from 'express';
import { supabaseAdmin } from '../utils/supabaseClient.js';

export const promptRouter = express.Router();

promptRouter.get('/', async (req, res) => {
  const userId = req.user.id;
  try {
    const { data: prompts, error } = await supabaseAdmin
      .from('prompts')
      .select('id, title, content, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    const userPrompts = prompts || [];
    const demoPrompts = [
      { id: 'demo-travel', title: 'Guida Turistica AI (Demo)', content: 'Sei un assistente AI esperto di viaggi. Rispondi alle domande fornendo consigli di viaggio dettagliati.' },
      { id: 'demo-fitness', title: 'Personal Trainer AI (Demo)', content: 'Sei un assistente AI esperto di fitness e benessere.' }
    ];
    return res.json({ prompts: [...demoPrompts, ...userPrompts] });
  } catch (err) {
    return res.status(500).json({ error: 'Errore nel recuperare i prompt' });
  }
});

promptRouter.post('/', async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Titolo e contenuto del prompt sono richiesti' });
  }
  try {
    const { data: inserted, error } = await supabaseAdmin.from('prompts').insert({
      user_id: userId,
      title,
      content
    }).select();
    if (error) throw error;
    const newPrompt = inserted[0];
    return res.status(201).json({ message: 'Prompt creato', prompt: newPrompt });
  } catch (err) {
    return res.status(500).json({ error: 'Errore durante la creazione del prompt' });
  }
});

promptRouter.put('/:id', async (req, res) => {
  const userId = req.user.id;
  const promptId = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Titolo e contenuto sono richiesti' });
  }
  try {
    const { data: updated, error } = await supabaseAdmin.from('prompts')
      .update({ title, content })
      .eq('id', promptId)
      .eq('user_id', userId)
      .select();
    if (error) throw error;
    if (!updated.length) {
      return res.status(404).json({ error: 'Prompt non trovato o non autorizzato' });
    }
    const prompt = updated[0];
    return res.status(200).json({ message: 'Prompt aggiornato', prompt });
  } catch (err) {
    return res.status(500).json({ error: 'Errore durante l\'aggiornamento del prompt' });
  }
});
