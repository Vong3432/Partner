const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const uuid = require('uuid');

var cors = require('cors');

// Create table
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "partner",
    // allow multiple SQL statement to be included
    multipleStatements: true
})




var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    // cb(null, 'client/public/uploads/posts')
    cb(null, 'client/public/uploads/posts')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')





router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

// @route   POST api/posting
// @desc    Post a new post
// @access  Private
router.post('/', (req, res) => {

    // destrucutre all submitted data from body
    const PostingID = uuid(),
        UploadTime = new Date()

    const { Description, Picture, ProfileID } = req.body;    
    

    let str = "";
    console.log(req.body, PostingID, UploadTime)

    // ???
    // for(key in type) {
    //     if(type.hasOwnProperty(key)){
    //         var value = type[key];
    //         str = str + value + ","
    //         // do something with the value;
    //     }
    // }

    const sql = 'INSERT INTO posting (PostingID, ProfileID, Description, Picture, UploadTime) VALUES (?)';

    conn.query(sql, [[PostingID, ProfileID, Description, Picture, UploadTime]], (err, results) => {
        (err) ? res.status(400).json({ msg: 'Failed to post' }) : res.json(results)
    })    




    /*const { title, description } = req.body;
    console.log(title, description)*/

})

// @route   GET api/posting
// @desc    Display all postings
// @access  Private
// router.get('/PostList', (req, res) => {    

//     // define sql query
//     /*const sql = `SELECT j.job_id, j.employer_id, j.title, j.upload_date, j.content, j.description, j.duration, j.requirement, j.salary, j.status 
//                 FROM pendinglist p JOIN job j ON (p.job_id = j.job_id)
//                 WHERE j.status = 'pending';`;*/
//     const sql = 'SELECT * FROM posting'

//     // run sql
//     conn.query(sql, (err, results) => {   

//         // for each result, display the title of it (debug purpose)
//         results.map(result => console.log(result)) 

//         // if err, send err 
//         // else send results to front-end
//         err ? res.send(err) : res.send(results)        
//     }) 
// })

// @route   GET api/posting
// @desc    Display all posting
// @access  Public
router.get('/displayposting', (req, res) => {

    // define sql query
    const sql = 'SELECT * FROM Posting';

    // run sql
    conn.query(sql, (err, results) => {

        // for each result, display the title of it (debug purpose)
        // results.map(result => console.log(result))

        // if err, send err 
        // else send results to front-end
        err ? res.send(err) : res.json(results)
    })
})

// @route   GET api/posting
// @desc    Display some searched posting
// @access  Public
router.get('/displayposting/:id', (req, res) => {

    // get input from url parameter
    const ID = req.params.id

    // define sql query
    const sql = `SELECT * FROM Posting WHERE ProfileID = '${ID}' ORDER BY UploadTime DESC`;

    // run sql
    conn.query(sql, (err, results) => {

        // for each result, display the title of it (debug purpose)
        // results.map(result => console.log(result.description))

        // if err, send err 
        // else send results to front-end
        err ? res.send(err) : res.send(results)
    })
})

// @route   DELETE api/posting
// @desc    Delete a posting
// @access  Private
router.delete('/deleteposting/:postingid', (req, res) => {

    // get id from url parameter
    const id = req.params.postingid

    // define sql query
    const sql = `DELETE FROM Posting WHERE PostingID = ${id}`;

    // run sql
    conn.query(sql, (err, results) => {
        // if err, send err 
        // else send results to front-end                        
        err ? res.send(err) : res.send('Current post has been deleted successfully.')
    })
})

// @route   UPDATE api/posting
// @desc    update a posting
// @access  Private
router.put('/updatejob/:postingid', (req, res) => {

    // get id from url parameter
    const id = req.params.postingid

    // destrucutre all submitted data from body
    const { description, picture } = req.body

    // define sql query
    const sql = `UPDATE Posting
                SET Description = ${Description}, Picture = ${Picture}
                WHERE PostingID = ${id}`;

    // run sql
    conn.query(sql, (err, results) => {
        // if err, send err 
        // else send results to front-end   
        err ? res.send(err) : res.send("Update posting successfully")
    })

})

module.exports = router;