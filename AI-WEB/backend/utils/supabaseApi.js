const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

/**
 * Registra un nuovo utente con email e password tramite Supabase Auth.
 * Ritorna l'oggetto user o lancia un errore.
 */
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return user;
}

/**
 * Effettua il login di un utente con email e password tramite Supabase Auth.
 * Ritorna un oggetto contenente user e session.
 */
async function signIn(email, password) {
  const { user, session, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return { user, session };
}

module.exports = {
  signUp,
  signIn,
};
