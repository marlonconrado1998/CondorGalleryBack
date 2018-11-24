const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    }
}, {strict: false, collection: 'albums'});

module.exports = mongoose.model('AlbumSchema', AlbumSchema);