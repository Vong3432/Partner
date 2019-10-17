const express = require('express')
const mysql = require('mysql')
const router = express.Router()

let conn;

router.get('/createTable', (req, res) => {

    // Create table
    conn = mysql.createConnection({
        host: "localhost",
        user:"root",
        password:"",
        database:"partner"
    })

    conn.connect(() => {                    
        const sql = `CREATE TABLE IF NOT EXISTS user(
            user_id VARCHAR(36) PRIMARY KEY UNIQUE,
            account_id VARCHAR(36),        
            feedback_id VARCHAR(36),
            name VARCHAR(200),
            age INT(200),
            IC VARCHAR(255),
            address VARCHAR(255),
            contact_number VARCHAR(255),
            email VARCHAR(50)
        );`
        conn.query(sql, () => {                          
            res.send('Table is working fine...')    
        })
    })

})

router.get('/createDB', (req, res) => {    

    conn = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:""
    })

    // Database query
    const CREATE_DATABASE_QUERY = "CREATE DATABASE IF NOT EXISTS partner;"

    conn.connect(() => {                        
        conn.query(CREATE_DATABASE_QUERY, () => {                                                    
            res.send('Database is working fine...')    
        })    
    })                

})

module.exports = router