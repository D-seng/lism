const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connectToDb = require('./db')

const app = express()

// const server = http.createServer((req, res) => {
//   res.statusCost = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World\n')
// })

// Middleware

// app.options('*', cors()) // include before other routes
connectToDb()

app.use(cors())

app.use(bodyParser.json())
app.use(morgan('dev'))

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

app.get('/', (req, res) => res.send('hello'))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on ${port}...`)
})

// module.exports = app
