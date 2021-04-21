let users = require("../data/users.json")
const { v4: uuidv4 } = require("uuid")
const { writeUserToFile } = require("../utils/write")

function fetchAll() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        resolve(users.find((u) => u.id === id))
    })
}

function create(user){
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user}
        users.push(newUser)
        writeUserToFile("./data/users.json", users)
        resolve(newUser)
    })
}

function update(id, user){
    return new Promise((resolve, reject) => {
        const index = users.findIndex((u) => u.id === id)
        users[index] = {id, ...user}
        writeUserToFile("./data/users.json", users)
        resolve(users[index])
    })
}

function remove(id){
    return new Promise((resolve, reject) => {
        users = users.filter((u) => u.id !== id)
        writeUserToFile("./data/users.json", users)
        resolve()
    })
}

module.exports = {
    fetchAll,
    findById,
    create,
    update,
    remove
}