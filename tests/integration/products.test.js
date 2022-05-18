const request = require('supertest')
const Product=require('../../models/Product')

let server;

describe('/products', () => {
  beforeEach(() => { server = require('../../app') })
  afterEach(async () => {
    server.close()
    await Product.remove({})
  })
  
  // describe('/Get', () => {
  //   it('should return all products', async () => {
  //     await Product.collection.insertMany([
  //       {title:'prod1'},
  //       {title:'prod2'},
  //     ])
  //     const res = await request(server).get('/products')
  //     expect(res.status).toBe(200)
  //     expect(res.body.length).toBe(2)
  //     expect(res.body.some(product=>product.title=='prod1')).toBeTruthy()
  //     expect(res.body.some(product=>product.title=='prod2')).toBeTruthy()
     
  //   })
  // })

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
})