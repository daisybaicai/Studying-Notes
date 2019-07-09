var http = require('http')

const server = http.createServer((req,res) => {
    console.log(req.method)

    const url = req.url
    const path = url.split('?')[0]
    res.end(path)
});

server.listen(8080);