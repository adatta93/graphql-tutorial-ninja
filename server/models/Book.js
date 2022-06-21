//jshint esversion: 6
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model('Book', bookSchema);