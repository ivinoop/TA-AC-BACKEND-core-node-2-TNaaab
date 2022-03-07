const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const userDir = __dirname + '/users/';

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let username = parsedUrl.query.username;
  let store = '';
  req
  .on('data', (chunk) => {
    store += chunk;
  })
  .on('end', () => {
    // CREATE
    if(req.method === 'POST' && req.url === '/users') {
      let username = JSON.parse(store).username;
      fs.open(userDir + username + '.json', 'wx', (err, fd) => {
        if(err) console.log(err);
        fs.writeFile(fd, store, (err) => {
          if(err) console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} successfully created`);
          });
        });
      });
    }
    // READ
    else if(req.method === 'GET' && parsedUrl.pathname === '/users') {
      res.setHeader('content-type', 'application/json');
      return fs.createReadStream(userDir + username + '.json').pipe(res);
    }
    // DELETE
    else if(req.method === 'DELETE' && parsedUrl.pathname ==='/users') {
      fs.unlink(userDir + username + '.json', (err) => {
        if(err) console.log(err);
        return res.end(`${username} is deleted`);
      });
    }
    // UPDATE
    else if(req.method === 'PUT' && parsedUrl.pathname === '/users') {
      fs.open(userDir + username + '.json', 'r+', (err, fd) => {
        if(err) console.log(err);
        fs.ftruncate(fd, (err) => {
          if(err) console.log(err);
          fs.writeFile(fd, store, (err) => {
            if(err) console.log(err);
            fs.close(fd, (err) => {
              if(err) console.log(err);
              return res.end(`User "${username}" updated successfully`);
            })
          })
        })
      })
    }
    // Handle Error
    else {
      res.statusCode = 404;
      res.end('Page not found');
    }
  });
}

server.listen(3000, () => {
  console.log('=> Server listening on port 3000');
});