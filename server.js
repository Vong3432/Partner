const express = require('express')
const axios = require('axios')
const mysql = require('mysql')
const uuid = require('uuid');
const app = express()

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server)

// to get data from res.body
app.use(express.json())

// configuring port
const port = process.env.PORT || 5000

// use routes
app.use('/api/config', require('./routes/api/init'))
app.use('/api/job', require('./routes/api/job'))
app.use('/api/user', require('./routes/api/user/user'))
app.use('/api/profile', require('./routes/api/user/profile'))
app.use('/api/post', require('./routes/api/posts'))

const postRoute = require('./routes/api/posts')
// var serve = http.createServer(app)
// var io = socketServer(serve)

server.listen(port, () => console.log(`Listen on port ${port}`))

io.on("connection", socket => {
    console.log("New client connected")

    socket.emit("FromAPI", 'My message')
    socket.on('onLike', ({ PostingID, AccountID }) => {
        
        const conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "partner",
            // allow multiple SQL statement to be included
            multipleStatements: true
        })
        const LikesID = uuid();        

        const sql = `SELECT PostingID, AccountID FROM Likes WHERE PostingID = ? AND AccountID = ?`;

        // run sql
        conn.query(sql, [PostingID, AccountID], (err, results) => {
            if (results.length > 0) {
                // Dislike the post
                const sql = `DELETE FROM Likes WHERE PostingID = ? AND AccountID = ?` 
                conn.query(sql, [PostingID, AccountID], (err, results)=>{
                    if(err) throw err;
                    const sql = `UPDATE Posting SET LikesCount = LikesCount - 1 WHERE PostingID = ?`
                    conn.query(sql, [PostingID], (err, results) => {
                        if(err) throw err;                                           
                    })
                })               
            }
            else {
                // Like the post
                const sql = `INSERT INTO Likes(LikesID, PostingID, AccountID) VALUES (?)`
                conn.query(sql, [[LikesID, PostingID, AccountID]], (err, results) => {
                    if(err) throw err;
                    const sql = `UPDATE Posting SET LikesCount = LikesCount + 1 WHERE PostingID = ?`
                    conn.query(sql, [PostingID], (err, results) => {
                        if(err) throw err;                                           
                    })
                })
            }            
        })
        io.sockets.emit("getLikes", {PostingID})            
    })
    socket.on('getLikes', ({ PostingID }) => {
        console.log('called')

        const conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "partner",
            // allow multiple SQL statement to be included
            multipleStatements: true
        })

        const sql = `SELECT LikesCount FROM Posting WHERE PostingID = ?`

        // run sql
        conn.query(sql, [PostingID], (err, results) => {
            io.sockets.emit("displayLikes", results[0].LikesCount);
        })
        // socket.emit('displayLikes',)
    })
    socket.on("disconnect", () => console.log("Client disconnected"));
})

// const connections = [];

// io.on('connection', function (socket) {
//     console.log("Connected to Socket!!" + socket.id)
//     connections.push(socket)
//     socket.on('disconnect', function () {
//         console.log('Disconnected - ' + socket.id);
//     });

//     socket.on('addPost', (data) => {
//         console.log(data)

//         const conn = mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "",
//             database: "partner",
//             // allow multiple SQL statement to be included
//             multipleStatements: true
//         })

//         // destrucutre all submitted data from body
//         const PostingID = uuid(),
//             UploadTime = new Date()

//         const { Description, Picture, ProfileID } = data;

//         // ???
//         // for(key in type) {
//         //     if(type.hasOwnProperty(key)){
//         //         var value = type[key];
//         //         str = str + value + ","
//         //         // do something with the value;
//         //     }
//         // }

//         const sql = 'INSERT INTO posting (PostingID, ProfileID, Description, Picture, UploadTime) VALUES (?)';

//         conn.query(sql, [[PostingID, ProfileID, Description, Picture, UploadTime]], (err, results) => {
//             (err) ? console.log('fail') : io.emit('postAdded', data)
//         })
//         // axios
//         // .post('/api/post', data)
//         // .then(io.emit('postAdded', data))
//         // .catch(err => console.log(err))
//     })

//     socket.on('getPost', (id) => {
//         console.log(id+"s")

//         const conn = mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "",
//             database: "partner",
//             // allow multiple SQL statement to be included
//             multipleStatements: true
//         })                

//         // define sql query
//         const sql = `SELECT * FROM Posting WHERE ProfileID = '${id}'`;

//         // run sql
//         conn.query(sql, (err, results) => {

//             // for each result, display the title of it (debug purpose)
//             results.map(result => console.log(result))

//             // if err, send err 
//             // else send results to front-end
//             err ? console.log(err) : io.emit('postLoaded', results)
//         })
//     })

// });






