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

router.get('/displayjobs/:input', (req, res) => {
    const usersInput = req.params.input
    const sql = `SELECT * FROM job WHERE category = ${usersInput}`;
    //const sql = `SELECT * FROM job WHERE content = "test"`;
    conn.query(sql, (err, results) => {   
        results.map(result => console.log(result.title))                 
        err ? res.send(err) : res.send(results)        
    }) 
})

router.post('/', (req, res) => {
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

    // fixed data
    const newJob = [[13, "Senior Developer","2019-10-19", "Software","test", "description", "24:00:00", "requirement", 2000]]
    
    //const newJob = [[job_id, title, upload_date, category, content, description, duration, requirement, salary]]
    const sql = 'INSERT INTO job(job_id, title, upload_date, category, content, description, duration, requirement, salary) VALUES ?';
    conn.query(sql, [newJob], (err, results) => {                
        err ? res.send(err) : res.send('number of records inserted' + results.affectedRows)        
    })        
})

module.exports = router;