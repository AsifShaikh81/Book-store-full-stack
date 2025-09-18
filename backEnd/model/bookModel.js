const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
    type: String,
    required: true, // must be provided
    trim: true
  },
  bookTitle: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0 // price cannot be negative
  },
  publishDate:{
    type:Date
  }

} ,{ timestamps : true})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book