const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors()) // include before other routes

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

const posts = require('./routes/api/posts')

app.use('/api/posts', posts)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
