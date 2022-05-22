const request = require('supertest')
const Product=require('../../models/Product')

let server;

describe('/products', () => {
  beforeEach(() => { server = require('../../app') })
  afterEach(async () => {
    server.close()
    await Product.remove({})
  })
  
  describe('/Get', () => {
    it('should return all products', async () => {
      await Product.collection.insertMany([
        {title:'prod1'},
        {title:'prod2'},
      ])
      const res = await request(server).get('/products')
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(res.body.some(product=>product.title=='prod1')).toBeTruthy()
      expect(res.body.some(product=>product.title=='prod2')).toBeTruthy()
     
    })
  })

  describe('Get/:id', () => {
    it('should return product with givenId', async () => {
      //create-new -product
      const product = new Product({
        title: 'prod1'
      })
      await product.save()

      const res = await request(server).get('/products/' + product._id)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('title', product.title)
    
    });

    it('should return 404 if invalid Id ', async () => {
      const res = await request(server).get('/products/1')
      expect(res.status).toBe(404)
    })
  })

  describe('Post', () => {
    it('should return 404 if invalid inputs', async() => {

      const res = await request(server)
        .post('/products')
        .send({title:''})
        .send({title:'12'})
        .send({title:123})
      expect(res.status).toBe(400)
    })

    it('should save the product if it is valid', async () => {
      const res = await request(server)
        .post('/products')
        .send({ title: 'prod1' })
      const product = await Product.findOne({ title: 'prod1' })
      expect(product).toHaveProperty('title','prod1')
    })
    it('should return the product if it is valid', async () => {
      const res = await request(server)
        .post('/products')
        .send({ title: 'prod1' })
      
      expect(res.body).toHaveProperty('title','prod1')
    })
  })

  describe('Delete', () => {
    let prodId
    beforeEach(async () => {
      const product = new Product({
        title:'prod1'
      })
      await product.save()
       prodId = product._id; 
    })
    it('should return 404 if invalid Id', async () => {
      const res =await request(server).delete('/products/1')
      expect(res.status).toBe(404)
    })

    it('should delete the product if valid product id', async () => {
      await request(server).delete('/products/'+ prodId)
      const product = await Product.findById(prodId)
      expect(product).toBeNull()
    })
    it('should return the deleted product if valid product id', async () => {
      const res=await request(server).delete('/products/'+ prodId)
      expect(res.body).toHaveProperty('title','prod1')
    })
  })

  describe('PUT:_id', () => {
    let prodId;
    beforeEach(async () => {
      const product = new Product({
        title:'prod1'
      })
      await product.save()
      prodId=product._id
    })

    it('should return 400 if invalid inputs', async () => {
      const res = await request(server)
        .put('/products/'+ prodId)
        .send({ title: '65' })//check if less than 3
        .send({ title: '' })//check if empty string
        .send({ title: 123 })//check if number
      expect(res.status).toBe(400)
    })

    it('should return 404 if invalid Id', async () => {
      const res =await request(server).put('/products/1')
      expect(res.status).toBe(404)
    })

    it('should update product if valid id and inputs', async () => {
       await request(server)
                 .put('/products/'+ prodId)
                 .send({title:'updated-title'})
      const updatedProduct = await Product.findById(prodId)
      expect(updatedProduct.title).toBe('updated-title')
    })
    it('should return updated product after update', async () => {
      const res = await request(server)
                 .put('/products/'+ prodId)
                 .send({title:'updated-title'})
      expect(res.body).toHaveProperty('title','updated-title')      
    })
  })
})