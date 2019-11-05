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
    const { title, description } = req.body;

    console.log(title, description)

    /*

    const currentUUID = uuid()
    // ### fixed data for testing purpose only
    const newJob = [[currentUUID, 2, "Fake developer", "2019-10-24","conent", "description", "24:00:00", "requirement", 2000,"pending"]]
    
    // insert all received data to array
    //const newJob = [[job_id, employer_id, pendinglist_id, title, upload_date, category, content, description, duration, requirement, salary, "pending"]];

    // prepare statement
    const sql = 'INSERT INTO job(job_id, employer_id, title, upload_date, content, description, duration, requirement, salary, status) VALUES ?';

    // run sql(sql, [values], (err, results))
    conn.query(sql, [newJob], (err, results) => {    
        // if err, send err 
        // else send results to front-end 
        if(err) res.send(err)
        else
        {
            //res.send('number of records inserted' + results.affectedRows)        
            const pendingSQL = 'INSERT INTO pendinglist(job_id) VALUES ?'
            conn.query(pendingSQL, [[[currentUUID]]], (err, results) => {
                err ? res.send(err) : res.send('number of records inserted' + results.affectedRows)                
            })
        }
    })        

    */

})

// @route   GET api/pending_list
// @desc    Display all pending jobs
// @access  Private
router.get('/pendinglist', (req, res) => {    

    // define sql query
    const sql = `SELECT j.job_id, j.employer_id, j.title, j.upload_date, j.content, j.description, j.duration, j.requirement, j.salary, j.status 
                FROM pendinglist p JOIN job j ON (p.job_id = j.job_id)
                WHERE j.status = 'pending';`;
    
    // run sql
    conn.query(sql, (err, results) => {   
        
        // for each result, display the title of it (debug purpose)
        results.map(result => console.log(result)) 
        
        // if err, send err 
        // else send results to front-end
        err ? res.send(err) : res.send(results)        
    }) 
})

// @route   GET api/job
// @desc    Display all jobs
// @access  Public
router.get('/displayjobs', (req, res) => {    

    // define sql query
    const sql = "SELECT * FROM job";
    
    // run sql
    conn.query(sql, (err, results) => {   
        
        // for each result, display the title of it (debug purpose)
        results.map(result => console.log(result)) 
        
        // if err, send err 
        // else send results to front-end
        err ? res.send(err) : res.send(results)        
    }) 
})

// @route   GET api/job
// @desc    Display some searched jobs
// @access  Public
router.get('/displayjobs/:input', (req, res) => {
    
    // get input from url parameter
    const usersInput = req.params.input

    // define sql query
    const sql = `SELECT * FROM job WHERE title LIKE '%${usersInput}%'`;
    
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
router.put('/updatejob/:jobid', (req, res) => {

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

module.exports = router;