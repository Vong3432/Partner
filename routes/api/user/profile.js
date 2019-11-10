const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const uuid = require('uuid');
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')

// Create table
const conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"partner",
    multipleStatements: true
})

// @route   POST api/user
// @desc    auth an account
// @access  public
router.get('/getProfile/:id', (req, res) => {

    // destrucutre all submitted data from body    
    
    console.log(req.params.id)
        
        conn.query('SELECT * FROM account WHERE user_id = ?', [req.params.id], (error, results) => {
            
            if (results.length > 0) {  
                console.log(results)              
                return res.json(results[0])                
			} else {                
                return res.status(400).json({ msg: 'User not found.' })            	
			}						
        })   
           

})

router.get('/user', auth, (req, res) => {
    conn.query('SELECT * FROM account WHERE email = ? AND password = ?', [req.user.email, req.user.password], function(error, results, fields) {
        if (results.length > 0) {
            res.json(results)            
        }
        else {
            res.send('Incorrect Username and/or Password!')
        }
    })
    
})

module.exports = router;
