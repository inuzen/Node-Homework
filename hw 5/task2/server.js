const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(responser).listen(80);
console.log("Server started");
const mimeType = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'application/javascript'
}

function responser(req, res) {
  let path, ext;

  if (req.url === '/') {
    path = req.url + 'index.html';
  } else {
    path = 'site' + req.url;
  }
  ext = path.split('.').pop();

  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      res.statusCode = 404;
      return res.end("Ops!!!");
    }
    res.writeHead(200, {
      'Content-Type': mimeType[ext]
    });
    res.end(data);
  });


}
