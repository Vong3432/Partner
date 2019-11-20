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

// @route   GET api/user
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

// @route   GET api/user
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

// @route   RESET api/user
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

// @route   UPDATE api/user
// @desc    update a user profile
// @access  Private
router.put('/updateprofile/:profileid', (req, res) => {

    // get id from url parameter
    const id = req.params.profileid
    CURRENT_PROFILE_OWNER_ID = id;
    
    // destrucutre all submitted data from body
    const { Address, BackgroundPic, ProfilePic, About, Email, Availability, Age, Location, FacebookLink, LinkedLink, WhatsappLink } = req.body;            
    
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

module.exports = router;
