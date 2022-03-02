const http = require('http');
const fs = require('fs');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.setHeader('content-type', 'text/plain');
  fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3000, () => {
  console.log('=> Server listening on port 3000');
});