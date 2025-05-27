// backend/utils/auth.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

/**
 * Middleware per autenticazione JWT con Supabase.
 * Controlla l'header Authorization e aggiunge req.user.
 */
async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Nessun token fornito' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token malformato' });
  }
  try {
    // Verifica token con Supabase
    const { data: { user }, error } = await supabase.auth.api.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Token non valido' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Errore autenticazione token:', err);
    return res.status(401).json({ error: 'Errore di autenticazione' });
  }
}

module.exports = authenticateToken;
