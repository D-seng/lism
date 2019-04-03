const mongoose = require('mongoose')

module.exports = function connectToDb() {
  mongoose
    .connect('mongodb://localhost/lx', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))
}

//mongodb://localhost/vidly
//   mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, error => {
//'mongodb://localhost/lismart'
//mongodb://localhost/lx
