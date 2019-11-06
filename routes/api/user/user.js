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
router.post('/login', (req, res) => {

    // destrucutre all submitted data from body
    const { email, password } = req.body;
    const currentUUID = uuid()    

    if( email && password )
    {
        conn.query('SELECT * FROM account WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
				jwt.sign(
                    {id: results.user_id},
                    "myJwtSecret",
                    {expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err

                        res.json({
                            token,
                            user:{
                                id: results.user_id,
                                name: results.name,
                                email: results.email
                            }
                        });
                    }
                )
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
        })
    } 
    else {
		res.send('Please enter Username and Password!');
		res.end();
	}   
           

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
