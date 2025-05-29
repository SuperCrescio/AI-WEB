import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4';
const openaiConfig = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(openaiConfig);

export async function askOpenAI(messages) {
  try {
    const response = await openai.createChatCompletion({
      model: OPENAI_MODEL,
      messages: messages,
      temperature: 0.7,
    });
    const assistantMessage = response.data.choices[0].message?.content;
    return assistantMessage;
  } catch (err) {
    console.error('Errore chiamata OpenAI:', err.response?.data || err.message);
    throw new Error('OpenAI API error');
  }
}
