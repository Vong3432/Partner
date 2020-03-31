const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4')

const EducationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    starting_year: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    location: {
        type: String,        
    }
});

const ExperienceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    starting_year: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,        
    }
});

const EmployeeSchema = new Schema({
    employee_id: {
        type: String,        
        default: uuidv4()
    },
    profile_id: {
        type: String,
        required: true
    },
    applied_job_ids: [{
        type: String
    }], 
    education_infos: [EducationSchema], 
    experience_infos: [ExperienceSchema],
    resume: [{
        data: Buffer, 
        contentType: String
    }],
    availability: {
        type: String        
    },
    age: {
        type: String
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema);