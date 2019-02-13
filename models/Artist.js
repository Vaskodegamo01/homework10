const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    information: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;