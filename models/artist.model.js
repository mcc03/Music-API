const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    
    //many to many
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song',
        }
    ]
}, { timestamps: true });

module.exports = model('Artist', artistSchema);