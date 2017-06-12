'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
  name: String,
  picture: String,
  price: Number,
  category: { type: String, enum: ['Computers', 'Phones', 'Accesories'] },
  description: String
})

module.exports = mongoose.model('product', productSchema)
