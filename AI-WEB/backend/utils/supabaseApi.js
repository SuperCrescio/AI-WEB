// backend/utils/supabaseApi.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

/**
 * Registra un nuovo utente (email, password) tramite Supabase Auth.
 */
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return user;
}

/**
 * Effettua il login di un utente (email, password) tramite Supabase Auth.
 * Restituisce { user, session } con l'access_token (JWT).
 */
async function signIn(email, password) {
  const { user, session, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return { user, session };
}

module.exports = { signUp, signIn };
