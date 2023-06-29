const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")
require ("../models")

const BASE_URL_USERS ='/api/v1/users/login'
const BASE_URL = '/api/v1/products'
let TOKEN
let category
let productId

beforeAll(async()=>{
    const user = {
        email:"brbacordova@gmail.com",
        password:"123456"
    }

const res = await request(app)
    .post(BASE_URL_USERS)
    .send(user)

TOKEN = res.body.token
});

test("POST -> 'BASE_URL', should return status code 201 and res.body.title === body.title",async()=>{

    const categoryBody={
        name:"Tech"
    }
category = await Category.create(categoryBody)

const product = {
    title:"iphone 14",
    description:"lorem14",
    price:"200",
    categoryId: category.id
}

const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization",`Bearer ${TOKEN}`)

productId = res.body.id

expect(res.status).toBe(201)
expect(res.body.title).toBe(product.title)
});

test("GET -> 'BASE_URL?category' should status code 200 and, res.body.length === 1 and res.body[0] to be defined",async()=>{
 
    const res = await request(app)
    .get(`${BASE_URL}?category=${category.id}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toBeDefined()
});

test("GET -> 'BASE_URL' should status code 200 and res.body.length === 1",async()=>{
 
    const res = await request(app).get(BASE_URL)
    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toBeDefined()
})



test("GET ONE -> 'BASE_URL/:id', should return status code 200 and res.body.title === iphone 14",async()=>{

    const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body.title).toBe("iphone 14")
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.title === body.title",async()=>{
    const product = {
        title:"samsung A50"
    }

    const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(product)
    .set("Authorization",`Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.title).toBe(product.title)

});

test("DELETE -> 'BASE_URL/:id' should status code 204",async()=>{
     
    const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
          
    expect(res.status).toBe(204)

    await category.destroy()
})

