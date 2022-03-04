const http = require('http')
const path = require('path')
const fs = require('fs')
const qs = require('querystring')

const indexRelPath = '../projects/client/index.js'
console.log(indexRelPath)
const indexAbsPath = path.join(__dirname,'..','projects/client/index.js')
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
      fs.readFile('./form.html', (err, content) => {
        if(err) console.log(err);
        res.end(content)
      })
    }
    if(req.method === 'POST' && req.url === '/form') {
      let formData = qs.parse(store)
      res.setHeader('content-type','text/html')
      res.end(`<h1>${formData.name}</h1><br><h3>${formData.email}</h3><br><h4>${formData.age}</h4>`)
    } 
  })
}

server.listen(3000, () => {
  console.log('=> Server listening on port 3000');
})
