const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const uuid = require('uuid');
const mkdir = require('mkdir')
const multer = require('multer')

// Create table
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "partner",
    // allow multiple SQL statement to be included
    multipleStatements: true
})

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
// @desc    Display user profile
// @access  Private
router.get('/displayprofile', (req, res) => {

    // define sql query
    const sql = `SELECT * FROM Profile`

    conn.connect((err) => {
        if (err) throw err
        conn.query(sql, (err, results) => {
            err ? res.send(err) : res.json(results)
        })
    })
})

// @route   GET api/profile
// @desc    Display some searched unique profile
// @access  Private
router.get('/displayprofile/:id', (req, res) => {


    conn.query(`SELECT p.*, a.*, g.GalleryName FROM Profile AS p 
    LEFT JOIN Account AS a ON a.AccountID = p.AccountID 
    LEFT JOIN Gallery As g ON g.ProfileID = p.ProfileID
    WHERE p.AccountID = (?)`, [req.params.id], (error, results) => {

        if (results.length > 0) {
            // console.log(results[0])    
            CURRENT_PROFILE_OWNER_ID = req.params.id                  
            return res.json(results[0])
        } else {
            console.log('no result')
            return res.status(400).json({ msg: 'User not found.' })
        }
    })

})

router.get('/getResumes/:profileid', (req, res) => {
    // get id from url parameter
    const id = req.params.profileid

    // define sql query
    const sql = `SELECT Name, ResumeID FROM Resume WHERE ProfileID = ?`

    conn.query(sql, [id], (err, results) => {
        err ? res.send(err) : res.json(results)
    })
})

router.delete('/deleteResume/:resumeID', (req, res) => {
    // get id from url parameter
    const id = req.params.resumeID

    // define sql query
    const sql = `DELETE FROM Resume WHERE ResumeID = ?`

    conn.query(sql, [id], (err, results) => {
        err ? res.send(err) : res.json(id)
    })
})

// @route   RESET api/profile
// @desc    Reset a profile
// @access  Private
router.delete('/resetprofile/:profileid', (req, res) => {

    // get id from url parameter
    const id = req.params.profileid

    // define sql query
    const sql = `UPDATE Profile 
    SET ProfilePic="", BackgroupPic="", Username="", Description="", Resume="", Email="", Availability="", Age="", Location="", FacebookLink="", LinkedLink="", WhatsappLink=""
    WHERE ProfileID = ${id}`

    conn.query(sql, (err, results) => {
        err ? res.send(err) : res.json(id)
    })

})

// @route   UPDATE api/profile
// @desc    update a user profile
// @access  Private
router.put('/updateprofile/:profileid', (req, res) => {

    // get id from url parameter
    const id = req.params.profileid
    CURRENT_PROFILE_OWNER_ID = id;
    
    // destrucutre all submitted data from body
    const { Address, BackgroundPic, PDFs, ProfilePic, About, Email, Availability, Age, Location, FacebookLink, LinkedLink, WhatsappLink } = req.body;            
    
    console.log(PDFs)

    // define sql query
    const sql = `UPDATE Profile SET ProfilePic = ?, Address = ?, About = ?, Email = ?, Availability = ?, Age = ?, Location = ?, FacebookLink =?, LinkedLink = ?, WhatsappLink = ? WHERE ProfileID = ?;
                UPDATE Account SET Email = ? WHERE ProfileID = ?; `                    

    conn.query(sql, [ProfilePic, Address, About, Email, Availability, Age, Location, FacebookLink, LinkedLink, WhatsappLink, id, Email, id], (err, results) => {
        console.log(err)
        if (err)
            res.status(400).json({ msg: err })
        else {
            if(BackgroundPic)
            {
                BackgroundPic.map(i=>{
                    // console.log(i)
                    let GalleryID = uuid()
                    conn.query(`INSERT INTO Gallery(GalleryID, ProfileID, GalleryName) VALUES(?)`, [[GalleryID, id, i]], (err,results)=>{
                        if(err) throw err;                                
                    })            
                })            
            }   
            console.log(ProfilePic +"final")         
            res.status(200).json({ Address, About, Email, Availability, Age, Location, Availability, FacebookLink, LinkedLink, WhatsappLink })
        }
    })

})

// @route   POST api/profile
// @desc    Add Education
// @access  Private
router.post('/addEducation/:id', (req, res) => {
    
    const { Degree, School, StartYear, EndYear } = req.body    
    const EducationID = uuid();
    const sql = `INSERT INTO Education(EducationID, ResumeID, Degree, School, StartYear, EndYear) VALUES (?)`;
    
    conn.query(sql, [[EducationID, req.params.id, Degree, School, StartYear, EndYear]], (err, results) => {
        if(err)
            res.status(400).json('add fail')
        else
        {
            res.status(200).json(Degree, School, StartYear, EndYear);
        }
    })
})

// @route   GET api/profile
// @desc    Add Education
// @access  Private
router.get('/getEducation/:id', (req, res) => {
    const id = req.params.id;        
    const sql = `SELECT EducationID, Degree, School, StartYear, EndYear FROM Education WHERE ResumeID = ?`;

    conn.query(sql, [id], (err, results) => {
        (err) ? res.status(400).json('Error') : res.status(200).json(results);
    })
})

// @route   DELETE api/profile
// @desc    Delete Education
// @access  Private
router.delete('/deleteEducation/:id', (req, res) => {
    const id = req.params.id;        
    const sql = `DELETE FROM Education WHERE EducationID = ?`;    
    conn.query(sql, [id], (err, results) => {        
        (err) ? res.status(400).json({msg:'Delete failed'}) : res.status(200).json(id);
    })
})

// @route   POST api/profile
// @desc    Add Experience
// @access  Private
router.post('/addExperience/:id', (req, res) => {
    
    const { JobTitle, Company, StartYear, EndYear } = req.body    
    const WorkExperienceID = uuid();
    console.log(req.body)
    const sql = `INSERT INTO workexperience(WorkExperienceID, ResumeID, JobTitle, Company, StartYear, EndYear) VALUES (?)`;
    
    conn.query(sql, [[WorkExperienceID, req.params.id, JobTitle, Company, StartYear, EndYear]], (err, results) => {
        console.log(err)
        if(err)
            res.status(400).json('add fail')
        else res.status(200).json(JobTitle, Company, StartYear, EndYear)
    })
})

// @route   GET api/profile
// @desc    Add Education
// @access  Private
router.get('/getExperience/:id', (req, res) => {
    const id = req.params.id;        
    const sql = `SELECT WorkExperienceID, JobTitle, Company, StartYear, EndYear FROM workexperience WHERE ResumeID = ?`;

    conn.query(sql, [id], (err, results) => {
        (err) ? res.status(400).json('Error') : res.status(200).json(results);
    })
})

// @route   DELETE api/profile
// @desc    Delete Education
// @access  Private
router.delete('/deleteExperience/:id', (req, res) => {
    const id = req.params.id;        
    const sql = `DELETE FROM workexperience WHERE WorkExperienceID = ?`;    
    conn.query(sql, [id], (err, results) => {        
        (err) ? res.status(400).json({msg:'Delete failed'}) : res.status(200).json(id);
    })
})

module.exports = router;
