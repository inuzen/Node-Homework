const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(responser).listen(80);
console.log("Server started");
const mimeType = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png'

}

function responser(req, res) {
  let path, ext;

  let parsed = url.parse(req.url, true);

  if (parsed.pathname==="/camel_to_snake") {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end(camel_to_snake(parsed.query.name));
  }
  if (parsed.pathname==="/snake_to_camel") {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end(snake_to_camel(parsed.query.name));
  }

  if (req.url === '/') {
    path = 'site' + req.url + 'index.html';
  } else {
    path = 'site' + req.url;
  }
  ext = path.split('.').pop();

  if (ext === 'png') {
    try {
      let img = fs.readFileSync(pathname);
      // console.log("img sent to client");
      response.writeHead(200, {
        'Content-Type': mimeType[ext]
      })
      response.end(img);
    } catch (e) {
      // console.log("Couldnt open image\n");
      response.statusCode = 404;
      response.end();
    }
  } else{
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

}


function camel_to_snake(str) {
  return str.split(/(?=[A-Z])/g).join("_").toLowerCase();
}

function snake_to_camel(str) {
  return str.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}
