const mongoose = require('mongoose');
const task = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created_at: {
        type: {type: Date, default: Date.now}
    }
});

module.exports = mongoose.model('Task', task);