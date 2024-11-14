const Deposit = require('../models/Deposit');
const Withdrawal = require('../models/withdrawal');
const User = require('../models/user');

// Total Investido
exports.getTotalInvested = async (req, res) => {
    try {
        const totalInvested = await Deposit.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        res.status(200).json({ totalInvested: totalInvested[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao calcular o total investido', error: error.message });
    }
};

// Total de Retiradas
exports.getTotalWithdrawn = async (req, res) => {
    try {
        const totalWithdrawn = await Withdrawal.aggregate([
            { $match: { status: 'Approved' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        res.status(200).json({ totalWithdrawn: totalWithdrawn[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao calcular o total de retiradas', error: error.message });
    }
};

// Número de Usuários
exports.getUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ userCount });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao contar usuários', error: error.message });
    }
};

// Transações Diárias
exports.getDailyTransactions = async (req, res) => {
    try {
        const { date } = req.query; // Recebe a data por query param, formato "YYYY-MM-DD"
        const selectedDate = new Date(date);

        // Verifique se a data fornecida é válida
        if (isNaN(selectedDate.getTime())) {
            return res.status(400).json({ message: "Data inválida fornecida. Use o formato 'YYYY-MM-DD'." });
        }

        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);

        const dailyDeposits = await Deposit.find({
            createdAt: { $gte: selectedDate, $lt: nextDate },
            status: 'completed'
        });

        const dailyWithdrawals = await Withdrawal.find({
            createdAt: { $gte: selectedDate, $lt: nextDate },
            status: 'Approved'
        });

        res.status(200).json({
            dailyDeposits: dailyDeposits.length,
            dailyWithdrawals: dailyWithdrawals.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter transações diárias', error: error.message });
    }
};
