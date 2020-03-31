const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4')

const JobSchema = new Schema({
    job_id: {
        type: String,
        default: uuidv4()
    }, 
    employer_id: {
        type: String,
        required: true
    },
    candidatelist_id: [{
        type: String        
    }],
    chatroom_id: {
        type: String,        
        default: uuidv4()       
    },
    title: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: new Date()
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "opened"
    },
    company_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: [{
        type: String,
        required: true
    }],
    salary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirement: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    image_publicID: {
        type: String
    }
})

module.exports = mongoose.model('Job', JobSchema);