const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var album = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    },
    images: [{
        type: String
    }]
});

module.exports = mongoose.model('Album', album);