const express = require('express')
const bodyParser = require('body-parser')

const http = require('http')

const hostname = '127.0.0.1'

const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const server = http.createServer((req, res) => {
  res.statusCost = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

// Middleware
app.use(bodyParser.json())
app.use(cors())
// app.options('*', cors()) // include before other routes

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

server.listen(port, hostname, () => {
  console.log(`Server started on http://${hostname}:${port}/`)
})

module.exports = app
