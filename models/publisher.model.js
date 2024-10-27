const { Schema, model } = require('mongoose');

const publisherSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('Publisher', publisherSchema);