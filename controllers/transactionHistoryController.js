// controllers/transactionHistoryController.js

const Deposit = require('../models/Deposit');
const Withdrawal = require('../models/withdrawal');

exports.getTransactionHistory = async (req, res) => {
    try {
        // Para fins de teste, remova a dependência de `userId` e busque todas as transações
        const deposits = await Deposit.find();
        const withdrawals = await Withdrawal.find();

        const transactions = [
            ...deposits.map(dep => ({ ...dep.toObject(), type: 'deposit' })),
            ...withdrawals.map(wd => ({ ...wd.toObject(), type: 'withdrawal' })),
        ];

        // Ordenar transações por data
        transactions.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Erro ao obter o histórico de transações:", error.message);
        res.status(500).json({ message: 'Erro ao obter o histórico de transações', error: error.message });
    }
};
