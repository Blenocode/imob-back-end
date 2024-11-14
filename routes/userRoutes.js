const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authenticateToken = require('../middlewares/authenticateToken');

// Rota de Registro
router.post('/register', userController.registerUser);

// Rota de Login
router.post('/login', userController.loginUser);

// Rota protegida de teste
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Acesso concedido à rota protegida!' });
});

// Rota para solicitar redefinição de senha
router.post('/request-password-reset', userController.requestPasswordReset);

// Rota para redefinir a senha
router.post('/reset-password', userController.resetPassword);

module.exports = router;
