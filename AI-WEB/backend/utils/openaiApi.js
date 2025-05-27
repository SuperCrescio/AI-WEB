const { Configuration, OpenAIApi } = require('openai');

// Configurazione client OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Genera una risposta da OpenAI data una stringa di prompt.
 */
async function generate(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message.content;
}

/**
 * Analizza un contenuto testuale richiedendo a OpenAI di fornire insights o riassunto.
 */
async function analyze(content) {
  const analysisPrompt = "Analizza il seguente contenuto e fornisci un breve riassunto o insight:\n\n" + content;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: analysisPrompt }],
  });
  return response.data.choices[0].message.content;
}

module.exports = {
  generate,
  analyze,
};
