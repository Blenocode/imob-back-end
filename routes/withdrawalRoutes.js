// routes/withdrawalRoutes.js

const express = require('express');
const router = express.Router();
const withdrawalController = require('../controllers/withdrawalController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeAdmin = require('../middlewares/authorizeAdmin'); // Middleware para autorizar admin

// Rota para criar uma nova retirada (apenas para usuários autenticados)
router.post('/', authenticateToken, withdrawalController.createWithdrawal);

// Rota para listar todas as retiradas (apenas para admin)
router.get('/', authenticateToken, authorizeAdmin, withdrawalController.getAllWithdrawals);

// Rota para listar saques pendentes (apenas para admin)
router.get('/pending', authenticateToken, authorizeAdmin, withdrawalController.listPendingWithdrawals);

// Rota para aprovar uma retirada específica (apenas para admin)
router.put('/approve/:id', authenticateToken, authorizeAdmin, withdrawalController.approveWithdrawal);

// Rota para rejeitar uma retirada específica (apenas para admin)
router.put('/reject/:id', authenticateToken, authorizeAdmin, withdrawalController.rejectWithdrawal);

module.exports = router;
