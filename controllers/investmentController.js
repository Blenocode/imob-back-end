// controllers/investmentController.js
const mongoose = require('mongoose');
const Investment = require('../models/investment');

// Criar um novo investimento
exports.createInvestment = async (req, res) => {
    try {
        const { name, minimumAmount, dailyReturn, status } = req.body;

        const investment = new Investment({
            name,
            minimumAmount,
            dailyReturn,
            status,
        });

        await investment.save();
        res.status(201).json({ message: 'Investimento criado com sucesso!', investment });
    } catch (error) {
        console.error("Erro ao criar o investimento:", error.message);
        res.status(500).json({ message: 'Erro ao criar o investimento', error: error.message });
    }
};

// Listar todos os investimentos
exports.getAllInvestments = async (req, res) => {
    try {
        const investments = await Investment.find();
        res.status(200).json(investments);
    } catch (error) {
        console.error("Erro ao listar os investimentos:", error.message);
        res.status(500).json({ message: 'Erro ao listar os investimentos', error: error.message });
    }
};

// Atualizar um investimento
exports.updateInvestment = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verifica se o ID é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const { name, minimumAmount, dailyReturn, status } = req.body;

        const investment = await Investment.findByIdAndUpdate(
            id,
            { name, minimumAmount, dailyReturn, status },
            { new: true }
        );

        if (!investment) {
            return res.status(404).json({ message: 'Investimento não encontrado' });
        }

        res.status(200).json({ message: 'Investimento atualizado com sucesso!', investment });
    } catch (error) {
        console.error("Erro ao atualizar o investimento:", error.message);
        res.status(500).json({ message: 'Erro ao atualizar o investimento', error: error.message });
    }
};

// Deletar um investimento
exports.deleteInvestment = async (req, res) => {
    try {
        const { id } = req.params;

        const investment = await Investment.findByIdAndDelete(id);

        if (!investment) {
            return res.status(404).json({ message: 'Investimento não encontrado' });
        }

        res.status(200).json({ message: 'Investimento deletado com sucesso!' });
    } catch (error) {
        console.error("Erro ao deletar o investimento:", error.message);
        res.status(500).json({ message: 'Erro ao deletar o investimento', error: error.message });
    }
};
