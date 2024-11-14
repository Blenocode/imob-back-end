const express = require('express');
const router = express.Router();
const adminReportsController = require('../controllers/adminReportsController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

// Endpoint para o total investido
router.get('/total-invested', authenticateToken, authorizeAdmin, adminReportsController.getTotalInvested);

// Endpoint para o total de retiradas
router.get('/total-withdrawn', authenticateToken, authorizeAdmin, adminReportsController.getTotalWithdrawn);

// Endpoint para o número de usuários
router.get('/user-count', authenticateToken, authorizeAdmin, adminReportsController.getUserCount);

// Endpoint para o relatório diário de transações
router.get('/daily', authenticateToken, authorizeAdmin, adminReportsController.getDailyTransactions);

module.exports = router;
