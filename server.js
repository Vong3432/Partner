const express = require('express')
const axios = require('axios')
const mysql = require('mysql')
const uuid = require('uuid');
const app = express()

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server)

// rset

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
// app.use('/api/chat', require('./routes/api/user/chatroom'))

const postRoute = require('./routes/api/posts')
const { addUser, getUser, removeUser, getUsersInRoom } = require('./routes/api/user/chatroom')
// var serve = http.createServer(app)
// var io = socketServer(serve)

server.listen(port, () => console.log(`Listen on port ${port}`))

io.on("connection", socket => {
    console.log("New client connected")


    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        socket.emit('getDefaultMessages', () => getDefaultMessages(room));

        if (error) return callback(error)

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined` });
        
        const conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "partner",
            multipleStatements: true
        })

        const sql = `SELECT * FROM chatroom WHERE ChatRoomID = ?`
        conn.query(sql, [room], (err, results) => {
            if(err) throw err
            results.map(result => socket.emit('message', { user: `${result.name}`, text: `${result.text}` }))                        
        })
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback()
    })    

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        // io.to(user.room).emit('addMessage', {text: message, name: user.name, room:user.room});
        const conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "partner",
            multipleStatements: true
        })

        const sql = `INSERT INTO chatroom(ChatRoomID, name, text) VALUES (?)`;
        conn.query(sql, [[user.room, user.name, message]], (err, results) => {
            if (err) throw err
        })

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)

        if (user)
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })

    });
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






