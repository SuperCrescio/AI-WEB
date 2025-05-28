import { supabase, supabaseAdmin } from './supabaseClient.js';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token mancante' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Token non valido' });
    }
    req.user = { id: user.id, email: user.email };
    return next();
  } catch (err) {
    console.error('Errore authMiddleware:', err);
    return res.status(500).json({ error: 'Errore interno di autenticazione' });
  }
}

export async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw error;
  }
  const { user, session } = data;
  if (!user) {
    throw new Error('Registrazione fallita');
  }
  try {
    await supabaseAdmin.from('users').insert({ id: user.id, email: user.email });
  } catch {}
  return { user, session };
}

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  }
  const { user, session } = data;
  if (!session) {
    throw new Error('Credenziali non valide o utente non confermato');
  }
  return { user, session };
}
