const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

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
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  })
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

async function loadLisCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost/lismart/',
    { useNewUrlParser: true }
  )
  return client.db('lismart').collection('posts')
}

module.exports = router
