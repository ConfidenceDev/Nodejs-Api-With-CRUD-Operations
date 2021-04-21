const fs = require("fs")

exports.writeUserToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
        if(err)
            console.log(err)
    })
}