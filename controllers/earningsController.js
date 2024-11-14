// controllers/earningsController.js

const Earnings = require('../models/earnings');
const Investment = require('../models/investment');
const User = require('../models/user');

// Função para registrar ganhos diários com base no investimento do usuário
exports.addDailyEarnings = async (req, res) => {
    try {
        const { userId, investmentId } = req.body;

        // Verificar se o investimento existe
        const investment = await Investment.findById(investmentId);
        if (!investment) {
            return res.status(404).json({ message: 'Investimento não encontrado' });
        }

        // Calcular o ganho diário com base no rendimento diário do investimento
        const dailyEarning = investment.minimumAmount * (investment.dailyReturn / 100);

        // Criar e salvar o registro de ganho
        const earnings = new Earnings({
            userId,
            investmentId,
            amount: dailyEarning,
        });

        await earnings.save();
        res.status(201).json({ message: 'Ganho diário registrado com sucesso!', earnings });
    } catch (error) {
        console.error("Erro ao registrar o ganho diário:", error.message);
        res.status(500).json({ message: 'Erro ao registrar o ganho diário', error: error.message });
    }
};

// Função para listar todos os ganhos de um usuário
exports.getUserEarnings = async (req, res) => {
    try {
        const { userId } = req.params;

        // Encontrar ganhos para o usuário específico
        const earnings = await Earnings.find({ userId }).populate('investmentId', 'name');

        res.status(200).json(earnings);
    } catch (error) {
        console.error("Erro ao listar os ganhos do usuário:", error.message);
        res.status(500).json({ message: 'Erro ao listar os ganhos do usuário', error: error.message });
    }
};
