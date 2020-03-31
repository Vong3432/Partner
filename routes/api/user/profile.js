const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const uuid = require('uuid');
const mkdir = require('mkdir')
const multer = require('multer')

// Models
const Profile = require('../../../models/user/Profile')

// Environment setup
const dotenv = require('dotenv')
dotenv.config();

let CURRENT_PROFILE_OWNER_ID='';

router.post('/uploadPDF', function(req, res){
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // cb(null, 'client/public/uploads/posts')
            var dest = `client/public/uploads/profile/resume/`;
            // mkdir.sync(dest)
            cb(null, dest)
        },
        filename: function (req, file, cb) {
            // console.log(req)
            const ResumeID = uuid()
            
            const sql = `SELECT Name FROM Resume WHERE Name = ?`;

            conn.query(sql, [CURRENT_PROFILE_OWNER_ID + "-" + file.originalname], (err, results) => {
                if(results.length > 0)
                {
                    // const sql = `DELETE FROM Resume WHERE Name = ?`;
                    // conn.query(sql, [CURRENT_PROFILE_OWNER_ID + "-" + file.originalname], (err, results) => {
                    //     if(err) throw err;
                    // })
                }
                else
                {
                    const sql = `INSERT INTO Resume(ResumeID, Name, ProfileID) VALUES (?)`;
                    conn.query(sql, [[ResumeID, file.originalname, CURRENT_PROFILE_OWNER_ID]], (err, results) => {
                        if(err) throw err;
                    })
                }
            })            

            cb(null, CURRENT_PROFILE_OWNER_ID + "-" + file.originalname)
        }
    })
    
    var upload = multer({ storage: storage }).array('file')    
    
    console.log(req.files)

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
                
        return res.status(200).send(req.file)    

    })
})

router.post('/upload', function (req, res) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // cb(null, 'client/public/uploads/posts')
            var dest = `client/public/uploads/profile/`;
            // mkdir.sync(dest)
            cb(null, dest)
        },
        filename: function (req, file, cb) {
            // console.log(req)
            cb(null, CURRENT_PROFILE_OWNER_ID + "-" + file.originalname)
        }
    })
    
    var upload = multer({ storage: storage }).array('file')    
    
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        
        return res.status(200).send(req.file)    

    })

});

router.post('/uploadProfileImage', function (req, res) {
    console.log(CURRENT_PROFILE_OWNER_ID+"sss")
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // cb(null, 'client/public/uploads/posts')
            var dest = `client/public/uploads/profile/`;
            // mkdir.sync(dest)
            cb(null, dest)
        },
        filename: function (req, file, cb) {
            // console.log(req)
            cb(null, CURRENT_PROFILE_OWNER_ID + "-" + file.originalname)
        }
    })
    
    var upload = multer({ storage: storage }).single('profile')    
    
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)    

    })

});

// @route   GET api/profile
// @desc    Display specific profile
// @access  Private
router.get('/displayprofile/:id', (req, res) => {
    
    // Destruct id from parameter
    const { id } = req.params    

    Profile.findOne({profile_id: id}, (err, profile) => {
        
        if(err) return res.status(400).json({ msg: "Something went wrong. Please try again." })
        
        return res.status(200).json(profile)
    })
    
})

router.get('/getResumes/:profileid', (req, res) => {
    // get id from url parameter
    const id = req.params.profileid

})

router.delete('/deleteResume/:resumeID', (req, res) => {
    // get id from url parameter
    const id = req.params.resumeID

})

// @route   RESET api/profile
// @desc    Reset a profile
// @access  Private
router.delete('/resetprofile/:profileid', (req, res) => {

    // get id from url parameter
    const id = req.params.profileid

})

// @route   UPDATE api/profile
// @desc    update a user profile
// @access  Private
router.put('/updateprofile/:profileid', (req, res) => {

    // get id from url parameter
    const id = req.params.profileid
    CURRENT_PROFILE_OWNER_ID = id;    

})

// @route   POST api/profile
// @desc    Add Education
// @access  Private
router.post('/addEducation/:id', (req, res) => {
    
    const { Degree, School, StartYear, EndYear } = req.body    
    const EducationID = uuid();
    
})

// @route   GET api/profile
// @desc    Add Education
// @access  Private
router.get('/getEducation/:id', (req, res) => {
    const id = req.params.id;        
    
})

// @route   DELETE api/profile
// @desc    Delete Education
// @access  Private
router.delete('/deleteEducation/:id', (req, res) => {
    const id = req.params.id;        
    
})

// @route   POST api/profile
// @desc    Add Experience
// @access  Private
router.post('/addExperience/:id', (req, res) => {
    
    const { JobTitle, Company, StartYear, EndYear } = req.body    
    const WorkExperienceID = uuid();
    
})

// @route   GET api/profile
// @desc    Add Education
// @access  Private
router.get('/getExperience/:id', (req, res) => {
    const id = req.params.id;        
    
})

// @route   DELETE api/profile
// @desc    Delete Education
// @access  Private
router.delete('/deleteExperience/:id', (req, res) => {
    const id = req.params.id;        
    
})

module.exports = router;
