const { Schema, model } = require('mongoose');

const producerSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    // alias: {
    //     type: String,
    //     required: false,
    //     trim: true
    // },
}, { timestamps: true });

module.exports = model('Producer', producerSchema);