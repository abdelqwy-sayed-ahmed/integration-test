const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, min:3},
  // price:{type:Number}
})

module.exports = mongoose.model('products',productSchema) 