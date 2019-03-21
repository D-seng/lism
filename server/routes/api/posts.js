const express = require('express')
const mongodb = require('mongodb')
const cors = require('cors')
const router = express.Router()
// const app = require('./index')
const bodyParser = require('body-parser')

// app.options('*', cors())
// app.use(bodyParser.json())

// get
router.get('/', async (req, res) => {
  const posts = await loadLisCollection()
  res.send(await posts.find({}).toArray())
})

router.get('/:id', async (req, res) => {
  const posts = await loadLisCollection()
  const post = await posts.findOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.send(post)
})

// router.get('/:id', async (req, res) => {
//   winston.info('req.params.id: ' + req.params.id)
//   const movie = await Movie.findById(req.params.id)
//   if (!movie) return res.status(400).send('Genre not found')
//   res.send(movie)
// })

// add
router.post('/', async (req, res) => {
  const posts = await loadLisCollection()
  await posts.insertOne({ text: req.body, createdAt: new Date() })
  res.status(201).send()
})

// delete
router.delete('/:id', async (req, res) => {
  const posts = await loadLisCollection()
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

// Could you simply store the document as a string in JSON format that varies
// in structure with updates?

// update
router.put('/:id', async (req, res) => {
  const posts = await loadLisCollection()
  // console.log('aaa')

  await posts.update(
    { _id: new mongodb.ObjectID(req.params.id) },
    { $set: { text: req.body } }
  )

  res.status(200).send()
})

const PWD = process.env.VUE_APP_DBPASSWORD
const USR = process.env.VUE_APP_DBUSER
const PWDATLAS = process.env.VUE_APP_DBPASSWORDATLAS

const ATLAS = `mongodb+srv://darren-user:${PWDATLAS}@cluster0-rh3ve.mongodb.net/test?retryWrites=true`
const MLAB = `mongodb://${USR}:${PWD}@ds161335.mlab.com:61335/lismart`
const LOCAL = 'http://localhost:5000/api/posts'

async function loadLisCollection() {
  const client = await mongodb.MongoClient.connect(LOCAL, {
    useNewUrlParser: true
  })
  return client.db('lismart').collection('posts')
}

// const MongoClient = mongodb.MongoClient
// // const uri = "mongodb+srv://darren-user:<password>@cluster0-rh3ve.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(ATLAS, { useNewUrlParser: true })
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = router
