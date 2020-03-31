const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const path = require('path')

const multipart = require('connect-multiparty')
const multipartMiddleware = multipart();

const uuid = require('uuid');

// Model
const Job = require('../../models/job/Job')
const Category = require('../../models/job/Category')

let CURRENT_PROFILE_OWNER_ID = '';
const multer = require('multer')
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary')

// router.use(multipartMiddleware);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

let storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "png"]
});
// let storage = multer.memoryStorage()

let upload = multer({storage})

router.post('/upload', upload.single("image"), async (req, res) => {

    
    const file = await req.file;
    console.log(file)

    if(!file)
        return res.status(400).json({msg:"File not uploaded"})
    
    const image = {};
    image.url = file.secure_url;
    image.id = file.public_id;

    const Image = require('../../models/job/JobImage')
    const newImage = new Image({
        imageUrl: file.secure_url,
        public_id: file.public_id
    })        

    newImage.save()
            .then(newImage => res.status(200).json(newImage))
            .catch(err => res.status(400).json({ msg: err }))    
    
})



// @route   POST api/job
// @desc    Post a new job
// @access  Private
router.post('/', (req, res) => {

    const upload_date = new Date(),
        due_date = new Date();

    const { employer_id, title, description, requirement, location, type, category, salary, duration, company_name, imageUrl, public_id } = req.body;
    due_date.setDate(upload_date.getDate() + 5);    

    const newJob = new Job({
        employer_id,
        title,
        description,
        requirement,
        company_name,
        location,
        category,
        type,
        salary,
        duration,
        upload_date,
        due_date,
        image_publicID: public_id,
        imageUrl
    })    

    newJob.save();
    return res.status(200).json({ employer_id, title, description, requirement, location, type, category, salary, duration, imageUrl, public_id })


})

// @route   GET api/postjob
// @desc    Display all postjobs
// @access  Public
router.get('/displayjobs', (req, res) => {

})

// @route   POST api/postjob
// @desc    Add a job category
// @access  Private
router.post('/addCategory', (req, res) => {

    const { name } = req.body

    const newCategory = new Category({ name })
    newCategory.save();

    res.status(200).json(newCategory)
})

// @route   GET api/postjob
// @desc    Display all job category
// @access  Public
router.get('/getCategory', (req, res) => {

    Category.find({}, (err, categories) => {
        if (err) return res.status(400).json({ msg: "Ops, something went wrong" })
        return res.status(200).json(categories)
    })
})

// @route   GET api/job
// @desc    Display some searched postjobs
// @access  Public
router.get('/displayjobs/:id', (req, res) => {

    // get input from url parameter
    const id = req.params.id
    CURRENT_PROFILE_OWNER_ID = id;

})

// @route   GET api/job
// @desc    Display current postjobs
// @access  Public
router.get('/displayCurrentJob/:id', (req, res) => {

    // get input from url parameter
    const id = req.params.id

})

// @route   DELETE api/postjob
// @desc    Delete a postjob
// @access  Private
router.delete('/deletejob/:postjobid', (req, res) => {

    // get id from url parameter
    const id = req.params.postjobid

})

// @route   UPDATE api/postjob
// @desc    update a postjob
// @access  Private
router.put('/updatejob/:postjobid', (req, res) => {

    // get id from url parameter
    const id = req.params.postjobid

    // destrucutre all submitted data from body
    const { JobID, Title, Salary, Location, Description, Requirement, Status, duration } = req.body

    function addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    // due_date.setDate(due_date.getDate() + duration);
    let upload_date, due_date;

    if (duration) {
        upload_date = new Date();
        due_date = addDays(new Date(), duration)


    }

    else {

    }


})

// @route   POST api/job
// @desc    Post a new job apply
// @access  Private
router.post('/applyjob', (req, res) => {

    // destrucutre all submitted data from body
    const RequestID = uuid()
    const { JobID, ApplicantID, CandidateListID, Name, Email } = req.body



})

// @route   GET api/job
// @desc    Display all apply jobs
// @access  Private
router.get('/displayapplyjobs', (req, res) => {


})

router.put('/approveCandidate/:id/:UserID', (req, res) => {


})

router.put('/disapproveCandidate/:id/:UserID', (req, res) => {

})

// @route   GET api/job
// @desc    Display apply job request
// @access  Private
router.get('/displayapplyjobsrequest/:id', (req, res) => {

    // get id from url parameter
    const id = req.params.id



})

// @route   GET api/job
// @desc    Display some apply jobs
// @access  Public
router.get('/displayapplyjobs/:input', (req, res) => {

    // get input from url parameter
    const usersInput = req.params.input

})

// @route   DELETE api/job
// @desc    Delete a apply job
// @access  Private
router.delete('/deleteapplyjob/:jobid', (req, res) => {

    // get id from url parameter
    const id = req.params.jobid

})

module.exports = router;