const http = require('http')
const path = require('path')
const fs = require('fs')
const qs = require('querystring')

const indexRelPath = '../client/index.js'
console.log(indexRelPath)
const indexAbsPath = path.join(__dirname,'..','client/index.js')
console.log(indexAbsPath)

let server = http.createServer(handleRequest)

function handleRequest(req, res) {
  let store = ''
  req
  .on('data', (chunk) => {
    store += chunk;
  })
  .on('end', () => {
    if(req.method === 'GET' && req.url === '/form') {
      res.setHeader('content-type', 'text/html')
      fs.createReadStream('./form.html').pipe(res)
    }
    if(req.method === 'POST' && req.url === '/form') {
      let parsedData = qs.parse(store)
      res.setHeader('content-type','text/html')
      res.end(`<h1>${parsedData.name}</h1><br><h3>${parsedData.email}</h3><br><h4>${parsedData.age}</h4>`)
    } 
  })
}

server.listen(5678, () => {
  console.log('=> Server listening on port 5678');
})
