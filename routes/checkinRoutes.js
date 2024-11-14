// routes/checkinRoutes.js

const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkinController');
const authenticateToken = require('../middlewares/authenticateToken');

// Rota para o check-in diário
router.post('/', authenticateToken, checkinController.dailyCheckin);

module.exports = router;
