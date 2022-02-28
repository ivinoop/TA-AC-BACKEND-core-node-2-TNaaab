const http = require('http');
const path = require('path');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.end('OK');
}

server.listen(3000, () => {
  console.log('=> server listening on port 3000');
});

console.log(__dirname);
console.log(__filename);

let filePath = path.join(__dirname, 'server.js');
console.log(filePath);