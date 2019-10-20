const express = require('express')
const mysql = require('mysql')
const router = express.Router()

// Create table
const conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"partner",
    multipleStatements: true
})

// @route   GET api/job
// @desc    Display the jobs
// @access  Public
router.get('/displayjobs/:input', (req, res) => {
    
    // get input from url parameter
    const usersInput = req.params.input

    // define sql query
    const sql = `SELECT * FROM job WHERE category = ${usersInput}`;
    
    // run sql
    conn.query(sql, (err, results) => {   
        
        // for each result, display the title of it (debug purpose)
        results.map(result => console.log(result.title)) 
        
        // if err, send err 
        // else send results to front-end
        err ? res.send(err) : res.send(results)        
    }) 
})

// @route   DELETE api/job
// @desc    Delete a job
// @access  Private
router.delete('/deletejob/:jobid', (req, res) => {

    // get id from url parameter
    const id = req.params.jobid

    // define sql query
    const sql = `DELETE FROM job WHERE job_id = ${id}`; 
    
    // run sql
    conn.query(sql, (err, results) => {           
        // if err, send err 
        // else send results to front-end                        
        err ? res.send(err) : res.send('Current job has been deleted successfully.')        
    }) 
})

// @route   UPDATE api/job
// @desc    update a job
// @access  Private
router.post('/updatejob/:jobid', (req, res) => {

    // get id from url parameter
    const id = req.params.jobid

    // destrucutre all submitted data from body
    const { upload_date, title, category, content, description, duration, requirement, salary } = req.body    

    // define sql query
    const sql = `UPDATE job 
                SET upload_date = ${upload_date}, title = ${title}, category = ${category}, description = ${description}, duration = ${duration}, requirement = ${requirement}, salary = ${salary}
                WHERE job_id = ${id}`;

    // run sql
    conn.query(sql, (err, results) => {                        
        // if err, send err 
        // else send results to front-end   
        err ? res.send(err) : res.send("Update job successfully")        
    }) 
    
})

// @route   POST api/job
// @desc    Post a new job
// @access  Public
router.post('/', (req, res) => {

    // destrucutre all submitted data from body
    const 
    { 
        job_id, 
        title,
        upload_date, 
        category,
        content, 
        description, 
        duration,
        requirement,
        salary 
    } = req.body;

    // ### fixed data for testing purpose only
    // const newJob = [[13, "Senior Developer","2019-10-19", "Software","test", "description", "24:00:00", "requirement", 2000]]
    
    // insert all received data to array
    const newJob = [[job_id, title, upload_date, category, content, description, duration, requirement, salary]]

    // prepare statement
    const sql = 'INSERT INTO job(job_id, title, upload_date, category, content, description, duration, requirement, salary) VALUES ?';

    // run sql(sql, [values], (err, results))
    conn.query(sql, [newJob], (err, results) => {    
        // if err, send err 
        // else send results to front-end 
        err ? res.send(err) : res.send('number of records inserted' + results.affectedRows)        
    })        

})

module.exports = router;