
const products=require('../routes/products')

module.exports = app => {
  app.use('/products',products)
}