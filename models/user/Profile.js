const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4')

const ProfileSchema = new Schema({
    profile_id: {
        type: String,        
        default: uuidv4(),
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "normal"
    },
    about: {
        type: String,        
    },
    location: {
        type: String
    },
    address: {
        type: String
    },    
    profile_pic: {
        data: Buffer,
        contentType: String
    },
    background_pic: {
        data: Buffer,
        contentType: String
    },
    facebook_link: {
        type: String
    },
    whatsapp_link: {
        type: String
    },
    linkedin_link: {
        type: String
    },
})

module.exports = mongoose.model('Profile', ProfileSchema);