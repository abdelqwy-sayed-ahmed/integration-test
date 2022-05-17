const { mongoose } = require('mongoose');
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
})