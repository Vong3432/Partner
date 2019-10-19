const express = require('express')
const mysql = require('mysql')
const router = express.Router()

// @route   GET api/init
// @desc    Insert default value for education level
// @access  Private
router.get('/initEduLevel', (req, res) => {

    // Create table
    const conn = mysql.createConnection({
        host: "localhost",
        user:"root",
        password:"",
        database:"partner",
        multipleStatements: true
    })

    conn.connect(() => {
        const sql = `
        INSERT INTO education VALUES(1,"Diploma");
        INSERT INTO education VALUES(2,"Degree");
        INSERT INTO education VALUES(3,"Master"); 
        `

        conn.query(sql, (err, results) => {                          
            if(err) throw err;
            res.send('Education level is initialized...')    
        })
    })    
})

// @route   GET api/init
// @desc    Create table for database
// @access  Private
router.get('/createTable', (req, res) => {

    // Create table
    const conn = mysql.createConnection({
        host: "localhost",
        user:"root",
        password:"",
        database:"partner",
        multipleStatements: true
    })

    conn.connect(() => {                    
        const sql = `
        CREATE TABLE IF NOT EXISTS user(
            user_id VARCHAR(36) PRIMARY KEY UNIQUE,
            account_id VARCHAR(36),        
            feedback_id VARCHAR(36),
            employee_id VARCHAR(36),
            employer_id VARCHAR(36),
            name VARCHAR(200),
            age INT(200),
            IC VARCHAR(255),
            address VARCHAR(255),
            contact_number VARCHAR(255),
            email VARCHAR(50)
        );

        CREATE TABLE IF NOT EXISTS account(
            account_id VARCHAR(36) PRIMARY KEY UNIQUE,
            user_id VARCHAR(36),
            profile_id VARCHAR(36),
            name VARCHAR(70),
            email VARCHAR(70),
            category VARCHAR(20),
            password VARCHAR(50)
        );
        
        CREATE TABLE IF NOT EXISTS job(
            job_id VARCHAR(36) PRIMARY KEY UNIQUE,            
            title TEXT,
            joblist_id VARCHAR(36),
            upload_date DATE,
            category VARCHAR(60),
            content TEXT,
            description TEXT,
            duration TIME,
            requirement TEXT,
            salary VARCHAR(70)
        );

        CREATE TABLE IF NOT EXISTS employee(
            employee_id VARCHAR(36) PRIMARY KEY UNIQUE,
            user_id VARCHAR(36),
            resume_id VARCHAR(36),            
            education_level INT(36)                        
        );
        
        CREATE TABLE IF NOT EXISTS resume(
            resume_id VARCHAR(36) PRIMARY KEY UNIQUE,            
            employee_id VARCHAR(36),
            upload_date Date,
            contact VARCHAR(20)
        );

        CREATE TABLE IF NOT EXISTS employer(
            employee_id VARCHAR(36) PRIMARY KEY UNIQUE,
            user_id VARCHAR(36),
            personalbg_id VARCHAR(36),                        
            company_requirement TEXT
        );        

        CREATE TABLE IF NOT EXISTS personal_background(
            personalbg_id VARCHAR(36) PRIMARY KEY UNIQUE,            
            employee_id VARCHAR(36),
            company_id VARCHAR(36)
        );
            
        CREATE TABLE IF NOT EXISTS company(
            company_id VARCHAR(36) PRIMARY KEY UNIQUE,            
            personalbg_id VARCHAR(36),
            bill_id VARCHAR(36),
            publishedYear DATE,
            name VARCHAR(60),
            license VARCHAR(60),
            address VARCHAR(100)
        );

        CREATE TABLE IF NOT EXISTS bill(
            bill_id VARCHAR(36) PRIMARY KEY UNIQUE,                        
            company_id VARCHAR(36),            
            amount DECIMAL(7,2),
            paymethod VARCHAR(60)
        );

        CREATE TABLE IF NOT EXISTS education(
            education_id INT(36) PRIMARY KEY UNIQUE,
            education_level VARCHAR(60)
        );     
        
        CREATE TABLE IF NOT EXISTS feedbacks(
            feedback_id VARCHAR(36) PRIMARY KEY UNIQUE,
            user_id VARCHAR(36),
            admin_id VARCHAR(36),
            type INT(36),
            date DATE,
            content TEXT
        );     
        
        
        `
        conn.query(sql, (err, result) => {                          
            if(err) throw err;
            res.send('Table is working fine...')    
        })
    })

})

// @route   GET api/init
// @desc    Create database
// @access  Private
router.get('/createDB', (req, res) => {    

    const conn = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:""
    })

    // Database query
    const CREATE_DATABASE_QUERY = "CREATE DATABASE IF NOT EXISTS partner;"

    conn.connect(() => {                        
        conn.query(CREATE_DATABASE_QUERY, (err, results) => {                                                    
            if(err) throw err;
            res.send('Database is working fine...')    
        })
    })                

})

module.exports = router