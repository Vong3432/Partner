const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const uuid = require('uuid');
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')

// Create table
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "partner",
    multipleStatements: true
})

// @route   POST api/user
// @desc    auth an account
// @access  public
router.post('/login', (req, res) => {

    // destrucutre all submitted data from body
    const { email, password } = req.body;

    if (email && password) {
        conn.query('SELECT * FROM account WHERE email = ? AND password = ?', [email, password], (error, results) => {

            if (results.length > 0) {
                //console.log(results)
                jwt.sign(
                    { id: results[0].UserID },
                    "myJwtSecret",
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err
                        return res.status(200).json({
                            token,
                            user: {
                                id: results[0].UserID,
                                name: results[0].Name,
                                email: results[0].Email,
                                category: results[0].AccountType
                            }
                        });
                    }
                )
            }

            else {
                conn.query('SELECT * FROM admin WHERE AdminID = ? AND Password = ?', [email, password], (err, results) => {
                    // console.log(email,password+"sadasd")
                    if (results.length > 0) {
                        //console.log(results)
                        jwt.sign(
                            { id: results[0].AdminID },
                            "myJwtSecret",
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err
                                return res.status(200).json({
                                    token,
                                    user: {
                                        id: results[0].AdminID,
                                        name: results[0].Name,                                        
                                        category: "ADMIN"
                                    }
                                });
                            }
                        )
                    }
                    else
                        return res.status(400).json({ msg: 'User not found.' })
                })                
            }
        })
    }
    else {
        return res.status(400).json({ msg: 'Please enter email and password' })
    }
})

// @route   POST api/user
// @desc    auth an account
// @access  public
router.post('/register', (req, res) => {

    // destrucutre all submitted data from body
    const { name, email, password, userType } = req.body;

    // console.log(req.body)

    const AccountUUID = uuid()

    if (email && password && name && userType) {
        conn.query(`SELECT * FROM account WHERE Email = ? AND Password = ?`, [email, password], (error, results) => {

            if (results.length > 0) {
                return res.status(400).json({ msg: 'User is already registered.' })
            } else {

                if (userType === 'employer') {
                    const date = new Date();
                    conn.query(`INSERT INTO company(CompanyID, UserID, PublishedYear, Name) VALUES (?)`, [[AccountUUID, AccountUUID, date, name]], (err, results) => {
                        if (err) throw err;
                    })
                }

                conn.query(`INSERT INTO account(AccountID, UserID, ProfileID, Name, Email, Password, AccountType, Status) VALUES (?)`, [[AccountUUID, AccountUUID, AccountUUID, name, email, password, userType, 1]], (err, results) => {
                    if (err) {
                        // console.log('has err')
                        return res.send(err)
                    }

                    conn.query(`INSERT INTO Profile(ProfileID, AccountID) VALUES (?);`, [[AccountUUID, AccountUUID]], (errors, profile) => {
                        if (err) return res.send(err)

                        else {
                            conn.query(`SELECT * FROM account WHERE email = ? AND password = ?`, [email, password], (error, results) => {
                                if (results.length > 0) {
                                    // console.log(results[0])
                                    jwt.sign(
                                        { id: results[0].UserID },
                                        "myJwtSecret",
                                        { expiresIn: 3600 },
                                        (err, token) => {
                                            if (err) throw err
                                            return res.status(200).json({
                                                token,
                                                user: {
                                                    id: results[0].UserID,
                                                    name: results[0].Name,
                                                    email: results[0].Email,
                                                    category: results[0].AccountType
                                                }
                                            });
                                        }
                                    )

                                } else {
                                    return res.status(400).json({ msg: 'User not found.' })
                                }
                            })
                        }
                    })

                })
            }
        })
    }
    else {
        return res.status(400).json({ msg: 'Please enter email and password' })
    }


})

router.get('/user', auth, (req, res) => {
    conn.query('SELECT * FROM account WHERE email = ? AND password = ?', [req.user.email, req.user.password], function (error, results, fields) {
        if (results.length > 0) {
            res.json(results)
        }
        else {
            res.send('Incorrect Username and/or Password!')
        }
    })

})

router.get('/alluser', (req, res) => {
    conn.query(`SELECT * FROM account`, (err, results) => {
        err ? res.status(400).json({msg:'error'}) : res.status(200).json(results)
    })
})

// @route   UPDATE api/user
// @desc    Suspend User
// @access  Private
router.put('/suspend/:id', (req, res) => {

    // get id from url parameter
    const id = req.params.id
    
    // define sql query
    // const sql = `DELETE FROM Account WHERE AccountID = ?;
    //              DELETE FROM Profile WHERE ProfileID = ?;
    //              DELETE FROM candidaterequest WHERE CandidateListID = ?;
    //              DELETE FROM candidatelist WHERE CandidateListID = ?`; 

    const sql = `UPDATE Account SET Status = -1 WHERE AccountID = ?`;
    
    // run sql
    conn.query(sql, [id],(err, results) => {           
        // if err, send err 
        // else send results to front-end                        
        err ? res.status(400).json({msg:'Suspend fail'}) : res.status(200).json(id)
    }) 
})

// @route   UPDATE api/user
// @desc    Reactive User
// @access  Private
router.put('/reactive/:id', (req, res) => {

    // get id from url parameter
    const id = req.params.id
    
    // define sql query
    // const sql = `DELETE FROM Account WHERE AccountID = ?;
    //              DELETE FROM Profile WHERE ProfileID = ?;
    //              DELETE FROM candidaterequest WHERE CandidateListID = ?;
    //              DELETE FROM candidatelist WHERE CandidateListID = ?`; 

    const sql = `UPDATE Account SET Status = 1 WHERE AccountID = ?`;
    
    // run sql
    conn.query(sql, [id],(err, results) => {           
        // if err, send err 
        // else send results to front-end                        
        err ? res.status(400).json({msg:'Suspend fail'}) : res.status(200).json(id)
    }) 
})


module.exports = router;
