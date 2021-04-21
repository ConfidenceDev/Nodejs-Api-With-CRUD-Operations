const http = require("http")
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("./controller/usersController")
const PORT = process.env.PORT || 4000

const server = http.createServer((req, res) => {
    if((req.url === "/api/users" || req.url === "/api/users/" ) && req.method === "GET"){
        getUsers(req, res)

    }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET"){
        const id = req.url.split("/")[3]
        getUser(req, res, id)

    }else if((req.url === "/api/users" || req.url === "/api/users/" ) && req.method === "POST"){
        createUser(req, res)
        

    }else if(req.url.match(/\api\/users\/([0-9]+)/) && (req.method === "PUT" || req.method === "PATCH")){
        const id = req.url.split("/")[3]
        updateUser(req, res, id)

    }else if(req.url.match(/\api\/users\/([0-9]+)/) && req.method === "DELETE"){
        const id = req.url.split("/")[3]
        deleteUser(req, res, id)
    }else{
        res.writeHead(404, { "Content-Type": "application/json"})
        res.end(JSON.stringify({
            msg: "Route Not Found"
        }))
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})