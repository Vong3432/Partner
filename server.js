const express = require('express')
const axios = require('axios')
const uuid = require('uuid');
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// const fileUpload = require('express-fileupload')
// const bodyParser = require('body-parser')
dotenv.config();

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server)

// to get data from res.body
app.use(express.json())
// app.use(fileUpload())

// Connect to mongoDB
// const mongoURI = require('./config');
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Mongodb is connected.'))
    .catch(err => console.log(err))


// configuring port
const port = process.env.PORT || 5000

// use routes
app.use('/api/job', require('./routes/api/job'))
app.use('/api/user', require('./routes/api/user/user'))
app.use('/api/profile', require('./routes/api/user/profile'))
// app.use('/api/post', require('./routes/api/posts'))
// app.use('/api/chat', require('./routes/api/user/chatroom'))

const postRoute = require('./routes/api/posts')
// const { addUser, getUser, removeUser, getUsersInRoom } = require('./routes/api/user/chatroom')

server.listen(port, () => console.log(`Listen on port ${port}`))

// io.on("connection", socket => {
//     console.log("New client connected")


//     socket.on('join', ({ name, room }, callback) => {
//         const { error, user } = addUser({ id: socket.id, name, room });

//         socket.emit('getDefaultMessages', () => getDefaultMessages(room));

//         if (error) return callback(error)

//         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
//         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined` });
        
//         const conn = mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "",
//             database: "partner",
//             multipleStatements: true
//         })

//         const sql = `SELECT * FROM chatroom WHERE ChatRoomID = ?`
//         conn.query(sql, [room], (err, results) => {
//             if(err) throw err
//             results.map(result => socket.emit('message', { user: `${result.name}`, text: `${result.text}` }))                        
//         })
//         socket.join(user.room);

//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

//         callback()
//     })    

//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.id);

//         // io.to(user.room).emit('addMessage', {text: message, name: user.name, room:user.room});
//         const conn = mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "",
//             database: "partner",
//             multipleStatements: true
//         })

//         const sql = `INSERT INTO chatroom(ChatRoomID, name, text) VALUES (?)`;
//         conn.query(sql, [[user.room, user.name, message]], (err, results) => {
//             if (err) throw err
//         })

//         io.to(user.room).emit('message', { user: user.name, text: message });
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//         callback();
//     })

//     socket.on("disconnect", () => {
//         const user = removeUser(socket.id)

//         if (user)
//             io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })

//     });
// })






