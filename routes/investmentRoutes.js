const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');
const authenticateToken = require('../middlewares/authenticateToken'); // Protege rotas para usuários autenticados

// Rota para criar um novo investimento (autorização necessária)
router.post('/', authenticateToken, investmentController.createInvestment);

// Rota para listar todos os investimentos
router.get('/', investmentController.getAllInvestments);

// Rota para atualizar um investimento específico
router.put('/:id', authenticateToken, investmentController.updateInvestment);

// Rota para deletar um investimento específico
router.delete('/:id', authenticateToken, investmentController.deleteInvestment);

// Rota de teste
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Rota de teste de investimentos funcionando!' });
});

module.exports = router;
