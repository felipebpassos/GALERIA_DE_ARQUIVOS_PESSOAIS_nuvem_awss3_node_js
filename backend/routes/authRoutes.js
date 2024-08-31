const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Endpoint para verificar a validade do token
router.get('/verify-token', auth, (req, res) => {
    res.status(200).json({ valid: true });
  });

// Rota de cadastro
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);

module.exports = router;
