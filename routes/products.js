const express = require('express')
const router = express.Router()
//load Schema
const mongoose = require('mongoose')
require('../models/Product')
const Product=mongoose.model('products')

//get-all-products

router.get('/', async (req, res) => {
  const products = await Product.find({})
  res.status(200).send(products)
})



module.exports=router