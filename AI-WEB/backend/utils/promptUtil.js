import { supabaseAdmin } from './supabaseClient.js';
import { extractTextFromFile } from './fileUtil.js';

export async function parsePromptTemplate(promptTemplate, user) {
  if (!promptTemplate) return '';
  let prompt = promptTemplate;

  if (prompt.includes('{userEmail}') && user?.email) {
    prompt = prompt.replace(/\{userEmail\}/g, user.email);
  }
  if (prompt.includes('{currentDate}')) {
    const today = new Date().toLocaleDateString();
    prompt = prompt.replace(/\{currentDate\}/g, today);
  }
  const fileTagRegex = /\{fileText:([^}]+)\}/g;
  let match;
  while ((match = fileTagRegex.exec(prompt)) !== null) {
    const filename = match[1].trim();
    try {
      const { data: files } = await supabaseAdmin
        .from('files')
        .select('path, filename, mimetype')
        .eq('user_id', user.id)
        .eq('filename', filename);
      if (files && files.length > 0) {
        const file = files[0];
        const text = await extractTextFromFile(file.path, file.mimetype);
        const truncated = text.length > 5000 ? text.substring(0, 5000) + '...' : text;
        prompt = prompt.replace(match[0], truncated);
      } else {
        prompt = prompt.replace(match[0], '');
      }
    } catch (err) {
      console.error('Errore elaborazione segnaposto fileText:', err);
      prompt = prompt.replace(match[0], '');
    }
  }
  return prompt;
}
