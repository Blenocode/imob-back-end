// controllers/checkinController.js

const Checkin = require('../models/checkin');
const User = require('../models/user');

// Função para realizar o check-in diário
exports.dailyCheckin = async (req, res) => {
    try {
        const userId = req.user.userId; // ID do usuário autenticado

        // Procurar o último check-in do usuário
        let checkin = await Checkin.findOne({ userId });

        // Data atual
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Define a hora para 00:00:00 para comparação

        if (checkin) {
            const lastCheckinDate = new Date(checkin.lastCheckin);
            lastCheckinDate.setHours(0, 0, 0, 0);

            // Verifica se o check-in já foi feito hoje
            if (lastCheckinDate.getTime() === today.getTime()) {
                return res.status(400).json({ message: 'Check-in já realizado hoje' });
            }

            // Atualiza a data do último check-in
            checkin.lastCheckin = new Date();
        } else {
            // Se o usuário nunca fez check-in, cria um novo registro
            checkin = new Checkin({ userId, lastCheckin: new Date() });
        }

        await checkin.save();

        // Valor do bônus
        const bonusAmount = 1; // Exemplo de bônus em moeda

        // Atualiza o saldo do usuário
        const user = await User.findById(userId);
        user.balance = (user.balance || 0) + bonusAmount;
        await user.save();

        res.status(200).json({
            message: 'Check-in diário realizado com sucesso',
            bonus: bonusAmount,
            balance: user.balance,
        });
    } catch (error) {
        console.error("Erro ao realizar o check-in:", error.message);
        res.status(500).json({ message: 'Erro ao realizar o check-in', error: error.message });
    }
};
