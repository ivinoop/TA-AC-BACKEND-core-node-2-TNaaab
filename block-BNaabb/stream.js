const http = require('http');

let server = http.createServer(handleaRequest);

function handleaRequest(req, res) {
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    res.setHeader('content-type', 'text/plain');
    res.write(store);
    res.end();
  });
}

server.listen(3456, () =>{
  console.log('=> Server listening on port 3456');
});