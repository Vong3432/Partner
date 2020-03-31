const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4')

const ImageSchema = new Schema({
    imageUrl: String,
    public_id: String
})

module.exports = mongoose.model('Image', ImageSchema);