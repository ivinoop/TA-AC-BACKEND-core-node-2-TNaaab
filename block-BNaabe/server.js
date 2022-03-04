const http = require('http');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let contentFormat = req.headers['content-type'];
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {

    if(req.method === 'POST' && req.url === '/' && contentFormat === 'application/json') {
      res.writeHead(201, {'content-type':'application/json'});
      res.end(store);
    }

    if(req.method === 'POST' && req.url === '/' && contentFormat === 'application/x-www-form-urlencoded') {
      res.writeHead(201, {'content-type':'text/plain'});
      let parsedData = qs.parse(store);
      res.end(parsedData.captain);
    }
  });
}

server.listen(3000, () => {
  console.log('=> server listening on port 3000');
});

// -------------------------

let server2 = http.createServer(handleRequest2);

function handleRequest2(req, res) {
  let contentFormat = req.headers['content-type'];
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {

    if(contentFormat === 'application/json') {
      res.writeHead(202, {'content-type':'application/json'});
      res.end(store);
    }

    if( contentFormat === 'application/x-www-form-urlencoded') {
      res.writeHead(202, {'content-type':'text/plain'});
      let parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

server2.listen(9000, () => {
  console.log('=> server listening on port 9000');
});

// -------------------------

let server3 = http.createServer(handleRequest3);

function handleRequest3(req, res) {
  let contentFormat = req.headers['content-type'];
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {

    if(contentFormat === 'application/json') {
      res.writeHead(202, {'content-type':'text/html'});
      let parsedData = JSON.parse(store);
      res.end(`<h1>${parsedData.name}</h1> <h2>${parsedData.email}</h2>`);
    }

    if( contentFormat === 'application/x-www-form-urlencoded') {
      res.writeHead(202, {'content-type':'text/html'});
      let parsedData = qs.parse(store);
      res.end(`<h2>${parsedData.email}</h2>`);
    }
  });
}

server3.listen(5000, () => {
  console.log('=> server listening on port 5000');
});
