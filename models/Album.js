const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    datatime: String,
    image: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;