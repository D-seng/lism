const mongoose = require('mongoose')

const feederSchema = new mongoose.Schema({
  text: {
    type: Array,
    required: true
  },
  intent: {
    type: String,
    required: false
  }
})

const Feeder = mongoose.model('Feeder', feederSchema)
exports.Feeder = Feeder
exports.feederSchema = feederSchema
