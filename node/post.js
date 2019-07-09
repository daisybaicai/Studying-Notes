var http = require('http')
var querystring = require('querystring')

const server = http.createServer((req,res) => {
    console.log(req.method)
    if(req.method === 'POST') {
        console.log('content-type', req.headers['content-type'])
        let postdata = ''
        req.on('data', chunk => {
            postdata += chunk.toString()
        })
        req.on('end', () => {
            console.log(postdata)
            res.end('hello world')
        })
    }
});

server.listen(8080);