const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4')

const CategorySchema = new Schema({
    name: String
})

module.exports = mongoose.model('Category', CategorySchema);