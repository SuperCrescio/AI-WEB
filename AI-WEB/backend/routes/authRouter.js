const express = require('express');
const supabaseApi = require('../utils/supabaseApi');
const authenticateToken = require('../utils/auth');

const router = express.Router();

// Registrazione utente (sign up)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password sono obbligatorie' });
  }
  try {
    const user = await supabaseApi.signUp(email, password);
    return res.json({ message: 'Utente registrato', user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Login utente
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password sono obbligatorie' });
  }
  try {
    const { user, session } = await supabaseApi.signIn(email, password);
    if (!session) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }
    return res.json({
      message: 'Login effettuato',
      user: { id: user.id, email: user.email },
      token: session.access_token,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

// Logout utente (richiede autenticazione per revocare token se necessario)
router.post('/logout', authenticateToken, async (req, res) => {
  // Non esiste un endpoint di logout sul server per JWT stateless; 
  // il client deve eliminare il token localmente.
  res.json({ message: 'Logout effettuato' });
});

module.exports = router;
