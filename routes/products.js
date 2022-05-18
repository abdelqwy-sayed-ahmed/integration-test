const express = require('express')
const router = express.Router()
//load objectId middleware
const validateObjectId=require('../middleware/vaidateObjectId')
//load Schema
const mongoose = require('mongoose')
require('../models/Product')
const Product=mongoose.model('products')

//get-all-products

router.get('/', async (req, res) => {
  const products = await Product.find({})
  res.status(200).send(products)
})

//get-product-with-id
router.get('/:_id', validateObjectId,async(req, res) => {
  const product = await Product.findById(req.params._id)
  if (!product) return res.status(404).send('invalid product Id')
  res.send(product)
})



module.exports=router