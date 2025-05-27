// backend/utils/openaiApi.js
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

/**
 * Genera una risposta da OpenAI per un prompt utente.
 */
async function generate(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message.content;
}

/**
 * Analizza un contenuto testuale usando OpenAI (e.g. riassunto).
 */
async function analyze(content) {
  const analysisPrompt = 
    "Analizza il seguente contenuto e fornisci un breve riassunto o insight:\n\n" + content;
  const response = await openai.createChatCompletion({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: analysisPrompt }],
  });
  return response.data.choices[0].message.content;
}

module.exports = { generate, analyze };
