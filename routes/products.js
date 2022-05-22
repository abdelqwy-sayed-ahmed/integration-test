const express = require('express')
const router = express.Router()
const Joi=require('joi')
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

//post-product
router.post('/', async (req, res) => {
  //check validate errors
  const { error } = validateProduct(req.body)
  if(error)return res.status(400).send(error.details[0].message)
  const product = new Product({
    title:req.body.title
  })
  await product.save()
  res.send(product)

})

//delete
router.delete('/:_id', validateObjectId, async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params._id)
  //if invalid id
  if(!product)return res.status(404).send('invalid Id')
  //if valid id
  res.send(product)
  
})

//update-product
router.put('/:_id', validateObjectId, async (req, res) => {
  //check validate errors
  const { error } = validateProduct(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  const updatedProduct = await Product.findByIdAndUpdate(req.params._id, {
    title:req.body.title
    
  }, { new: true })
  
  if (!updatedProduct) return res.status(404).send('invalid product Id')
  res.send(updatedProduct)
  
})



//validate-product
const validateProduct = product => {
  const schema =Joi.object ({
    title:Joi.string().required().min(3)
  })
  return schema.validate(product)
}


module.exports=router