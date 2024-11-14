// models/investment.js

const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    minimumAmount: {
        type: Number,
        required: true,
    },
    dailyReturn: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'coming_soon'],
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Investment', investmentSchema);
