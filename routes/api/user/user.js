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
        conn.query('SELECT * FROM account WHERE email = ? AND password = ?', [email, password], (error, results) => {
            
            if (results.length > 0) {                
                console.log(results)
				jwt.sign(
                    {id: results[0].user_id},
                    "myJwtSecret",
                    {expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err                                       
                        return res.status(200).json({                            
                            token,
                            user:{                                
                                id: results[0].user_id,
                                name: results[0].name,
                                email: results[0].email,
                                category: results[0].category
                            }
                        });
                    }
                )
                
			} else {                
                return res.status(400).json({ msg: 'User not found.' })            	
			}						
        })
    } 
    else {
		return res.status(400).json({ msg: 'Please enter email and password' })            	
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
