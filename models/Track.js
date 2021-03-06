const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    time: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;