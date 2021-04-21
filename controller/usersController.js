const User = require("../model/userModel")
const { postData } = require("../utils/postData")

//@desc     Gets All Users
//@route    GET /api/users
async function getUsers(req, res){
    try {
        const users = await User.fetchAll()
        res.writeHead(200, { "Content-Type": "application/json"})
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)  
    }    
}

//@desc     Get single user
//@route    GET /api/users/:id
async function getUser(req, res, id){
    try {
        const user = await User.findById(id)

        if (!user){
            res.writeHead(404, { "Content-Type": "application/json"})
            res.end(JSON.stringify({ msg: "User not found!"}))
        }else{
            res.writeHead(200, { "Content-Type": "application/json"})
            res.end(JSON.stringify(user))
        }
        
    } catch (error) {
        console.log(error)  
    }    
}

//@desc     Create a user
//@route    POST /api/users/
async function createUser(req, res){
    try {
        const body = await postData(req)
        const {first_name, last_name, email, password } = JSON.parse(body)

        if(!first_name || !last_name || !email || !password){
            res.writeHead(404, { "Content-Type": "application/json"})
            return res.end(JSON.stringify({ msg: "A FirstName, LastName, Email and Password is Required!"}))
        }else{
            const user = {
                first_name,
                last_name,
                email,
                password
            }
    
            const newUser = await User.create(user)
            res.writeHead(201, { "Content-Type": "application/json"})
            return res.end(JSON.stringify(newUser))
        }
    } catch (error) {
        console.log(error)  
    }    
}

//@desc     Update a user
//@route    PUT/PATCH /api/users/:id
async function updateUser(req, res, id){
    try {
        const user = await User.findById(id)
        if (!user){
            res.writeHead(404, { "Content-Type": "application/json"})
            res.end(JSON.stringify({ msg: "User not found!"}))
        }else{
            const body = await postData(req)
            const {first_name, last_name, email, password } = JSON.parse(body)
    
            const userData = {
                first_name: first_name || user.first_name,
                last_name: last_name || user.last_name,
                email: email || user.email,
                password: password || user.password
            }
    
            const newUser = await User.update(id, userData)
            res.writeHead(200, { "Content-Type": "application/json"})
            return res.end(JSON.stringify(newUser)) 
        }
    } catch (error) {
        console.log(error)  
    }    
}

//@desc     Delete user
//@route    DELETE /api/users/:id
async function deleteUser(req, res, id){
    try {
        const user = await User.findById(id)

        if (!user){
            res.writeHead(404, { "Content-Type": "application/json"})
            res.end(JSON.stringify({ msg: "User not found!"}))
        }else{
            await User.remove(id)
            res.writeHead(200, { "Content-Type": "application/json"})
            res.end(JSON.stringify({ msg: `User with ${id} has been removed!`}))
        }
    } catch (error) {
        console.log(error)  
    }    
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}