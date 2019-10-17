/*const express = require('express')
const mongoose = require('mongoose')
const app = express()

// to get data from res.body
app.use(express.json())

const mongoURL = "mongodb+srv://vong3432:34325417@cluster0-eqbsb.mongodb.net/test?retryWrites=true&w=majority";

// connect to mongoDB
mongoose
    .connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( () => console.log("MongoDB Connected..."))
    .catch( err => console.log(err) );


const port = process.env.port || 5000

app.listen(port, () => console.log(`Listen on port ${port}`))
*/
const express = require('express')
const app = express()

// to get data from res.body
app.use(express.json())

// configuring port
const port = 5000

// use routes
app.use('/api/config', require('./routes/api/init'))

app.listen(port, () => console.log(`Listen on port ${port}`))








