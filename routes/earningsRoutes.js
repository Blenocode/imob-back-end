// routes/earningsRoutes.js

const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');
const authenticateToken = require('../middlewares/authenticateToken'); // Middleware para proteger as rotas

// Rota para registrar um ganho diário para um investimento específico de um usuário
router.post('/daily', authenticateToken, earningsController.addDailyEarnings);

// Rota para listar todos os ganhos de um usuário
router.get('/:userId', authenticateToken, earningsController.getUserEarnings);

module.exports = router;
