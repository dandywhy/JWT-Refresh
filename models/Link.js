const mongoose = require('mongoose')
const Schema = mongoose.Schema

const linkSchema = new Schema({
  longLink: {
    type: String,
    required: true,
    trim: true,
  },
  nanoLink: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})



module.exports = mongoose.model('Link', linkSchema)