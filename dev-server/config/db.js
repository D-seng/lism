const mongoose = require('mongoose')
//mongodb+srv://darren-user:<password>@cluster1-yxsma.mongodb.net/test?retryWrites=truemlab
const mlab = 'mongodb://duser1234:minori1234@ds161335.mlab.com:61335/lismart'
const local = 'mongodb://localhost/lx'
             //mongodb+srv://darren-user:<password>@cluster1-yxsma.mongodb.net/test?retryWrites=true
const atlas = 'mongodb+srv://darren-user:minori123@cluster1-yxsma.mongodb.net/test?retryWrites=true'
module.exports = function connectToDb() {
  mongoose
    .connect(atlas, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))
}

//mongodb://localhost/vidly
//   mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, error => {
//'mongodb://localhost/lismart'
//mongodb://localhost/lx
