const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dotenv = require('dotenv')
dotenv.config();

// Models
const Profile = require('../../../models/user/Profile');
const Employee = require('../../../models/user/Employee');
const Employer = require('../../../models/user/Employer');

// @route   POST api/user
// @desc    auth an account
// @access  public
router.post('/login', async (req, res) => {

    // destrucutre all submitted data from body
    const { email, password } = req.body;

    const hasMatchedAccount = await Profile.exists({ email });

    if(hasMatchedAccount === false)
        return res.status(400).json({ msg: "No account found." })    
    
    const User = await Profile.findOne({ email });

    // Compare password with has password
    bcrypt.compare(password, User.password, (err, result) => {
                
        // Password is incorrect
        if(result == false) return res.status(400).json({ msg: "Password is incorrect."})                
        
        // Sign jwt
        const token = jwt.sign({ _currentID: User.profile_id }, process.env.TOKEN_SECRET);

        return res.status(200).json({User, token});
    })    
})

// @route   POST api/user
// @desc    auth an account
// @access  public
router.post('/register', async (req, res) => {
    
    // destrucutre all submitted data from body
    const { name, email, password, userType } = req.body;

    // Check if email is already registered
    const duplicatedEmail = await Profile.exists({ email });

    if (duplicatedEmail === true)
        return res.status(400).json({ msg: "Email has been registered" })

    // Salt password
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            const newUser = new Profile({ name, email, password: hash, account_type: userType });

            newUser.save((err, user) => {
                if (err) return res.status(400).json({ msg: "Something went wrong, please try again." })

                if (userType === "employee") {
                    const newEmployee = new Employee({
                        employee_id: user.profile_id,
                        profile_id: user.profile_id,
                    })

                    newEmployee.save()
                }

                else if (userType === "employer") {
                    const newEmployer = new Employer({
                        employer_id: user.profile_id,
                        profile_id: user.profile_id,
                    })

                    newEmployer.save()
                }
                

                return res.status(200).json({
                    user,                    
                })

            })
        })
    })

})

router.get('/jobrequests/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT j.Status, j.ChatRoomID,j.Title, j.JobID, j.CompanyName, cl.CandidateStatus, cl.JobID, cl.RequestID FROM Job j
                 LEFT JOIN candidatelist cl ON j.JobID = cl.JobID
                 WHERE cl.UserID = (?)`;
    conn.query(sql, [[id]], (err, results) => {
        (err) ? res.status(400).json('error') : res.status(200).json(results)
    })
})

router.delete('/canceljobrequest/:id/:jobID', (req, res) => {
    const id = req.params.id;
    const jobID = req.params.jobID;

    const sql = `DELETE FROM candidatelist WHERE RequestID = ?;
                 DELETE FROM candidaterequest WHERE RequestID = ?;
                 UPDATE job SET TotalCandidates = TotalCandidates - 1 WHERE JobID = ?`;
    conn.query(sql, [id, id, jobID], (err, results) => {
        (err) ? res.status(400).json('error') : res.status(200).json(id)
    })
})

router.get('/alluser', (req, res) => {
    conn.query(`SELECT * FROM account`, (err, results) => {
        err ? res.status(400).json({ msg: 'error' }) : res.status(200).json(results)
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
    conn.query(sql, [id], (err, results) => {
        // if err, send err 
        // else send results to front-end                        
        err ? res.status(400).json({ msg: 'Suspend fail' }) : res.status(200).json(id)
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
    conn.query(sql, [id], (err, results) => {
        // if err, send err 
        // else send results to front-end                        
        err ? res.status(400).json({ msg: 'Suspend fail' }) : res.status(200).json(id)
    })
})

router.put('/suspendJob/:id', (req, res) => {

    // get id from url parameter
    const id = req.params.id

    // define sql query
    // const sql = `DELETE FROM Account WHERE AccountID = ?;
    //              DELETE FROM Profile WHERE ProfileID = ?;
    //              DELETE FROM candidaterequest WHERE CandidateListID = ?;
    //              DELETE FROM candidatelist WHERE CandidateListID = ?`; 

    const sql = `UPDATE Job SET Status = -2 WHERE JobID = ?`;

    // run sql
    conn.query(sql, [id], (err, results) => {
        // if err, send err 
        // else send results to front-end                        
        err ? res.status(400).json({ msg: 'Suspend fail' }) : res.status(200).json(id)
    })
})

router.put('/reactiveJob/:id', (req, res) => {

    // get id from url parameter
    const id = req.params.id

    // define sql query
    // const sql = `DELETE FROM Account WHERE AccountID = ?;
    //              DELETE FROM Profile WHERE ProfileID = ?;
    //              DELETE FROM candidaterequest WHERE CandidateListID = ?;
    //              DELETE FROM candidatelist WHERE CandidateListID = ?`; 

    const sql = `UPDATE Job SET Status = 1 WHERE JobID = ?`;

    // run sql
    conn.query(sql, [id], (err, results) => {
        // if err, send err 
        // else send results to front-end                        
        err ? res.status(400).json({ msg: 'Suspend fail' }) : res.status(200).json(id)
    })
})


module.exports = router;
