const User = require("../../models/User")

const user = async() =>{
    
    const userCreate = {
        firstName:"Anais",
        lastName:"Aliendo",
        email:"brbacordova@gmail.com",
        password:"123456",
        phone:"1234567"
    }

    await User.create(userCreate)
}
module.exports = user
