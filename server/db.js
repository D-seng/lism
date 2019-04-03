const mongoose = require('mongoose')

const connStringLocal = 'mongodb://localhost/lismart'

//localhost/lx

module.exports = function connectToDb() {
  mongoose.connect(connStringLocal, { useNewUrlParser: true }, error => {
    if (error) {
      console.log('Unable to connect to database.')
      throw error
    } else {
      console.log('Mongodb connected via mongoose...')
    }
  })
}
