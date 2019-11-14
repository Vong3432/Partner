const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const uuid = require('uuid');

// Create table
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "partner",
    // allow multiple SQL statement to be included
    multipleStatements: true
})

/////////////////// not need at all ///////////////////

// // @route   POST api/user
// // @desc    Post a new profile
// // @access  Private
// router.post('/', (req, res) => {

//     // destrucutre all submitted data from body
//     const ProfileID = uuid();

//     const { ProfileID, ProfilePic, BackgroupPic, Username, Description, Resume, Email, Availability, Age, Location, FacebookLink, LinkedLink, WhatsappLink } = req.body;

//     const option = [ProfileID, ProfilePic, BackgroupPic, Username, Description, Resume, Email, Availability, Age, Location, FacebookLink, LinkedLink, WhatsappLink]

//     checkConnection(sql, results, option)

// })

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
    
    conn.query(`SELECT p.*, a.* FROM Profile AS p JOIN Account AS a ON a.AccountID = p.AccountID WHERE p.AccountID = ?`, [req.params.id], (error, results) => {
        
        if (results.length > 0) {                         
            return res.json(results[0])
        } else {            
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

    // destrucutre all submitted data from body
    const { ProfileID, ProfilePic, BackgroupPic, Username, Description, Resume, Email, Availability, Age, Location, FacebookLink, LinkedLink, WhatsappLink } = req.body;

    // define sql query
    const sql = `UPDATE Profile 
                SET ProfileID=${ProfileID}, ProfilePic=${ProfilePic}, BackgroupPic=${BackgroupPic}, Username=${Username}, Description=${Description}, Resume=${Resume}, Email=${Email}, Availability=${Availability}, Age=${Age}, Location=${Location}, FacebookLink=${FacebookLink}, LinkedLink=${LinkedLink}, WhatsappLink=${WhatsappLink}
                WHERE ProfileID = ${id}`

    if (err) throw err
    conn.query(sql, (err, results) => {
        err ? res.send(err) : res.json(results[0])
    })

})

module.exports = router;
