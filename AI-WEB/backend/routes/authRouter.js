import express from 'express';
import { signUpWithEmail, signInWithEmail } from '../utils/auth.js';

export const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password sono richiesti' });
  }
  try {
    const { user, session } = await signUpWithEmail(email, password);
    return res.status(200).json({
      message: 'Registrazione completata',
      user: { id: user.id, email: user.email },
      token: session?.access_token || null,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Errore registrazione' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Credenziali mancanti' });
  }
  try {
    const { user, session } = await signInWithEmail(email, password);
    return res.status(200).json({
      message: 'Login eseguito',
      user: { id: user.id, email: user.email },
      token: session.access_token,
    });
  } catch (err) {
    return res.status(401).json({ error: err.message || 'Credenziali non valide' });
  }
});

authRouter.post('/logout', async (req, res) => {
  return res.status(200).json({ message: 'Logout effettuato' });
});
