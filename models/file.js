const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FileSchema = new Schema({
    length: Number,
    chunkSize: Number,
    uploadDate: Date,
    filename: String,
    md5: String,
    contentType: String,
    albums_id: {
        type: Schema.Types.ObjectId,
        ref: 'albums'
    }
}, {
    strict: false,
    collection: 'images.files'
});


module.exports = mongoose.model('FileSchema', FileSchema);