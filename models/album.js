const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var albumSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    }
});

module.exports = mongoose.model('Album', albumSchema);