// routes/transactionHistoryRoutes.js

const express = require('express');
const router = express.Router();
const transactionHistoryController = require('../controllers/transactionHistoryController');
const authenticateToken = require('../middlewares/authenticateToken');

// Rota para obter o histórico de transações do usuário autenticado
router.get('/', authenticateToken, transactionHistoryController.getTransactionHistory);

module.exports = router;
