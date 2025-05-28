import express from 'express';
import { supabaseAdmin } from '../utils/supabaseClient.js';
import { askOpenAI } from '../utils/openaiApi.js';
import { parsePromptTemplate } from '../utils/promptUtil.js';
import { extractTextFromFile } from '../utils/fileUtil.js';

export const aiRouter = express.Router();

aiRouter.post('/chat', async (req, res) => {
  const userId = req.user.id;
  let { promptId, promptContent, messages, message, fileIds } = req.body;

  if (!promptId && !promptContent) {
    return res.status(400).json({ error: 'Specificare promptId o promptContent' });
  }
  try {
    let systemPrompt = promptContent;
    if (!systemPrompt) {
      const { data: prompts } = await supabaseAdmin
        .from('prompts')
        .select('content')
        .eq('id', promptId)
        .eq('user_id', userId);
      if (!prompts || !prompts.length) {
        return res.status(404).json({ error: 'Prompt non trovato' });
      }
      systemPrompt = prompts[0].content;
    }
    systemPrompt = await parsePromptTemplate(systemPrompt, req.user);
    const conversation = [];
    conversation.push({ role: 'system', content: systemPrompt });
    if (fileIds && Array.isArray(fileIds) && fileIds.length > 0) {
      let fileContents = '';
      for (const fileId of fileIds) {
        const { data: files } = await supabaseAdmin
          .from('files')
          .select('filename, mimetype, path')
          .eq('id', fileId)
          .eq('user_id', userId);
        if (files && files.length > 0) {
          const file = files[0];
          let text = '';
          try {
            text = await extractTextFromFile(file.path, file.mimetype);
          } catch {}
          if (text) {
            const truncated = text.length > 4000 ? text.substring(0, 4000) + '...' : text;
            fileContents += `\n[Contenuto del file "${file.filename}"]\n${truncated}\n`;
          }
        }
      }
      if (fileContents) {
        conversation.push({ role: 'system', content: `Informazioni aggiuntive dai file allegati dall'utente:${fileContents}` });
      }
    }
    if (messages && Array.isArray(messages)) {
      for (const msg of messages) {
        if (!msg.role || !msg.content) continue;
        if (msg.role === 'user' || msg.role === 'assistant') {
          conversation.push({ role: msg.role, content: msg.content });
        }
      }
    }
    if (message) {
      conversation.push({ role: 'user', content: message });
    }

    const aiResponse = await askOpenAI(conversation);
    return res.status(200).json({ message: aiResponse });
  } catch (err) {
    return res.status(500).json({ error: 'Errore durante la generazione della risposta AI' });
  }
});
