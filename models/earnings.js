// models/earnings.js

const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    investmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adiciona campos de criação e atualização automaticamente
});

module.exports = mongoose.model('Earnings', earningsSchema);
