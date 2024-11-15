const { Schema, model } = require('mongoose');

const songSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

    //many to many - //https://www.bezkoder.com/mongodb-many-to-many-mongoose/
    artists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Artist',
        }
    ],
    
    //foreign keys
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: [true, 'genre is required']
        },
    feature: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: [false, 'artist is required']
        },
    producer: {
        type: Schema.Types.ObjectId,
        ref: 'Producer',
        required: [false, 'producer is required']
        },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher',
        required: [false, 'publisher is required']
        },
}, { timestamps: true });

module.exports = model('Song', songSchema);