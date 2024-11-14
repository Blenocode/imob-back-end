// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetCode: { //Código de verificação para redefinir a senha
        type: String
    },
    resetCodeExpiration: {
        type: Date
    }
}, {
    timestamps: true // Adiciona campos de criação e atualização automaticamente
});

module.exports = mongoose.model('User', userSchema);
