import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './routes/authRouter.js';
import { fileRouter } from './routes/fileRouter.js';
import { promptRouter } from './routes/promptRouter.js';
import { aiRouter } from './routes/aiRouter.js';
import { authMiddleware } from './utils/auth.js';

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRouter);

app.use('/api', authMiddleware);
app.use('/api/files', fileRouter);
app.use('/api/prompts', promptRouter);
app.use('/api/ai', aiRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`AI-WEB backend listening on http://localhost:${PORT}`);
  });
}
