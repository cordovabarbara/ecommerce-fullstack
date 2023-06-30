const request = require("supertest")
const app = require('../app')
require("../models")

const BASE_URL_USER = '/api/v1/users/login'
const URL_PURCHASE = '/api/v1/purchase'
let TOKEN
let userId

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

test("POST -> 'URL_PURCHASE', should return status code 201", async () => {
    const purchaseBody= {
        quantity: 1
    };
  
    const res = await request(app)
      .post(URL_PURCHASE)
      .send(purchaseBody)
      .set('Authorization', `Bearer ${TOKEN}`);
  
    expect(res.status).toBe(201);
  });

test("GET -> 'URL_PURCHASE', should return status code 200 and res.body length === 1", async () => {
    const res = await request(app)
      .get(URL_PURCHASE)
      .set("Authorization", `Bearer ${TOKEN}`)
    console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });