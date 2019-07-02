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

  console.log(process.env);
  if (req.url === '/'){
    if (process.argv[2] === 'ru' || process.env.LANG === "ru_RU.UTF-8") {
      path = 'public/ru.html';
    } else if (process.argv[2] === 'en' || process.env.LANG === "en_EN.UTF-8") {
       path = 'public/en.html';
    }
  }

  ext = path.split('.').pop();

  if (ext === 'png') {
    try {
      let img = fs.readFileSync(pathname);
      // console.log("img sent to client");
      response.writeHead(200, {
        'Content-Type': mimeType[ext]
      });
      response.end(img);
    } catch (e) {
      // console.log("Couldnt open image\n");
      response.statusCode = 404;
      response.end();
    }
  } else {
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
