const express = require('express')
const app = express()

// to get data from res.body
app.use(express.json())

// configuring port
const port = process.env.PORT || 5000

// use routes
app.use('/api/config', require('./routes/api/init'))
app.use('/api/job', require('./routes/api/job'))

// /api/job/displayjobs

app.listen(port, () => console.log(`Listen on port ${port}`))








