// controllers/depositController.js

const Deposit = require('../models/Deposit');

// Criar um novo depósito
exports.createDeposit = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.userId; // Assume que o middleware de autenticação já adiciona o userId na requisição

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'O valor do depósito deve ser maior que zero' });
        }

        const deposit = new Deposit({
            userId,
            amount,
            status: 'pending'
        });

        await deposit.save();
        res.status(201).json({ message: 'Depósito criado com sucesso!', deposit });
    } catch (error) {
        console.error("Erro ao criar o depósito:", error.message);
        res.status(500).json({ message: 'Erro ao criar o depósito', error: error.message });
    }
};

// Listar todos os depósitos do usuário autenticado
exports.getUserDeposits = async (req, res) => {
    try {
        const userId = req.user.userId;
        const deposits = await Deposit.find({ userId });

        res.status(200).json(deposits);
    } catch (error) {
        console.error("Erro ao listar os depósitos:", error.message);
        res.status(500).json({ message: 'Erro ao listar os depósitos', error: error.message });
    }
};
