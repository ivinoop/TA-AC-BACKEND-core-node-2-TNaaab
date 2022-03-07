const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const userDir = path.join(__dirname, '/users');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let user = parsedUrl.query.username;
  let store = '';
  req
  .on('data', (chunk) => {
    store += chunk;
  })
  .on('end', () => {
    if(req.method === 'POST' && req.url === '/users') {
      let username = JSON.parse(store).username;
      fs.open(userDir + username + '.json', 'wx', (err, fd) => {
        if(err) console.log(err);
        fs.writeFile(fd, store, (err) => {
          if(err) console.log(err);
          fs.close(fd, () => {
            res.end(`${username} successfully created`);
          });
        });
      });
    }
    else if(req.method === 'GET' && parsedUrl.pathname === '/users') {
      res.setHeader('content-type', 'application/json');
      return fs.createReadStream(userDir + user + '.json').pipe(res);
    }
    else if(req.method === 'DELETE' && parsedUrl.pathname ==='/users') {
      fs.unlink(userDir + user + '.json', (err) => {
        if(err) console.log(err);
        return res.end(`${user} is deleted`);
      });
    }
    else if(req.method === 'PUT' && parsedUrl.pathname === '/users') {
      fs.open(userDir + user + '.json', 'r+', (err, fd) => {
        if(err) console.log(err);
        fs.ftruncate(fd, (err) => {
          if(err) console.log(err);
          fs.writeFile(fd, store, (err) => {
            if(err) console.log(err);
            fs.close(fd, (err) => {
              if(err) console.log(err);
              return res.end(`${user} updated successfully`);
            })
          })
        })
      })
    }
    else {
      res.statusCode = 404;
      res.end('Page not found');
    }
  });
}

server.listen(3000, () => {
  console.log('=> Server listening on port 3000');
});