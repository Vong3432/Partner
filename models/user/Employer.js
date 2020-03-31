const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4')

const EmployerSchema = new Schema({
    employer_id: {
        type: String, 
        default: uuidv4()       
    },
    profile_id: {
        type: String,
        required: true
    },
    posted_job_ids: [{
        type: String
    }],    
})

module.exports = mongoose.model('Employer', EmployerSchema);