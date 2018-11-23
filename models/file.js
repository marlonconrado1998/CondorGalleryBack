const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FileSchema = new Schema({
    albums_id: {
        type: Schema.Types.ObjectId,
        ref: 'albums'
    }
}, {
    strict: false,
    collection: 'images.files'
});


module.exports = mongoose.model('File', FileSchema);