const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('Stage', artistSchema);