const request = require("supertest")
const app = require('../app')
require("../models")
const Product = require ("../models/Product")
const Cart = require ("../models/Cart")

const BASE_URL_USER = '/api/v1/users/login'
const URL_PURCHASE = '/api/v1/purchase'
let TOKEN
let userId
let product

beforeAll(async()=>{
    const user = {
        email: "brbacordova@gmail.com",
        password: "123456"
    }

    const res = await request(app)
        .post(BASE_URL_USER)
        .send(user)

    TOKEN = res.body.token
    userId= res.body.user.id
});

test("POST -> 'URL_PURCHASE', should return status code 201 and res.body.quantity === body.quantity", async () => {

    const productBody = {
      title:"huawei p60",
      description:"lorem1",
      price:"200"
    }
    product = await Product.create(productBody)

    const cartBody = {
      quantity : 2,
      userId ,
      productId: product.id
  }
  await Cart.create(cartBody)
  
    const res = await request(app)
        .post(URL_PURCHASE)
        .set("Authorization", `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(201)
    expect(res.body[0].quantity).toBe(cartBody.quantity)

  });

  test("GET -> 'URL_PURCHASE',should return status code 200 res.body.length === 1", async()=>{

    const res = await request(app)
        .get(URL_PURCHASE)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await product.destroy()
})