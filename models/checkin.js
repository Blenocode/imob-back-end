// models/checkin.js

const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lastCheckin: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Checkin', checkinSchema);
