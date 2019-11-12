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

// @route   POST api/job
// @desc    Post a new job
// @access  Private
router.post('/', (req, res) => {
    
    // destrucutre all submitted data from body    
    const jobID = uuid(),
          upload_date = new Date(),
          due_date = new Date();              

    const { employer_id, title, description, requirement, type, category, salary, duration } = req.body;
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
    INSERT INTO job(job_id, employer_id, title, upload_date, due_date, description, requirement, salary, status, type, category) VALUES(?)`    

    conn.query(sql, [[jobID, employer_id, title, upload_date, due_date, description, requirement, salary, "Open", str, category]], (err, results) => {
        
        (err) ? res.json(err) : res.json(results)
    })    

})

// @route   GET api/postjob
// @desc    Display all postjobs
// @access  Public
router.get('/displayjobs', (req, res) => {    

    // define sql query
    const sql = 'SELECT * FROM Job';
    
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
// @desc    Display some searched postjobs
// @access  Public
router.get('/displayjobs/:input', (req, res) => {
    
    // get input from url parameter
    const usersInput = req.params.input

    // define sql query
    const sql = `SELECT * FROM job WHERE title LIKE %${usersInput}%`;
    
    // run sql
    conn.query(sql, (err, results) => {   
        
        // for each result, display the title of it (debug purpose)
        results.map(result => console.log(result.title)) 
        
        // if err, send err 
        // else send results to front-end
        err ? res.send(err) : res.send(results)        
    }) 
})

// @route   DELETE api/postjob
// @desc    Delete a postjob
// @access  Private
router.delete('/deletejob/:postjobid', (req, res) => {

    // get id from url parameter
    const id = req.params.postjobid

    // define sql query
    const sql = `DELETE FROM Job WHERE JobID = ${id}`; 
    
    // run sql
    conn.query(sql, (err, results) => {           
        // if err, send err 
        // else send results to front-end                        
        err ? res.send(err) : res.status(200).json(id)
    }) 
})

// @route   UPDATE api/postjob
// @desc    update a postjob
// @access  Private
router.put('/updatejob/:postjobid', (req, res) => {

    // get id from url parameter
    const id = req.params.postjobid

    // destrucutre all submitted data from body
    const { JobID, Title, Salary, Description, Requirement, Category, Type, PostDay, UploadDate } = req.body    

    // define sql query
    /*const sql = `UPDATE job 
                SET upload_date = ${upload_date}, title = ${title}, category = ${category}, description = ${description}, duration = ${duration}, requirement = ${requirement}, salary = ${salary}
                WHERE job_id = ${id}`;*/
    const sql = `UPDATE Job SET Title=${Title}, Salary=${Salary}, Description=${Description}, Requirement=${Requirement}, Category=${Category}, Type=${Type}, PostDay=${PostDay}, UploadDate=new Date() WHERE JobID = ${id}`;

    // run sql
    conn.query(sql, (err, results) => {                        
        // if err, send err 
        // else send results to front-end   w
        err ? res.send(err) : res.status(200).json(results[0])        
    }) 
    
})

module.exports = router;