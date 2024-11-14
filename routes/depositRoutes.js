// routes/depositRoutes.js

const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');
const authenticateToken = require('../middlewares/authenticateToken'); // Protege as rotas para usuários autenticados

// Rota para criar um novo depósito
router.post('/', authenticateToken, depositController.createDeposit);

// Rota para listar todos os depósitos do usuário autenticado
router.get('/', authenticateToken, depositController.getUserDeposits);

module.exports = router;
