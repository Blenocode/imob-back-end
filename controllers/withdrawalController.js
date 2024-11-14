// controllers/withdrawalController.js

const Withdrawal = require('../models/withdrawal');
const User = require('../models/user');

// Criar uma nova retirada
exports.createWithdrawal = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.userId; // Obtém o ID do usuário a partir do token JWT

        // Verifica se o valor é positivo e se é maior ou igual ao limite mínimo (30 reais)
        if (amount <= 0) {
            return res.status(400).json({ message: 'O valor da retirada deve ser maior que zero' });
        } else if (amount < 30) {
            return res.status(400).json({ message: 'O valor mínimo para retirada é de 30 reais' });
        }

        // Cria a retirada com status pendente
        const withdrawal = new Withdrawal({
            userId,
            amount,
            status: 'Pending'
        });

        await withdrawal.save();
        res.status(201).json({ message: 'Retirada criada com sucesso!', withdrawal });
    } catch (error) {
        console.error("Erro ao criar a retirada:", error.message);
        res.status(500).json({ message: 'Erro ao criar a retirada', error: error.message });
    }
};

// Listar todas as retiradas (admin)
exports.getAllWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find().populate('userId', 'phone');
        res.status(200).json(withdrawals);
    } catch (error) {
        console.error("Erro ao listar as retiradas:", error.message);
        res.status(500).json({ message: 'Erro ao listar as retiradas', error: error.message });
    }
};

// Listar saques pendentes (admin)
exports.listPendingWithdrawals = async (req, res) => {
    try {
        const pendingWithdrawals = await Withdrawal.find({ status: 'Pending' }).populate('userId', 'phone');
        res.status(200).json(pendingWithdrawals);
    } catch (error) {
        console.error("Erro ao listar saques pendentes:", error.message);
        res.status(500).json({ message: 'Erro ao listar saques pendentes', error: error.message });
    }
};

// Aprovar uma retirada (admin)
exports.approveWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;

        const withdrawal = await Withdrawal.findById(id);
        if (!withdrawal) {
            return res.status(404).json({ message: 'Retirada não encontrada' });
        }

        withdrawal.status = 'Approved';
        withdrawal.approvedAt = new Date();
        await withdrawal.save();

        res.status(200).json({ message: 'Retirada aprovada com sucesso!', withdrawal });
    } catch (error) {
        console.error("Erro ao aprovar a retirada:", error.message);
        res.status(500).json({ message: 'Erro ao aprovar a retirada', error: error.message });
    }
};

// Rejeitar uma retirada (admin)
exports.rejectWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;

        const withdrawal = await Withdrawal.findById(id);
        if (!withdrawal) {
            return res.status(404).json({ message: 'Retirada não encontrada' });
        }

        withdrawal.status = 'Rejected';
        withdrawal.rejectedAt = new Date();
        await withdrawal.save();

        res.status(200).json({ message: 'Retirada rejeitada com sucesso!', withdrawal });
    } catch (error) {
        console.error("Erro ao rejeitar a retirada:", error.message);
        res.status(500).json({ message: 'Erro ao rejeitar a retirada', error: error.message });
    }
};
