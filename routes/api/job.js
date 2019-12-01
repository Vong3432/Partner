const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const uuid = require('uuid');


// Create table
const conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"partner",
    multipleStatements: true
})

let CURRENT_PROFILE_OWNER_ID='';

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    // cb(null, 'client/public/uploads/posts')
    cb(null, 'client/public/uploads/jobs')
  },
  filename: function (req, file, cb) {
    cb(null, CURRENT_PROFILE_OWNER_ID + "-" +file.originalname )
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

// @route   POST api/job
// @desc    Post a new job
// @access  Private
router.post('/', (req, res) => {
    
    // destrucutre all submitted data from body    
    const jobID = uuid(),
          upload_date = new Date(),
          due_date = new Date();              

    const { employer_id, title, description, requirement, location, type, category, salary, duration, name, image } = req.body;
    due_date.setDate(upload_date.getDate() + 5);
    
    let str=""
    for(key in type) {
        if(type.hasOwnProperty(key)) {
            var value = type[key];
            str = str+value+","
            //do something with value;
        }
    }    
    const sql = `
    INSERT INTO job(JobID, EmployerID, ActivityLogID, BillID, CandidateListID, Title, UploadDate, DueDate, Status, CompanyName, Location, Type, Salary, HireCount, Description, Picture, View, Requirement, Category) VALUES(?)`        
    
    conn.query(sql, [[jobID, employer_id, jobID, jobID, jobID, title, upload_date, due_date, 1, name, location, str, salary, 0, description, image, 0, requirement, category]], (err, results) => {        
        (err) ? res.status(500).json({msg:'Please make sure you have fill in all field.'}) : res.json([jobID, employer_id, jobID, jobID, jobID, title, upload_date, due_date, "open", name, location, str, salary, 0, description, image, 0, requirement, category])
    })    

})

// @route   GET api/postjob
// @desc    Display all postjobs
// @access  Public
router.get('/displayjobs', (req, res) => {    

    // define sql query
    const sql = 'SELECT j.*, p.ProfilePic FROM Job j LEFT JOIN Profile p ON j.EmployerID = p.ProfileID ORDER BY UploadDate DESC';
    
    // run sql
    conn.query(sql, (err, results) => {   
        
        // for each result, display the title of it (debug purpose)
        // results.map(result => console.log(result)) 
        
        // if err, send err 
        // else send results to front-end
        err ? res.send(err) : res.json(results)        
    }) 
})

// @route   GET api/postjob
// @desc    Display all job category
// @access  Public
router.get('/getCategory', (req, res) => {    

    // define sql query
    const sql = 'SELECT * FROM Category';    
    // run sql
    conn.query(sql, (err, results) => {                   
        err ? res.send(err) : res.json(results)        
    }) 
})

// @route   GET api/job
// @desc    Display some searched postjobs
// @access  Public
router.get('/displayjobs/:id', (req, res) => {
    
    // get input from url parameter
    const id = req.params.id
    CURRENT_PROFILE_OWNER_ID=id;

    // define sql query
    // const sql = `SELECT j.*, p.ProfilePic, COUNT(cr.CandidateListID) As TotalCandidate
    //             FROM Job j 
    //             JOIN Profile p ON j.EmployerID = p.ProfileID 
    //             JOIN candidaterequest cr ON j.JobID = cr.CandidateListID
    //             WHERE j.EmployerID = (?)`;
    const sql = `SELECT j.*, p.ProfilePic
                FROM Job j 
                LEFT JOIN Profile p ON j.EmployerID = p.ProfileID                 
                WHERE j.EmployerID = (?) ORDER BY UploadDate DESC`;

    // run sql
    conn.query(sql, [[id]] ,(err, results) => {   
        
        // for each result, display the title of it (debug purpose)
        // results.map(result => console.log(result.title)) 
        
        // if err, send err 
        // else send results to front-end
        // console.log(results)
        err ? res.send(err) : res.json(results)        
    }) 
})

// @route   GET api/job
// @desc    Display current postjobs
// @access  Public
router.get('/displayCurrentJob/:id', (req, res) => {
    
    // get input from url parameter
    const id = req.params.id
    
    const sql = `SELECT j.*, p.ProfilePic
                FROM Job j 
                LEFT JOIN Profile p ON j.EmployerID = p.ProfileID                 
                WHERE j.JobID = (?)`;

    // run sql
    conn.query(sql, [[id]] ,(err, results) => {   
        
        console.log(id)
        // for each result, display the title of it (debug purpose)
        results.map(result => console.log(result)) 
        
        // if err, send err 
        // else send results to front-end
        // console.log(results)
        err ? res.send(err) : res.json(results)        
    }) 
})

// @route   DELETE api/postjob
// @desc    Delete a postjob
// @access  Private
router.delete('/deletejob/:postjobid', (req, res) => {

    // get id from url parameter
    const id = req.params.postjobid
    console.log(id)
    // define sql query
    const sql = `DELETE FROM Job WHERE JobID = ?;
                 DELETE FROM candidatelist WHERE CandidateListID = ?;
                 DELETE FROM candidaterequest WHERE CandidateListID = ?`; 
    
    // run sql
    conn.query(sql, [id, id, id],(err, results) => {           
        // if err, send err 
        // else send results to front-end                        
        err ? res.status(400).json({msg:'Delete fail'}) : res.status(200).json(id)
    }) 
})

// @route   UPDATE api/postjob
// @desc    update a postjob
// @access  Private
router.put('/updatejob/:postjobid', (req, res) => {

    // get id from url parameter
    const id = req.params.postjobid

    // destrucutre all submitted data from body
    const { JobID, Title, Salary, Location, Description, Requirement, Status, duration} = req.body              
    
    function addDays(theDate, days) {
        return new Date(theDate.getTime() + days*24*60*60*1000);
    }

    // due_date.setDate(due_date.getDate() + duration);
    let upload_date, due_date;

    if(duration) 
    {
        upload_date = new Date(); 
        due_date = addDays(new Date(), duration)  

        console.log('has duration')
        
        const sql = `UPDATE Job SET UploadDate=?, DueDate=?, Title=?, Salary=?, Location=?, Description=?, Requirement=?, Status=? WHERE JobID = ?`;    
    
        // run sql    
        conn.query(sql, [upload_date, due_date, Title, Salary, Location, Description, Requirement, Status, JobID],(err, results) => {                        
            // if err, send err 
            // else send results to front-end   w
            // console.log(err)
            err ? res.status(400).json({msg:'Update fail'}) : res.status(200).json(JobID, Title, Salary, Location, Description, Requirement, Status)        
        }) 
    }    

    else
    {
        const sql = `UPDATE Job SET Title=?, Salary=?, Location=?, Description=?, Requirement=?, Status=? WHERE JobID = ?`;    
        console.log('no duration')
        // run sql    
        conn.query(sql, [Title, Salary, Location, Description, Requirement, Status, JobID],(err, results) => {                        
            // if err, send err 
            // else send results to front-end   w
            console.log(err)
            err ? res.status(400).json({msg:'Update fail'}) : res.status(200).json('success')        
        }) 
    }

    
})

// @route   POST api/job
// @desc    Post a new job apply
// @access  Private
router.post('/applyjob', (req, res) => {

    // destrucutre all submitted data from body
    const RequestID = uuid()
    const { JobID, ApplicantID, CandidateListID, Name, Email } = req.body
    console.log(req.body)

    
    const CHECKING_DUPLICATE = ``    
    conn.query(' SELECT * FROM candidatelist WHERE UserID = "' +ApplicantID+'" AND JobID = "' +JobID+'" ', (err, results) => {                        
        if(results.length < 1)
        {
            const INSERT_TO_REQUEST = `INSERT INTO candidaterequest(RequestID, ApplicantID, CandidateListID, ActivityLogID, Name, Email ) VALUES (?)`
            const INSERT_TO_LIST = `INSERT INTO candidatelist(CandidateListID, JobID, RequestID, CandidateStatus, UserID) VALUES (?);
                                    UPDATE job SET TotalCandidates = TotalCandidates + 1 WHERE JobID = (?);`            
        
            conn.query(INSERT_TO_REQUEST, [[RequestID, ApplicantID, CandidateListID, JobID, Name, Email]], (err, results) => {                        
                if(err) res.status(400).json({msg: 'Something went wrong. Please apply again.'})
                else
                {
                    conn.query(INSERT_TO_LIST, [[CandidateListID, JobID, RequestID,'pending', ApplicantID],[[JobID]]], (err, results) => {                        
                        if(err) res.status(400).json({msg: 'Something went wrong. Please apply again.'})
                        else
                        {
                            res.status(200).json(results)        
                        }
                    })
                }        
            })   
        }
            
        else
        {
            return res.status(400).json({msg: 'You have applied this job.'})            
        }
    })

    
})

// @route   GET api/job
// @desc    Display all apply jobs
// @access  Private
router.get('/displayapplyjobs', (req, res) => {    

    // define sql query
    const sql = `SELECT * FROM CandidateList`
    conn.query(sql, (err, results) => {                        
        err ? res.status(400).json('No results') : res.status(200).json(results)
    })
      
})

// @route   GET api/job
// @desc    Display apply job request
// @access  Private
router.get('/displayapplyjobsrequest/:id', (req, res) => {            

    // get id from url parameter
    const id = req.params.id

    // define sql query
    const sql = `SELECT j.*, cr.* , p.ProfilePic, p.ProfileID FROM job j 
                JOIN candidaterequest cr 
                ON j.CandidateListID = cr.CandidateListID 
                JOIN profile p
                ON cr.ApplicantID = p.ProfileID
                WHERE j.CandidateListID = ?`

    conn.query(sql, [[id]],(err, results) => {                        
        err ? res.status(400).json('No results') : res.status(200).json(results)
    })

})

// @route   GET api/job
// @desc    Display some apply jobs
// @access  Public
router.get('/displayapplyjobs/:input', (req, res) => {
    
    // get input from url parameter
    const usersInput = req.params.input

    // define sql query
    const sql = `SELECT * FROM CandidateList WHERE Username LIKE '%${usersInput}%`


})

// @route   DELETE api/job
// @desc    Delete a apply job
// @access  Private
router.delete('/deleteapplyjob/:jobid', (req, res) => {

    // get id from url parameter
    const id = req.params.jobid

    // define sql query
    const sql = `DELETE FROM CandidateList 
    WHERE CandidateListID = ${id}`
        
})

module.exports = router;