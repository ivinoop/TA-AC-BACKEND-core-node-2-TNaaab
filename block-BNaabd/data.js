const http = require('http');
const qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let dataFormat = req.headers['content-type'];
  let store  = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if(req.method === 'POST' && req.url === '/json') {
      res.setHeader('content-type', 'application/json');
      res.end(store);
    }
    if(req.method === 'POST' && req.url === '/form') {
      res.setHeader('content-type', '');
      let parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(7000, () => {
  console.log('=> server listening on port 7000');
});